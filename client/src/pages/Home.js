import React, { useState } from 'react';
import LoginSection from '../components/Login';
import RegisterSection from '../components/Register';
import styled from 'styled-components';
import UserContextProvider from '../contexts/UserContext';

const Home = () => {
  const [isHide, setIsHide] = useState('true');
  return (
    <Wrapper>
      <FormWrapper>
        <UserContextProvider>
          <LoginSection isHide={isHide} setIsHide={setIsHide} />
          <RegisterSection isHide={isHide} setIsHide={setIsHide} />
        </UserContextProvider>
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
