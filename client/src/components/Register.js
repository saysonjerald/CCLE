import React from 'react';
import styled from 'styled-components';

const RegisterSection = ({ isHide, setIsHide }) => {
  const hideHandler = () => {
    if (isHide) {
      setIsHide(!isHide);
    } else {
      setIsHide(!isHide);
    }
  };

  return (
    <Form isHide={isHide} setIsHide={setIsHide} action="POST">
      <h3>Sign Up</h3>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <label htmlFor="passwordConfirm">Password Confirm</label>
      <input type="password" name="passwordConfirm" id="passwordConfirm" />
      <button type="submit">Submit</button>
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

export default RegisterSection;
