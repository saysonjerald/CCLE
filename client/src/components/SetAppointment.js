import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
  TextField,
  Typography,
  Slider,
} from '@mui/material';

import 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker, TimePicker } from '@mui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SetAppointment() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const today = new Date();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [timeSpend, setTimeSpend] = useState(30);

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  const handleChangeTime = (newValue) => {
    setTime(newValue);
  };

  const marks = [
    {
      value: 30,
      label: '30MIN',
    },
    {
      value: 180,
      label: '3HR',
    },
    {
      value: 360,
      label: '6HR',
    },
    {
      value: 540,
      label: '9HR',
    },
    {
      value: 720,
      label: '12HR',
    },
  ];

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

  function valueLabelFormat(value) {
    return time_convert(value);
  }

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Set Appointment
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        style={{ textAlign: 'center' }}
      >
        <DialogTitle>{'Make an Appointment'}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <br />
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/dd/yyyy"
                value={date}
                minDate={today.setDate(today.getDate() + 1)}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Starting Time"
                value={time}
                onChange={handleChangeTime}
                renderInput={(params) => <TextField {...params} />}
              />
              <Typography id="track-false-slider" style={{ margin: '20px' }}>
                Time you want to spend
              </Typography>
              <Slider
                aria-labelledby="track-false-slider"
                getAriaValueText={valueLabelFormat}
                valueLabelFormat={valueLabelFormat}
                onChange={(e) => setTimeSpend(e.target.value)}
                defaultValue={30}
                min={30}
                max={720}
                marks={marks}
                valueLabelDisplay="on"
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
