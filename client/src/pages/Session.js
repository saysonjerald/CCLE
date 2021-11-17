import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Grid, Snackbar, Button } from '@mui/material';
import { io } from 'socket.io-client';
import { Editor } from '../components/CodeEditor';
import { UserContext } from '../contexts/UserContext';
import { Launcher } from 'react-chat-window';

let socket;

const Session = ({ match }) => {
  const { user, urlAPI } = useContext(UserContext);
  const [roomID, setroomID] = useState();
  const [fullname, setFullname] = useState(
    `${user.firstname} ${user.lastname}`
  );
  const [message, setMessage] = useState();

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleOpen = (newState) => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const history = useHistory();

  const getSession = async () => {
    try {
      await axios.get(`http://localhost:3001/session/${match.params.id}`);
    } catch (err) {
      console.log('err', err);
      history.push('/find-tutors');
    }
  };

  useEffect(() => {
    socket = io(urlAPI);

    (async () => {
      await getSession();
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
      setMessage('joined the room');
    });

    socket.on('bye', (name) => {
      handleOpen({
        vertical: 'buttom',
        horizontal: 'left',
      });
      setFullname(`${user.firstname} ${user.lastname}` === name ? 'You' : name);
      setMessage('has beed disconnected from the room');
    });
  }, []);
  return (
    <>
      <Grid
        style={{
          minWidth: '100%',
          height: '100vh',
        }}
      >
        <Editor roomID={roomID} name={user.firstname} />
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={`${fullname} ${message}`}
          key={vertical + horizontal}
        />
      </Grid>
    </>
  );
};

export default Session;
