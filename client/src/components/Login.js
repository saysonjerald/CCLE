import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useSnackbar } from 'notistack';

const LoginSection = ({ isHide, setIsHide, user, setUser }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const useStyles = makeStyles({
    button: {
      marginTop: '30px',
      marginBottom: '5px',
      width: '184px',
      fontFamily: 'Roboto Black',
    },

    signInText: {
      fontFamily: 'Roboto Black',
      borderColor: '#fff',
    },
    textInput: {
      width: '500px',
      marginBottom: '8px',
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
            enqueueSnackbar(`Hi ${user.firstname}, Welcome to CCLE`, {
              variant: 'success',
            });
          }
        });
    } catch (err) {
      enqueueSnackbar(
        `The email or password were incorrect. Please try again`,
        {
          variant: 'error',
        }
      );
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
      <Typography
        component="h4"
        variant="h4"
        align="center"
        gutterBottom
        mb={4}
        className={classes.signInText}
      >
        Sign In
      </Typography>
      <TextField
        label="Email"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        className={classes.textInput}
      />
      <TextField
        label="Password"
        type="password"
        margin="normal"
        required
        onChange={(e) => setPassword(e.target.value)}
        className={classes.textInput}
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
      {/* <Button
        className={classes.button}
        variant="outline"
        color="secondary"
        onClick={() => {
          setIsHide(false);
        }}
        endIcon={<ArrowForwardIosOutlinedIcon fontSize="small" />}
      >
        Register Now
      </Button> */}
      <Typography
        className="goToSignUp"
        onClick={() => {
          setIsHide(false);
        }}
        component="p"
        variant="a"
      >
        Dont have accout? Sign up here.
      </Typography>
    </Form>
  );
};

const Form = styled.form`
  display: ${(props) => (props.isHide ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  width: 684px;
  padding: 74px;
  background-color: #383838;

  .goToSignUp {
    margin-top: 20px;
  }

  .goToSignUp:hover {
    cursor: pointer;
  }
`;

export default LoginSection;
