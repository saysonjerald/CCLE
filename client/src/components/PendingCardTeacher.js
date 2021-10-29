import { React, useContext } from 'react';
import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';

export default function PendingCardTeacher({
  profilePic,
  firstname,
  lastname,
  startingDate,
  endDate,
}) {
  const { user, urlAPI } = useContext(UserContext);

  const start = new Date(startingDate);
  const end = new Date(endDate);

  const getTime = (time) => {
    return new Date(time).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC',
    });
  };

  return (
    <Grid item>
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <Avatar
            alt={`${firstname} ${lastname}`}
            src={`${urlAPI}/img/users/${profilePic}`}
          />
          <Typography variant="h5" component="div">
            {firstname + ' ' + lastname}
          </Typography>
          <Typography variant="body2">
            Starting Date: <br />
            {' ' +
              (start.getUTCMonth() + 1) +
              ' ' +
              start.getUTCDate() +
              ' ' +
              start.getUTCFullYear() +
              ' | ' +
              getTime(startingDate) +
              ' UTC'}
            <br />
            <br />
            End Date: <br />
            {' ' +
              (start.getUTCMonth() + 1) +
              ' ' +
              start.getUTCDate() +
              ' ' +
              start.getUTCFullYear() +
              ' | ' +
              getTime(startingDate) +
              ' UTC'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Accept</Button>
          <Button size="small">Reject</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
