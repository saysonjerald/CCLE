import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Grid, Snackbar, Fab } from '@mui/material';
import { io } from 'socket.io-client';
import { Editor } from '../components/CodeEditor';
import VideoButtons from '../components/VideoButtons';
import { Rnd } from 'react-rnd';
import { UserContext } from '../contexts/UserContext';
import { Widget, addResponseMessage } from 'react-chat-theme';
import styled from 'styled-components';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffSharpIcon from '@mui/icons-material/VideocamOffSharp';

let socket;
const Session = ({ match }) => {
  const { user, urlAPI } = useContext(UserContext);
  const history = useHistory();

  //Video Cam MySelf
  const myFace = useRef();
  const userStream = useRef();

  socket = io(urlAPI);
  const [roomID, setroomID] = useState();
  const [isValid, setIsValid] = useState(false);
  const [fullname, setFullname] = useState(
    `${user.firstname} ${user.lastname}`
  );
  const [description, setDescription] = useState();

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  //Button Video Chat
  const [isMuted, setIsMuted] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  //End Button Video Chat

  const { vertical, horizontal, open } = state;

  const handleOpen = (newState) => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const getSession = async (socket) => {
    await axios
      .get(`http://localhost:3001/session/${match.params.id}`)
      .then((data) => {
        if (
          data.data.session.student === user.id ||
          data.data.session.teacher === user.id
        ) {
          setIsValid(true);
          return;
        } else {
          socket.emit('disconnect');
          throw 'User not allowed to enter';
        }
      })
      .catch((err) => {
        console.log('err', err);
        history.push('/find-tutors');
      });
  };

  let myStream;

  const getMedia = () => {
    try {
      myStream = navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          if (!isValid) {
            return;
          }
          myFace.current.srcObject = stream;
          userStream.current = stream;
        });
    } catch (err) {
      console.log(err);
    }
  };

  //Double Click Video fullscreen
  function openFullscreen() {
    if (myFace.current.requestFullscreen) {
      myFace.current.requestFullscreen();
    } else if (myFace.current.webkitRequestFullscreen) {
      /* Safari */
      myFace.current.webkitRequestFullscreen();
    } else if (myFace.current.msRequestFullscreen) {
      /* IE11 */
      myFace.current.msRequestFullscreen();
    }
  }

  //Mute Microphone
  const muteMic = () => {
    userStream.current
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setIsMuted(!isMuted);
  };

  //Turn of Camera
  const turnOffCam = () => {
    userStream.current
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setIsCameraOn(!isCameraOn);
    myFace.current.hidden = !myFace.current.hidden;
  };

  useEffect(() => {
    //Socket connection for notification
    (async () => {
      getSession(socket).then(() => {
        getMedia();
      });
    })();

    socket.emit('setName', fullname);

    socket.emit('join_room', match.params.id, (roomId) => {
      setroomID(roomId);
    });

    socket.on('welcome', (name) => {
      handleOpen({
        vertical: 'buttom',
        horizontal: 'left',
      });
      setFullname(`${user.firstname} ${user.lastname}` === name ? 'You' : name);
      setDescription('joined the room');
    });

    socket.on('bye', (name) => {
      handleOpen({
        vertical: 'buttom',
        horizontal: 'left',
      });
      setFullname(`${user.firstname} ${user.lastname}` === name ? 'You' : name);
      setDescription('has beed disconnected from the room');
    });

    socket.on('receive_messasge', (message, userId) => {
      if (user.id !== userId) addResponseMessage(message);
    });
  }, [false]);

  return (
    <div>
      <Grid
        style={{
          minWidth: '100%',
          height: '100vh',
          position: 'relative',
        }}
      >
        <Editor roomID={roomID} name={user.firstname} />
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={`${fullname} ${description}`}
          key={vertical + horizontal}
        />
        <Widget
          handleNewUserMessage={(message) => {
            socket.emit('send_messasge', message, user.id, roomID);
          }}
          title="Chatbox"
        />
        <Rnd
          style={{ zIndex: 999 }}
          default={{
            x: 50,
            y: 400,
          }}
        >
          <video
            onDoubleClick={() => {
              openFullscreen();
            }}
            ref={myFace}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
            }}
            autoPlay
            playsInline
            width="300"
            height="200"
          ></video>
        </Rnd>

        {/* Video Button */}
        <VideButtonsWrapper>
          <Fab
            style={
              isMuted
                ? { backgroundColor: '#F5F5F5', marginLeft: '10px' }
                : { backgroundColor: '#EA5044', marginLeft: '10px' }
            }
            aria-label="microphone"
            onClick={() => {
              muteMic();
            }}
          >
            {isMuted ? <MicIcon /> : <MicOffIcon />}
          </Fab>
          <Fab
            style={
              isCameraOn
                ? { backgroundColor: '#F5F5F5', marginLeft: '10px' }
                : { backgroundColor: '#EA5044', marginLeft: '10px' }
            }
            aria-label="camera"
            onClick={() => {
              turnOffCam();
            }}
          >
            {isCameraOn ? <VideocamIcon /> : <VideocamOffSharpIcon />}
          </Fab>
        </VideButtonsWrapper>
      </Grid>
    </div>
  );
};

const VideButtonsWrapper = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
`;

export default Session;
