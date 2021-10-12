import React, { useState, useContext, useEffect } from 'react';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function IsEmailVerify() {
  const { user } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user.isVerify) {
      setOpen(true);
    }
  }, [user]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'⛔ Your account is not verified yet!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            We've sent you an email. Please check your email to verify your
            account! <br />
            <br />⭕ This message will be remove automatically once you are
            verified.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Logout</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
