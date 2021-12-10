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
import { useSnackbar } from 'notistack';

//#region Testing
const RegisterSection = ({ isHide, setIsHide }) => {
  const { setUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState('male');
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const history = useHistory();

  const useStyles = makeStyles({
    button: {
      marginTop: '16px',
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
      marginBottom: '12px',
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
      enqueueSnackbar(`Email already exist!`, {
        variant: 'error',
      });
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
      <Typography
        component="h4"
        variant="h4"
        align="center"
        gutterBottom
        mb={4}
        className={classes.signInText}
      >
        Create an account
      </Typography>
      <TextField
        className={classes.textInput}
        inputProps={{ style: { textTransform: 'capitalize' } }}
        label="First Name"
        type="text"
        required
        onChange={(e) => setFirstname(e.target.value)}
      />
      <TextField
        className={classes.textInput}
        inputProps={{ style: { textTransform: 'capitalize' } }}
        label="Last Name"
        type="text"
        required
        onChange={(e) => setLastname(e.target.value)}
      />
      <FormControl component="fieldset" id="genders">
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
        className={classes.textInput}
        label="Email"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className={classes.textInput}
        label="Password"
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        className={classes.textInput}
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
        className={classes.button}
      >
        SIGN UP
      </Button>
      <Button
        variant="outline"
        color="secondary"
        onClick={() => {
          setIsHide(true);
        }}
        startIcon={<ArrowBackIosOutlinedIcon fontSize="small" />}
        className={classes.button}
      >
        Back to Login
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: ${(props) => (!props.isHide ? 'flex' : 'none')};
  flex-direction: column;
  width: 684px;
  padding: 74px;
  background-color: #383838;
  align-items: center;

  #genders {
    width: 500px;
    margin-bottom: '12px';
  }
`;
//#endregion

export default RegisterSection;
