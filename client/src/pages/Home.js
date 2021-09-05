import React from 'react';
import LoginSection from '../components/Login';
import Register from '../components/Register';
import styled from 'styled-components';
import { useState } from 'react';

class Home () {
  const [isHide, setIsHide] = useState('true');
  return (
    <Wrapper>
      <FormWrapper>
        <LoginSection isHide={isHide} setIsHide={setIsHide} />
        <Register isHide={isHide} setIsHide={setIsHide} />
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const FormWrapper = styled.div`
  background-color: #444;
  padding: 2rem;
`;

export default Home;
