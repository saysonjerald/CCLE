import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const LoginSection = ({ isHide, setIsHide, user, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const useStyles = makeStyles({
    button: {
      marginTop: '5px',
      marginBottom: '5px',
    },
  });

  const classes = useStyles();

  const login = async (email, password) => {
    const auth = axios.create({
      baseURL: 'http://localhost:3001/',
      withCredentials: true, //I read around that you need this for cookies to be sent?
    });
    try {
      await auth
        .post('/api/v1/users/login', {
          email,
          password,
        })
        .then((currentUser) => {
          setUser(currentUser.data.user);
          return currentUser.data.user;
        })
        .then((user) => {
          if (user) {
            history.push(`/user/${user._id}`);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Form
      isHide={isHide}
      setIsHide={setIsHide}
      onSubmit={onSubmitHandler}
      autoComplete="off"
    >
      <Typography component="h4" variant="h5" align="center" gutterBottom>
        Sign In
      </Typography>
      <TextField
        label="Email"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        margin="normal"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className={classes.button}
        type="submit"
        variant="contained"
        color="secondary"
        endIcon={<ArrowForwardIosOutlinedIcon fontSize="small" />}
      >
        Sign In
      </Button>
      <Button
        className={classes.button}
        variant="outline"
        color="secondary"
        onClick={() => {
          setIsHide(false);
        }}
        endIcon={<ArrowForwardIosOutlinedIcon fontSize="small" />}
      >
        Register Now
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: ${(props) => (props.isHide ? 'flex' : 'none')};
  flex-direction: column;
`;

export default LoginSection;
