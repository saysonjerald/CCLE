import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { makeStyles } from '@mui/styles';

//#region Testing
const RegisterSection = ({ isHide, setIsHide }) => {
  const { setUser } = useContext(UserContext);

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState('male');
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const history = useHistory();

  const useStyles = makeStyles({
    button: {
      marginTop: '5px',
      marginBottom: '5px',
    },
    inputText: {
      marginTop: '5px',
      marginBottom: '5px',
    },
  });

  const classes = useStyles();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    register(firstname, lastname, gender, email, password, passwordConfirm);
  };

  const register = async (
    firstname,
    lastname,
    gender,
    email,
    password,
    passwordConfirm
  ) => {
    const auth = axios.create({
      baseURL: 'http://localhost:3001/',
      withCredentials: true, //I read around that you need this for cookies to be sent?
    });
    try {
      await auth
        .post('/api/v1/users/signup', {
          firstname,
          lastname,
          gender,
          email,
          password,
          passwordConfirm,
        })
        .then(() => {
          login(email, password);
        });
    } catch (err) {
      console.log(err);
    }
  };

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
        .then(async () => {
          await auth
            .get('/isLoggedIn')
            .then((currentUser) => {
              setUser(currentUser.data);
            })
            .then(() => {
              history.push('/me');
            });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      isHide={isHide}
      setIsHide={setIsHide}
      onSubmit={onSubmitHandler}
      autoComplete="off"
    >
      <Typography component="h4" variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        className={classes.inputText}
        label="First Name"
        type="text"
        required
        onChange={(e) => setFirstname(e.target.value)}
      />
      <TextField
        className={classes.inputText}
        label="Last Name"
        type="text"
        required
        onChange={(e) => setLastname(e.target.value)}
      />
      <FormControl component="fieldset" className={classes.inputText}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          aria-label="gender"
          name="row-radio-buttons-group"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <TextField
        className={classes.inputText}
        label="Email"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className={classes.inputText}
        label="Password"
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        className={classes.inputText}
        label="Confirm Password"
        type="password"
        required
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        endIcon={<ArrowForwardIosOutlinedIcon fontSize="small" />}
      >
        Register
      </Button>
      <Button
        variant="outline"
        color="secondary"
        onClick={() => {
          setIsHide(true);
        }}
        startIcon={<ArrowBackIosOutlinedIcon fontSize="small" />}
      >
        Sign In?
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: ${(props) => (!props.isHide ? 'flex' : 'none')};
  flex-direction: column;
`;
//#endregion

export default RegisterSection;
