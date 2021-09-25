import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';

import { UserContext } from '../contexts/UserContext';

const Nav = () => {
  const { user, loading, navValue, setNavValue } = useContext(UserContext);

  const isLoggedIn = () => {
    if (user) {
      let content = [];

      for (let i = 0; i < 2; i++) {
        if (i === 0) {
          content[i] = (
            <Tab
              key={i + 10}
              label="Profile"
              component={Link}
              to="/me"
              value="3"
              onClick={(e) => setNavValue('3')}
            />
          );
        }

        if (i === 1) {
          content[i] = (
            <Tab
              key={i + 10}
              label="Logout"
              component={Link}
              to="/logout"
              value="4"
              onClick={(e) => setNavValue('4')}
            />
          );
        }
      }
      return content;
    }
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} component="h1" variant="h6">
            Codelaborate
          </Typography>
          <Tabs textColor="primary" value={navValue}>
            <Tab
              label="Home"
              component={Link}
              to="/"
              value="1"
              onClick={(e) => setNavValue('1')}
            />
            <Tab
              label="Find Tutor"
              component={Link}
              to="/find-tutors"
              value="2"
              onClick={(e) => setNavValue('2')}
            />
            {isLoggedIn()}
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  );
};

const NavStyle = styled.nav`
  width: 100%;
  height: 30px;
  background-color: #111;
  display: flex;
  justify-content: end;
  align-items: center;

  & .nav__wrapper {
    width: 35%;
    display: flex;
    justify-content: space-around;
  }

  & .link {
    font-size: 16px;
  }
`;

export default Nav;
