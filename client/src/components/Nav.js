import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { UserContext } from '../contexts/UserContext';
import { makeStyles } from '@mui/styles';

const Nav = () => {
  const { user, loading, navValue, setNavValue } = useContext(UserContext);

  const useStyles = makeStyles({
    navHide: {
      padding: '0!important',
      minWidth: '0!important',
    },
  });

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <Tab
              className={classes.navHide}
              value="3"
              onClick={(e) => setNavValue('3')}
            />
          </Tabs>
          {user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" src={'../img/users/default.jpg'} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/profile">
                  <MenuItem onClick={handleClose} href="/profile">
                    Profile
                  </MenuItem>
                </Link>
                <Link to="/me">
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
