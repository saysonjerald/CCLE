import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

//#region Testing
const RegisterSection = ({ isHide, setIsHide }) => {
  const [value, setValue] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const hideHandler = () => {
    if (isHide) {
      setIsHide(!isHide);
    } else {
      setIsHide(!isHide);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    register(
      value.firstname,
      value.lastname,
      value.email,
      value.password,
      value.passwordConfirm
    );
  };

  const onChangeFirstNameHandler = (e) => {
    setValue({ ...value, firstname: e.target.value });
  };

  const onChangeLastNameHandler = (e) => {
    setValue({ ...value, lastname: e.target.value });
  };

  const onChangeEmailHandler = (e) => {
    setValue({ ...value, email: e.target.value });
  };

  const onChangePasswordHandler = (e) => {
    setValue({ ...value, password: e.target.value });
  };

  const onChangePasswordConfirmHandler = (e) => {
    setValue({ ...value, passwordConfirm: e.target.value });
  };

  const register = async (
    firstname,
    lastname,
    email,
    password,
    passwordConfirm
  ) => {
    const auth = axios.create({
      baseURL: 'http://localhost:3001/',
      withCredentials: true, //I read around that you need this for cookies to be sent?
    });
    try {
      await auth.post('/api/v1/users/signup', {
        firstname,
        lastname,
        email,
        password,
        passwordConfirm,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form isHide={isHide} setIsHide={setIsHide} onSubmit={onSubmitHandler}>
      <h3>Sign Up</h3>
      <label htmlFor="firstname">First Name</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        onChange={onChangeFirstNameHandler}
      />
      <label htmlFor="lastname">Last Name</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        onChange={onChangeLastNameHandler}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={onChangeEmailHandler}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={onChangePasswordHandler}
      />
      <label htmlFor="passwordConfirm">Password Confirm</label>
      <input
        type="password"
        name="passwordConfirm"
        id="passwordConfirm"
        onChange={onChangePasswordConfirmHandler}
      />
      <input type="submit" value="Submit" />
      <p onClick={hideHandler}>Login</p>
    </Form>
  );
};

const Form = styled.form`
  display: ${(props) => (!props.isHide ? 'flex' : 'none')};
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
//#endregion

export default RegisterSection;
