import React, { useContext, useState, useEffect } from 'react';
import LoginSection from '../components/Login';
import RegisterSection from '../components/Register';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';

const Home = () => {
  const { user, setUser, setNavValue } = useContext(UserContext);
  const [isHide, setIsHide] = useState('true');

  useEffect(() => {
    let unmounted = false;

    if (unmounted) {
      setNavValue(false);
    }

    return () => {
      unmounted = true;
    };
  }, []);

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
