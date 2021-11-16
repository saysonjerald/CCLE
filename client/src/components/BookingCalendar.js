import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  Card,
  Avatar,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { UserContext } from '../contexts/UserContext';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeStyles } from '@mui/styles';
import { stringToColour } from '../utils/stringToColor';
import styled from 'styled-components';

import { BookingContext } from '../contexts/BookingContext';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BookingCalendar = ({ match }) => {
  const { bookedList } = useContext(BookingContext);
  const { urlAPI, urlAPIFrontEnd } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const [dateSched, setDateSched] = useState();
  const [bookedByDate, setBookedByDate] = useState();
  const [link, setLink] = useState();

  const useStyles = makeStyles({
    bg: {
      backgroundColor: '#fff',
      color: '#222',
    },
  });

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

  const handleClickOpen = async (e) => {
    setOpen(true);
    setTitle(e.title.split(' - ')[0]);
    setDateSched(
      e.start.toLocaleString([], {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      })
    );
    await bookedUser(e.start);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const bookedUser = async (startingDate) => {
    await axios
      .create({
        baseURL: 'http://localhost:3001/',
        withCredentials: true, //I read around that you need this for cookies to be sent?
      })
      .get(
        `api/v1/users/${match.params.id}/booking/${new Date(
          startingDate
        ).toISOString()}`
      )
      .then((data) => {
        setBookedByDate(data.data.bookedbyDate[0]);
        return data;
      })
      .then((data) => {
        setLink(
          `${urlAPIFrontEnd}session/${data.data.bookedbyDate[0].session.id}`
        );
      });
  };

  const clickNewTab = () => {
    window.open(link);
  };

  return (
    <CalendarWrapper>
      <Calendar
        selectable
        localizer={localizer}
        events={
          bookedList &&
          bookedList.map((el) => {
            const startingDate = new Date(el.startingDate);
            const endingDate = new Date(el.endingDate);
            return {
              title: `${el.programmingLanguage} - ${el.student.firstname} ${el.student.lastname}`,
              start: new Date(
                startingDate.getFullYear(),
                startingDate.getMonth(),
                startingDate.getDate(),
                startingDate.getHours(),
                startingDate.getMinutes(),
                startingDate.getSeconds()
              ),
              end: new Date(
                endingDate.getFullYear(),
                endingDate.getMonth(),
                endingDate.getDate(),
                endingDate.getHours(),
                endingDate.getMinutes(),
                endingDate.getSeconds()
              ),
            };
          })
        }
        style={{ height: 500 }}
        onSelectEvent={(e) => handleClickOpen(e)}
        eventPropGetter={(event, start, end, isSelected) => {
          let newStyle = {
            backgroundColor: `#${stringToColour(event.title.split(' - ')[0])}`,
            color: 'black',
            borderRadius: '0px',
            border: 'none',
            textShadow: `0px 0px 10px #FFFFFF`,
          };

          if (event.isMine) {
            newStyle.backgroundColor = 'lightgreen';
          }

          return {
            className: '',
            style: newStyle,
          };
        }}
      />

      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          {bookedByDate && (
            <DialogTitle id="alert-dialog-title">
              <span style={{ color: '#ccc' }}>Start: </span>
              {new Date(bookedByDate.startingDate).toLocaleString([], {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              <br />
              <span style={{ color: '#ccc' }}>Ends: </span>
              {new Date(bookedByDate.endingDate).toLocaleString([], {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </DialogTitle>
          )}
          <DialogContent>
            <Typography
              component="h4"
              variant="p"
              style={{ textAlign: 'center' }}
            >
              Topic: {title} <br />
              Duration: {bookedByDate && time_convert(bookedByDate.timeSpend)}
            </Typography>
            {bookedByDate && (
              <div>
                <Card
                  variant="outlined"
                  style={{ display: 'flex', padding: '5px', margin: '5px' }}
                >
                  <Avatar
                    alt={`${bookedByDate.teacher.firstname} ${bookedByDate.teacher.lastname}`}
                    src={`${urlAPI}/img/users/${bookedByDate.teacher.profilePic}`}
                    style={{ marginRight: '15px' }}
                  />
                  <div>
                    <Typography
                      component="h3"
                      variant="p"
                    >{`${bookedByDate.teacher.firstname} ${bookedByDate.teacher.lastname}`}</Typography>
                    <Typography component="p" variant="p">
                      Teacher
                    </Typography>
                  </div>
                </Card>
                <Card
                  variant="outlined"
                  style={{ display: 'flex', padding: '5px', margin: '5px' }}
                >
                  <Avatar
                    alt={`${bookedByDate.student.firstname} ${bookedByDate.student.lastname}`}
                    src={`${urlAPI}/img/users/${bookedByDate.student.profilePic}`}
                    style={{ marginRight: '15px' }}
                  />
                  <div>
                    <Typography
                      component="h3"
                      variant="p"
                    >{`${bookedByDate.student.firstname} ${bookedByDate.student.lastname}`}</Typography>
                    <Typography component="p" variant="p">
                      Student
                    </Typography>
                  </div>
                </Card>
                <TextField
                  value={link}
                  fullWidth
                  onChange={(e) => {
                    setLink(link);
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => {
                          copy(link);
                        }}
                      >
                        <ContentCopy />
                      </IconButton>
                    ),
                  }}
                />
                <p>
                  <span style={{ color: '#ccc' }}>Link activates on:</span>{' '}
                  <br />{' '}
                  {new Date(bookedByDate.session.startingDate).toLocaleString(
                    [],
                    {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </p>
                <p>
                  <span style={{ color: '#ccc' }}>Link expires on:</span> <br />{' '}
                  {new Date(bookedByDate.session.expireDate).toLocaleString(
                    [],
                    {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={clickNewTab}>Visit Link</Button>
          </DialogActions>
        </Dialog>
      </div>
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  background-color: #fff;
  color: #222;

  a:link {
    color: #444;
  }
  a:hover {
    color: #222;
  }

  .rbc-date-cell {
    a {
      color: #222;
    }
  }
`;

export default BookingCalendar;
