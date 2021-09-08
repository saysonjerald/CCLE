import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const LoginSection = ({ isHide, setIsHide }) => {
  const { user, setUser, isLoading } = useContext(UserContext);
  console.log(user);
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const onChangeEmailHandler = (e) => {
    setValue({ ...value, email: e.target.value });
  };
  const onChangePasswordHandler = (e) => {
    setValue({ ...value, password: e.target.value });
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
          await axios.get('/verifyUser').then((res) => {
            setUser(res.data.currentUser);
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const hideHandler = () => {
    if (isHide) {
      setIsHide(!isHide);
    } else {
      setIsHide(!isHide);
    }
  };

  return (
    <Form isHide={isHide} setIsHide={setIsHide} action="POST">
      <h3 className="headerName">{user ? `${user.data.name}` : 'Sign In'}</h3>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={value.email}
        onChange={onChangeEmailHandler}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={value.password}
        onChange={onChangePasswordHandler}
      />
      <a href="/">Forgot password?</a>
      <input type="button" value="Submit" />
      <p onClick={hideHandler}>Register</p>
      <p>{value.email}</p>
      <p>{value.password}</p>
    </Form>
  );
};

const Form = styled.form`
  display: ${(props) => (props.isHide ? 'flex' : 'none')};
  flex-direction: column;

  & .headerName {
    margin-bottom: 14px;
  }

  & input {
    margin-bottom: 12px;
  }

  & p {
    margin-top: 20px;
    align-self: center;
    cursor: pointer;
  }
`;

export default LoginSection;
