import React from 'react';
import styled from 'styled-components';

const LoginSection = ({ isHide, setIsHide }) => {
  const hideHandler = () => {
    if (isHide) {
      setIsHide(!isHide);
    } else {
      setIsHide(!isHide);
    }
  };

  render(return (
    <Form isHide={isHide} setIsHide={setIsHide} action="POST">
      <h3 className="headerName">Sign In</h3>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <a href="/">Forgot password?</a>
      <button type="submit">Submit</button>
      <p onClick={hideHandler}>Register</p>
    </Form>
  );)
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
