import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
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
  Autocomplete,
  Checkbox,
  Divider,
  Chip,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';

import { ProrammingLanguageContext } from '../contexts/ProgrammingLanguageContext';
import { UserContext } from '../contexts/UserContext';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SetAppointment({ profileId }) {
  const { user, urlAPI } = useContext(UserContext);
  const { programmingLanguageKnown } = useContext(ProrammingLanguageContext);

  const today = new Date();
  const [open, setOpen] = React.useState(false);
  const commission = 0.0333;
  const [choosenLanguage, setChoosenLanguage] = useState();
  const [ratePerMinute, setRatePerMinute] = useState(0);
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState();
  const [timeSpend, setTimeSpend] = useState(30);
  const [totalCommission, setTotalCommission] = useState(0);
  const [totalRate, setTotalRate] = useState(0);
  const [total, setTotal] = useState(0);

  const [value, setValue] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeLanguage = (newValue) => {
    if (newValue) {
      const result = programmingLanguageKnown.find(
        ({ language }) => language === newValue
      );
      const totalCommission = timeSpend * commission;
      const totalRate = timeSpend * result.ratePerMinute;
      setTotal(totalCommission + totalRate);
      setChoosenLanguage(newValue);
      setRatePerMinute(result.ratePerMinute);
    } else {
      setTotal(0);
      setRatePerMinute(0);
      setTimeSpend(30);
    }
  };

  const handleChangeDate = (newValue) => {
    setStartingDate(newValue);
  };

  const handleChangeTimeWillSpend = (newValue) => {
    if (choosenLanguage) {
      setTimeSpend(newValue.target.value);
      calculate(newValue.target.value);
    }
  };

  function end(dt, minutes) {
    return new Date(dt.getTime() + minutes * 60000);
  }

  function calculate(value) {
    const totalCommission = value * commission;
    const totalRate = value * ratePerMinute;
    setTotalCommission(totalCommission);
    setTotalRate(totalRate);
    setTotal(totalCommission + totalRate);
    setEndingDate(end(startingDate, value));
  }

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

  function currencyConvert(value) {
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(value);
  }

  const addPendingAppointment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .post(`${urlAPI}api/v1/users/${profileId}/pendingAppointment`, {
          programmingLanguage: choosenLanguage,
          startingDate: startingDate.toUTCString(),
          endingDate: endingDate.toUTCString(),
          timeSpend,
          grossPay: totalRate,
          commission: totalCommission,
          netPay: total,
        });

      if (res.data.status === 'success') {
        return res;
      }
    } catch (err) {
      console.log('error', err.response.data.message);
    }
  };

  function disableTime(time) {
    console.log(startingDate);
    console.log(time);
    return 10 < time;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Hello');
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [timeSpend]);

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
              <Autocomplete
                id="programmingLanguages"
                options={
                  programmingLanguageKnown.length
                    ? programmingLanguageKnown.map((el) => el.language)
                    : []
                }
                onChange={(event, value) => {
                  handleChangeLanguage(value);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.language === value.language
                }
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8, backgroundColor: '#333' }}
                    />
                    {option}
                  </li>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Programming langauge you want to discuss/learn"
                    placeholder="Add programming language"
                  />
                )}
              />
              <DateTimePicker
                label="Starting Date"
                value={startingDate}
                minDate={today.setDate(today.getDate() + 1)}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
              <Typography id="track-false-slider" style={{ margin: '20px' }}>
                Time you want to spend
              </Typography>
              <Slider
                value={timeSpend ? timeSpend : 30}
                aria-labelledby="track-false-slider"
                getAriaValueText={valueLabelFormat}
                valueLabelFormat={valueLabelFormat}
                onChange={handleChangeTimeWillSpend}
                defaultValue={30}
                min={30}
                max={720}
                marks={marks}
                valueLabelDisplay="on"
                style={{ marginBottom: '20px' }}
              />
              <p>
                Appointment ends on{' '}
                {endingDate ? endingDate.toLocaleString() : 'Not set'}
              </p>
              <Divider>
                <Chip label="Breakdown" />
              </Divider>
              <p>
                Rate per minute: {currencyConvert(ratePerMinute)}
                <br /> Total Rate: {currencyConvert(totalRate)}
                <br /> Commission per minute: {currencyConvert(commission)}
                <br /> Total Commission: {currencyConvert(totalCommission)}
              </p>
              <Divider>
                <Chip label="Amount to Pay" />
              </Divider>
              <Typography component="h4" variant="h3">
                {currencyConvert(total)}
              </Typography>
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={async (e) => {
              await addPendingAppointment(e)
                .then(() => {
                  handleClose();
                })
                .catch((err) => {
                  console.log(err);
                  handleClose();
                });
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
