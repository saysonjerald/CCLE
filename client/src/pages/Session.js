import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Peer from 'peerjs';
import axios from 'axios';
import {
  Grid,
  Snackbar,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  Avatar,
  Typography,
} from '@mui/material';
import { io } from 'socket.io-client';
import { Editor } from '../components/CodeEditor';
import TimerCountdown from '../components/TimerCountdown';
// import TerminalUI from '../components/Terminal';
import { Rnd } from 'react-rnd';
import { UserContext } from '../contexts/UserContext';
import ReviewPost from '../components/ReviewPost';
import { Widget, addResponseMessage } from 'react-chat-theme';
import styled from 'styled-components';
import { ReviewContext } from '../contexts/ReviewContext';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffSharpIcon from '@mui/icons-material/VideocamOffSharp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import CallEndIcon from '@mui/icons-material/CallEnd';

const Session = ({ match }) => {
  const { user, urlAPI, urlAPIFrontEnd } = useContext(UserContext);
  const history = useHistory();
  const { reviewer, setReviewer } = useContext(ReviewContext);

  //Teacher
  const [teacher, setTeacher] = useState();
  const [teacherID, setTeacherID] = useState();

  //Video Cam MySelf
  const myFace = useRef(null);
  const peerFace = useRef(null);
  const peerInstance = useRef(null);
  const myStream = useRef();

  const socket = io(urlAPI);
  const [isValid, setIsValid] = useState(false);
  const [fullname, setFullname] = useState(
    `${user.firstname} ${user.lastname}`
  );
  const [description, setDescription] = useState();
  const [language, setLanguage] = useState('C#');

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const [expireDate, setExpireDate] = useState();
  const [startingDate, setStartingDate] = useState();

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

  const handleChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  //-- -- Start ----End Session Button
  const [endSessionBtn, setEndSessionBtn] = useState(false);
  const handleEndSessionOpen = async (value) => {
    await getTeacher();
    setEndSessionBtn(value);
  };

  const handleEndSessionClose = () => {
    setEndSessionBtn(false);
  };

  const [endSessionTeacherBtn, setEndSessionTeacherBtn] = useState(false);
  const handleEndSessionTeacherOpen = () => {
    setEndSessionTeacherBtn(true);
  };

  const handleEndSessionTeacherClose = () => {
    setEndSessionTeacherBtn(false);
  };
  // ------End ----

  // Double Click Video fullscreen
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

  // Mute Microphone
  const muteMic = async () => {
    try {
      await myStream.current
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsMuted(!isMuted);
    } catch (err) {
      console.log(err);
    }
  };

  // Turn of Camera
  const turnOffCam = async () => {
    try {
      await myStream.current
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsCameraOn(!isCameraOn);
      myFace.current.hidden = !myFace.current.hidden;
      socket.emit(
        'hidePeerFace',
        match.params.id,
        user.id,
        isCameraOn ? true : false
      );
    } catch (err) {
      console.log(err);
    }
  };

  // const handleCodeCompile = async (language) => {
  //   try {
  //     await axios
  //       .create({
  //         baseURL: urlAPI,
  //         withCredentials: true, //I read around that you need this for cookies to be sent?
  //       })
  //       .post(`${urlAPI}compile`, {
  //         language,
  //         codeString,
  //       })
  //       .then((result) => {
  //         console.log(result);
  //       });
  //   } catch (err) {
  //     console.log('error', err);
  //   }
  // };

  const [peerId, setPeerId] = useState(null);
  const peer = new Peer();

  const fetchInfo = () => {
    return new Promise(async (resolve, reject) => {
      await axios.all([
        await axios
          .get(`${urlAPI}session/${match.params.id}`)
          .then((data) => {
            if (
              (data.data.session.student === user.id ||
                data.data.session.teacher === user.id) &&
              new Date(Date.now()) >=
                new Date(data.data.session.startingDate) &&
              new Date(Date.now()) <= new Date(data.data.session.expireDate)
            ) {
              setIsValid(true);
              setTeacherID(data.data.session.teacher);
              setStartingDate(data.data.session.startingDate);
              setExpireDate(data.data.session.expireDate);
              console.log('joining room');
              socket.emit(
                'join_room',
                match.params.id,
                user.id,
                (roomId) => {}
              );
              return;
            } else {
              socket.emit('disconnect');
              throw 'User not allowed to enter';
            }
          })
          .catch((err) => {
            console.log('err', err);
            history.push('/find-tutors');
            window.location.reload(false);
          }),
        await axios.get(`${urlAPI}api/v1/users/${teacherID}`).then((data) => {
          console.log(data.data);
          setTeacher(data.data.user);
        }),
      ]);
    });
  };

  const getTeacher = async () => {
    await axios.get(`${urlAPI}api/v1/users/${teacherID}`).then((data) => {
      setTeacher(data.data.user);
    });
  };

  useEffect(() => {
    fetchInfo();
    peer.on('open', (id) => {
      setPeerId(id);
      socket.emit('sendID', id, match.params.id);

      const getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        myStream.current = mediaStream;
        myFace.current.muted = true;
        myFace.current.srcObject = mediaStream;
      });
    });

    peer.on('call', (call) => {
      const getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        myStream.current = mediaStream;
        myFace.current.muted = true;
        myFace.current.srcObject = mediaStream;

        call.answer(mediaStream);
        call.on('stream', function (remoteStream) {
          peerFace.current.srcObject = remoteStream;
        });
      });
    });

    socket.on('receiveId', (id) => {
      call(id);
    });

    socket.on('hidePeerFace', (userId, value) => {
      if (user.id !== userId) {
        peerFace.current.hidden = value;
      }
    });

    peerInstance.current = peer;

    socket.on('welcome', (name) => {
      handleOpen({
        vertical: 'buttom',
        horizontal: 'left',
      });
      setFullname(`${user.firstname} ${user.lastname}` === name ? 'You' : name);
      setDescription('joined the room');
    });

    const getSession = async (socket) => {
      await axios
        .get(`${urlAPI}session/${match.params.id}`)
        .then((data) => {
          if (
            data.data.session.student === user.id ||
            (data.data.session.teacher === user.id &&
              new Date(Date.now()) >=
                new Date(data.data.session.startingDate) &&
              new Date(Date.now()) <= new Date(data.data.session.expireDate))
          ) {
            setIsValid(true);
            setTeacherID(data.data.session.teacher);
            setStartingDate(data.data.session.startingDate);
            setExpireDate(data.data.session.expireDate);
            console.log('joining room');
            socket.emit('join_room', match.params.id, user.id, (roomId) => {});
            return;
          } else {
            socket.emit('disconnect');
            throw 'User not allowed to enter';
          }
        })
        .catch((err) => {
          console.log('err', err);
          history.push('/find-tutors');
          window.location.reload(false);
        });
    };

    (async () => {
      await getSession(socket);
    })();

    (async () => {
      await getTeacher();
    })();

    socket.emit('setName', fullname);

    socket.on('bye', (name) => {
      handleOpen({
        vertical: 'buttom',
        horizontal: 'left',
      });
      setFullname(`${user.firstname} ${user.lastname}` === name ? 'You' : name);
      setDescription('has beed disconnected from the room');

      socket.emit('leave-room', match.params.id);
    });

    socket.on('receive_messasge', (message, userId) => {
      if (user.id !== userId) addResponseMessage(message);
    });
  }, []);

  const call = (remotePeerId) => {
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      myStream.current = mediaStream;
      myFace.current.muted = true;
      myFace.current.srcObject = mediaStream;

      var call = peerInstance.current.call(remotePeerId, mediaStream);
      call.on('stream', (remoteStream) => {
        peerFace.current.srcObject = remoteStream;
      });

      call.on('close', () => {
        peerFace.current.remove();
      });
    });
  };

  return (
    <div>
      <Grid
        style={{
          minWidth: '100%',
          height: '100vh',
          position: 'relative',
        }}
      >
        <Editor
          roomID={match.params.id}
          name={user.firstname}
          language={language}
          // setCodeString={setCodeString}
        />
        <Widget
          handleNewUserMessage={(message) => {
            socket.emit('send_messasge', message, user.id, match.params.id);
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

        <Rnd
          style={{ zIndex: 999 }}
          default={{
            x: 350,
            y: 300,
          }}
        >
          <video
            onDoubleClick={() => {
              openFullscreen();
            }}
            ref={peerFace}
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

        {/* <TerminalUI /> */}

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
          <Fab
            variant="extended"
            style={{ backgroundColor: '#EA5044', marginLeft: '20px' }}
            onClick={async () => {
              if (teacherID !== user.id) {
                await handleEndSessionOpen(true);
              } else {
                handleEndSessionTeacherOpen();
              }
            }}
          >
            <CallEndIcon sx={{ mr: 1 }} />
            End Session
          </Fab>
        </VideButtonsWrapper>
        {/* <CodeEditorButtonsWrapper>
          <Fab
            variant="extended"
            style={{ marginLeft: '10px' }}
            onClick={() => {
              handleCodeCompile(language);
            }}
          >
            <PlayArrowIcon sx={{ mr: 1 }} />
            Run
          </Fab>
          <Fab variant="extended" style={{ marginLeft: '10px' }}>
            <WebAssetIcon sx={{ mr: 1 }} />
            Output
          </Fab>
        </CodeEditorButtonsWrapper> */}
        <FormControl
          style={{
            position: 'absolute',
            top: '5%',
            right: '1%',
            width: '300px',
            zIndex: 99,
          }}
        >
          <InputLabel id="selectedProgrammingLanguage">
            Select Programming Language
          </InputLabel>
          <Select
            labelId="selectedProgrammingLanguage"
            id="demo-simple-select"
            value={language}
            label="Programming Language"
            onChange={handleChangeLanguage}
          >
            <MenuItem value={'C#'}>C#</MenuItem>
            <MenuItem value={'C++'}>C++</MenuItem>
            <MenuItem value={'Go'}>Go</MenuItem>
            <MenuItem value={'Java'}>Java</MenuItem>
            <MenuItem value={'Kotlin'}>Kotlin</MenuItem>
            <MenuItem value={'Lua'}>Lua</MenuItem>
            <MenuItem value={'JavaScript'}>JavaScript</MenuItem>
            <MenuItem value={'Pascal'}>Pascal</MenuItem>
            <MenuItem value={'Perl'}>Perl</MenuItem>
            <MenuItem value={'Php'}>Php</MenuItem>
            <MenuItem value={'Python3'}>Phython3</MenuItem>
            <MenuItem value={'R'}>R</MenuItem>
            <MenuItem value={'Ruby'}>Ruby</MenuItem>
            <MenuItem value={'Shell'}>Shell</MenuItem>
            <MenuItem value={'SQL'}>SQL</MenuItem>
            <MenuItem value={'Swift'}>Swift</MenuItem>
          </Select>
        </FormControl>
        <TimerWrapper>
          <TimerCountdown
            startingDate={startingDate}
            expireDate={expireDate}
            handleEndSessionOpen={handleEndSessionOpen}
            userId={user.id}
            teacherID={teacherID}
          />
        </TimerWrapper>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={`${fullname} ${description}`}
          key={vertical + horizontal}
        />
      </Grid>
      <Dialog
        open={endSessionBtn}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Please write a review to this teacher before you leave'}
        </DialogTitle>
        <DialogContent>
          {teacher && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '15px',
                margin: '5px',
                backgroundColor: '#383838',
              }}
            >
              <Avatar
                alt={`${teacher.firstname} ${teacher.lastname}`}
                src={`${urlAPI}img/users/${teacher.profilePic}`}
                style={{ marginRight: '15px' }}
              />
              <div>
                <Typography
                  component="h3"
                  variant="p"
                >{`${teacher.firstname} ${teacher.lastname}`}</Typography>
                <Typography component="p" variant="p">
                  Teacher
                </Typography>
              </div>
            </div>
          )}
          <ReviewPost
            userURL={teacherID}
            reviewer={reviewer}
            setReviewer={setReviewer}
            match={match.params.id}
            userID={user.id}
            teacherID={teacherID}
            endSessionTeacherBtn={endSessionTeacherBtn}
            endSessionBtn={endSessionBtn}
          />
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          {new Date(Date.now()).getTime() < new Date(expireDate).getTime() ? (
            <Button onClick={handleEndSessionClose}>Cancel</Button>
          ) : (
            ''
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={endSessionTeacherBtn}
        keepMounted
        aria-labelledby="alert-prompt-quet"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-prompt-quet">
          {'Are you sure you want to end this session?'}
        </DialogTitle>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={() => {
              history.push(`/user/${user.id}`);
              window.location.reload(false);
            }}
          >
            Yes
          </Button>
          <Button onClick={handleEndSessionTeacherClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const VideButtonsWrapper = styled.div`
  position: absolute;
  bottom: 7%;
  left: 50%;
  z-index: 99;
  transform: translateX(-50%);
`;

// const CodeEditorButtonsWrapper = styled.div`
//   position: absolute;
//   bottom: 5%;
//   left: 8%;
//   z-index: 99;
//   transform: translateX(-50%);
// `;

const TimerWrapper = styled.div`
  position: absolute;
  bottom: 2%;
  left: 50%;
  z-index: 99;
  transform: translateX(-50%);
`;

export default Session;
