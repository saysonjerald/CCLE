import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Grid,
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
import { useSnackbar } from 'notistack';

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

function currencyConvert(value) {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(value);
}

export default function PendingCardTeacher({
  appointmentId,
  profilePic,
  firstname,
  lastname,
  programmingLanguage,
  startingDate,
  endingDate,
  timeSpend,
  ratePerMinute,
  totalRate,
  totalCommission,
  totalAmount,
  setPendingAppointmentStudent,
  match,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { user, urlAPI } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const [openStatus, setOpenStatus] = useState();

  const handleClickOpen = (status) => {
    setOpen(true);
    setOpenStatus(status);
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

  const updateAppointment = async (status) => {
    try {
      const res = await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .patch(
          `${urlAPI}api/v1/users/${match.params.id}/pendingAppointment/student/update`,
          {
            appointmentId,
            pendingStatus: status,
            startingDate,
            endingDate,
          }
        )
        .then(async () => {
          await axios
            .create({
              baseURL: urlAPI,
              withCredentials: true, //I read around that you need this for cookies to be sent?
            })
            .get(`api/v1/users/${match.params.id}/pendingAppointment/student`)
            .then((data) => {
              setPendingAppointmentStudent(data.data.pendingAppointmentStudent);
            })
            .then(() => {
              enqueueSnackbar(`Appointment status to ${status}!`, {
                variant: 'success',
              });
            });
        });

      if (res.status === 'success') {
        console.log('Success: Pending Status Updated');
      }
    } catch (err) {
      enqueueSnackbar(`${err.response.data.message}`, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt={`${firstname} ${lastname}`}
              src={`${urlAPI}/img/users/${profilePic}`}
            />
            <div style={{ marginLeft: '10px' }}>
              <Typography variant="h5" component="div">
                {firstname + ' ' + lastname}
              </Typography>
              <Typography component="p">
                Want to learn: {programmingLanguage}
              </Typography>
            </div>
          </div>
          <br />
          <div>
            <Typography component="p">
              Session: {time_convert(timeSpend)}
            </Typography>
            <br />
            <Typography variant="body2">
              Starting Date: <br />
              {new Date(startingDate).toLocaleString([], {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
              <br />
              <br />
              End Date: <br />
              {new Date(endingDate).toLocaleString([], {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>
            <br />
            <Typography variant="body2">
              Rate per minute: {currencyConvert(ratePerMinute)}
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
          </div>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              handleClickOpen('accept');
            }}
          >
            Accept
          </Button>
          <Button
            size="small"
            onClick={() => {
              handleClickOpen('reject');
            }}
          >
            Reject
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ???? Appointment Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to {openStatus} {firstname} {lastname}'s
            appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={async (e) => {
              if (openStatus === 'reject') {
                await updateAppointment('Rejected')
                  .then(() => {
                    handleClose();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }

              if (openStatus === 'accept') {
                await updateAppointment('Accepted')
                  .then(() => {
                    handleClose();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
