import React, { useContext, useState } from 'react';
import LoginSection from '../components/Login';
import RegisterSection from '../components/Register';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';

const Home = () => {
  const [isHide, setIsHide] = useState('true');
  const { user, setUser, setNavValue } = useContext(UserContext);

  setNavValue('1');

  return (
    <Wrapper>
      <FormWrapper>
        <LoginSection
          isHide={isHide}
          setIsHide={setIsHide}
          user={user}
          setUser={setUser}
        />
        <RegisterSection isHide={isHide} setIsHide={setIsHide} />
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
