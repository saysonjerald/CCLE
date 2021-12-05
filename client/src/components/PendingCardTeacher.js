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
import { makeStyles } from '@mui/styles';
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
  ratePerMinute,
  totalRate,
  totalCommission,
  totalAmount,
  setPendingAppointmentTeacher,
  setBookedList,
  match,
}) {
  const { user, urlAPI } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (status) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles({
    card: {
      maxWidth: '350px',
      minWidth: '250px',
    },
  });
  const classes = useStyles();

  function currencyConvert(value) {
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(value);
  }

  function time_convert(num) {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return `${
      num < 60
        ? minutes + 'min'
        : num % 60 === 0
        ? hours + ' hour'
        : hours + ' hr' + ' : ' + minutes + 'min'
    }`;
  }

  const createBooking = async () => {
    const startingDate0s = new Date(startingDate).setSeconds(0);
    const endingDate0s = new Date(endingDate).setSeconds(0);
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
          startingDate: new Date(startingDate0s).toISOString(),
          endingDate: new Date(endingDate0s).toISOString(),
          expireDate: new Date(endingDate0s).toISOString(),
          timeSpend,
          totalRate,
          totalCommission,
          totalAmount,
        })
        .then(async () => {
          await axios
            .create({
              baseURL: urlAPI,
              withCredentials: true, //I read around that you need this for cookies to be sent?
            })
            .get(`api/v1/users/${user.id}/pendingAppointment/teacher`)
            .then((data) => {
              console.log(data.data.pendingAppointmentTeacher);
              setPendingAppointmentTeacher(data.data.pendingAppointmentTeacher);
            });
        });
    } catch (err) {
      console.log('error', err.response.data.message);
    }
  };

  const deleteAppointment = async (e) => {
    e.preventDefault();
    try {
      await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .delete(`${urlAPI}api/v1/users/${user.id}/pendingAppointment/`, {
          data: { _id: appointmentId },
        });
    } catch (err) {
      console.log('error', err.response.data.message);
    }
  };

  const updateStatus = async () => {
    try {
      await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .patch(
          `${urlAPI}api/v1/users/${match.params.id}/pendingAppointment/teacher/update`,
          { appointmentId, pendingStatus: 'Paid' }
        );
    } catch (err) {
      console.log(err);
    }
  };

  const refreshBooking = async () => {
    try {
      await axios
        .create({
          baseURL: 'http://localhost:3001/',
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .get(`api/v1/users/${match.params.id}/booking/`)
        .then((data) => {
          setBookedList(data.data.Booked);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Status:{' '}
            <span
              style={
                pendingStatus === 'Accepted' || pendingStatus === 'Paid'
                  ? {
                      backgroundColor: '#27e03084',
                      color: '#fff',
                      padding: '2px',
                      borderRadius: '3px',
                    }
                  : pendingStatus === 'Rejected'
                  ? {
                      backgroundColor: '#e03d2784',
                      color: '#fff',
                      padding: '2px',
                      borderRadius: '3px',
                    }
                  : {
                      backgroundColor: '#dde02784',
                      color: '#fff',
                      padding: '2px',
                      borderRadius: '3px',
                    }
              }
            >
              {pendingStatus}
            </span>
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt={`${firstname} ${lastname}`}
              src={`${urlAPI}/img/users/${profilePic}`}
            />
            <div style={{ marginLeft: '10px' }}>
              <Typography variant="h5" component="div">
                {firstname + ' ' + lastname}
              </Typography>
              <Typography variant="body2">
                Session: {time_convert(timeSpend)}
              </Typography>
            </div>
          </div>
          <br />
          <Typography variant="body2">
            Starting Date: <br />
            {new Date(startingDate).toLocaleString()}
            <br />
            <br />
            End Date: <br />
            {new Date(endingDate).toLocaleString()}
          </Typography>
          <br />
          <Typography variant="body2">
            Rate per Minute: {currencyConvert(ratePerMinute)}
          </Typography>
          <Typography variant="body2">
            Total Rate: {currencyConvert(totalRate)}
          </Typography>
          <Typography variant="body2">
            System Commission: {currencyConvert(totalCommission)}
          </Typography>
          <Typography variant="body2">
            Total: {currencyConvert(totalAmount)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={async (e) => {
              await deleteAppointment(e)
                .then(() => {
                  console.log('Appointment Successfuly Deleted');
                })
                .then(async () => {
                  await axios
                    .create({
                      baseURL: urlAPI,
                      withCredentials: true, //I read around that you need this for cookies to be sent?
                    })
                    .get(
                      `api/v1/users/${match.params.id}/pendingAppointment/teacher`
                    )
                    .then((data) => {
                      setPendingAppointmentTeacher(
                        data.data.pendingAppointmentTeacher
                      );
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Cancel
          </Button>
          {pendingStatus === 'Accepted' && (
            <Button size="small" onClick={handleClickOpen}>
              Pay Now
            </Button>
          )}
        </CardActions>
      </Card>
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
          <Bill
            ratePerMinute={ratePerMinute}
            timeSpend={timeSpend}
            totalRate={totalRate}
            totalCommission={totalCommission}
            totalAmount={totalAmount}
            programmingLanguage={programmingLanguage}
            startingDate={startingDate}
            endingDate={endingDate}
            teacher={`${firstname} ${lastname}`}
            student={`${user.firstname} ${user.lastname}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={async (e) => {
              await createBooking()
                .then(async () => {
                  await updateStatus();
                })
                .then(async () => {
                  await refreshBooking();
                })
                .then(async () => {
                  await axios
                    .create({
                      baseURL: urlAPI,
                      withCredentials: true, //I read around that you need this for cookies to be sent?
                    })
                    .get(
                      `api/v1/users/${match.params.id}/pendingAppointment/teacher`
                    )
                    .then((data) => {
                      setPendingAppointmentTeacher(
                        data.data.pendingAppointmentTeacher
                      );
                    });
                })
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
