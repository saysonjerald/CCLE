import React, { useContext, useState, useEffect } from 'react';
import LoginSection from '../components/Login';
import RegisterSection from '../components/Register';
import styled from 'styled-components';
import { Paper } from '@mui/material';
import { UserContext } from '../contexts/UserContext';

const Home = ({ match }) => {
  const { user, setUser, setNavValue } = useContext(UserContext);
  const [isHide, setIsHide] = useState(
    match.params.option === 'in' ? true : false
  );

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
      <Paper elevation={8}>
        <LoginSection
          isHide={isHide}
          setIsHide={setIsHide}
          user={user}
          setUser={setUser}
        />
        <RegisterSection isHide={isHide} setIsHide={setIsHide} />
      </Paper>
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

export default Home;
