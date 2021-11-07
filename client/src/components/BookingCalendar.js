import React, { useContext } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeStyles } from '@mui/styles';
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

const BookingCalendar = () => {
  const { bookedList } = useContext(BookingContext);

  const useStyles = makeStyles({
    bg: {
      backgroundColor: '#fff',
      color: '#222',
    },
  });

  const classes = useStyles();

  return (
    <CalendarWrapper>
      <Calendar
        localizer={localizer}
        events={bookedList.map((el) => {
          return {
            title: el.student.firstname,
            start: new Date(el.startingDate),
            end: new Date(el.endingDate),
          };
        })}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
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
