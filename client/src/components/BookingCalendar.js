import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';

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

const events = [
  {
    title: 'Drinking',
    allDay: true,
    start: new Date(2021, 11, 1),
    end: new Date(2021, 11, 2),
  },
  {
    title: 'Vacation',
    start: new Date(2021, 11, 5),
    end: new Date(2021, 11, 6),
  },
  {
    title: 'Conference',
    start: new Date(2021, 11, 7),
    end: new Date(2021, 11, 8),
  },
];

const BookingCalendar = () => {
  const useStyles = makeStyles({
    bg: {
      backgroundColor: '#fff',
      color: '#222',
    },
  });

  const classes = useStyles();

  return (
    <>
      <CalendarWrapper>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </CalendarWrapper>
    </>
  );
};

const CalendarWrapper = styled.div`
  background-color: #fff;
  color: #222;

  .rbc-date-cell {
    a {
      color: #222;
    }
  }
`;

export default BookingCalendar;
