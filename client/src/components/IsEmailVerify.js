import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {} from 'react-router-dom';
import {
  Slide,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import { makeStyles } from '@mui/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function IsEmailVerify() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const useStyles = makeStyles({
    dialogWrapper: {
      padding: '40px',
    },
  });

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user.isVerify) {
      setOpen(true);
    }
  }, [user]);

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
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.dialogWrapper}>
          <DialogTitle mb={2}>
            {'🔔 Your account is not verified yet!'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              We have sent you an email. Please check your email to verify your
              account! <br />
              <br />
              🟢 This message will be remove automatically once you are
              verified.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={async () => {
                await logout().then(() => {
                  window.location.reload(false);
                });
              }}
            >
              Logout
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
