import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Launcher } from 'react-chat-window';
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
import { UserContext } from '../contexts/UserContext';
import { makeStyles } from '@mui/styles';

const Nav = () => {
  const { user, navValue, setNavValue, urlAPI } = useContext(UserContext);
  const history = useHistory();

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

  const logout = async () => {
    const auth = axios.create({
      baseURL: 'http://localhost:3001/',
      withCredentials: true, //I read around that you need this for cookies to be sent?
    });
    try {
      await auth.get('/api/v1/users/logout').then(() => {
        history.push(`/`);
      });
    } catch (err) {
      console.log(err);
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
                <Avatar
                  alt={`${user.firstname}`}
                  src={`${urlAPI}/img/users/${user.profilePic}`}
                />
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
                <Link to={`/user/${user._id}`}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link to="/me">
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Link>
                <MenuItem
                  onClick={async () => {
                    await logout().then(() => {
                      window.location.reload(false);
                    });
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
