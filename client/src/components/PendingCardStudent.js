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

export default function PendingCardStudent({
  profilePic,
  firstname,
  lastname,
  startingDate,
  endingDate,
}) {
  const { user, urlAPI } = useContext(UserContext);

  return (
    <Grid item>
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Status: Pending
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
          <Button size="small">Cancel</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
