import React, { useState, useEffect } from 'react';
import { Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TimerCountdown = ({
  startingDate,
  expireDate,
  handleEndSessionOpen,
  userId,
  teacherID,
}) => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isSessionEnd, setIsSessionEnd] = useState(false);

  const countDownTimer = (expireDate) => {
    const exam_ending_at = new Date(expireDate);
    const current_time = new Date(Date.now());

    const totalSeconds = Math.floor((exam_ending_at - current_time) / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const hours = totalHours - totalDays * 24;
    const minutes = totalMinutes - totalDays * 24 * 60 - hours * 60;
    const seconds =
      totalSeconds - totalDays * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

    setTime({ ...time, hours, minutes, seconds });
  };

  useEffect(() => {
    if (startingDate && expireDate) {
      const timer = setInterval(() => {
        if (
          new Date(Date.now()).getTime() >= new Date(startingDate).getTime() &&
          new Date(Date.now()).getTime() <= new Date(expireDate).getTime()
        ) {
          countDownTimer(expireDate);
        }

        if (new Date(Date.now()).getTime() > new Date(expireDate).getTime()) {
          (async () => {
            if (teacherID !== userId) await handleEndSessionOpen(true);
          })();
          setIsSessionEnd(true);
          clearInterval(timer);
        }
      }, 1000);
    }
  }, [startingDate, expireDate]);

  return (
    <div>
      <Chip
        label={`${
          new Date(Date.now()).getTime() < new Date(startingDate).getTime()
            ? 'Session not started yet'
            : new Date(Date.now()).getTime() > new Date(expireDate).getTime()
            ? 'Session Already Expired'
            : `Time remain: ${time.hours === 0 ? '00' : time.hours} ${
                time.minutes === 0 ? '00' : time.minutes
              } ${time.seconds === 0 ? '00' : time.seconds}`
        }`}
      />
    </div>
  );
};

export default TimerCountdown;
