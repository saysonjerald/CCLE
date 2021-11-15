import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import Bill from './Bill';

export default function PendingCardStudent({
  appointmentId,
  studentId,
  teacherId,
  profilePic,
  firstname,
  lastname,
  programmingLanguage,
  startingDate,
  endingDate,
  pendingStatus,
  timeSpend,
  grossPay,
  commission,
  netPay,
  setPendingAppointmentTeacher,
}) {
  const { user, urlAPI } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (status) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createBooking = async () => {
    try {
      await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .post(`${urlAPI}api/v1/users/${user.id}/booking`, {
          appointmentId,
          programmingLanguage,
          student: studentId,
          teacher: teacherId,
          startingDate,
          endingDate,
          expireDate: endingDate,
          timeSpend,
          grossPay,
          commission,
          netPay,
        })
        .then(async () => {
          await axios
            .create({
              baseURL: urlAPI,
              withCredentials: true, //I read around that you need this for cookies to be sent?
            })
            .get(`api/v1/users/${user.id}/pendingAppointment/teacher`)
            .then((data) => {
              setPendingAppointmentTeacher(data.data.pendingAppointmentTeacher);
            });
        });
    } catch (err) {
      console.log('error', err.response.data.message);
    }
  };

  return (
    <>
      <Grid item>
        <Card sx={{ maxWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Status: {pendingStatus}
            </Typography>
            <Avatar
              alt={`${firstname} ${lastname}`}
              src={`${urlAPI}/img/users/${profilePic}`}
            />
            <Typography variant="h5" component="div">
              {firstname + ' ' + lastname}
            </Typography>
            <Typography variant="body2">
              Starting Date: <br />
              {new Date(startingDate).toLocaleString()}
              <br />
              <br />
              End Date: <br />
              {new Date(endingDate).toLocaleString()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleClose}>
              Cancel
            </Button>
            {pendingStatus === 'Accepted' && (
              <Button size="small" onClick={handleClickOpen}>
                Pay Now
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ❗ Payment Confirmation
        </DialogTitle>
        <DialogContent>
          <Bill />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={async (e) => {
              await createBooking()
                .then(() => {
                  handleClose();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            autoFocus
          >
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
