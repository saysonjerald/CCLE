import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  TextField,
  Box,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import Ratings from '../components/Ratings';
import SpokenLanguages from '../components/SpokenLanguages';
import { UserContext } from '../contexts/UserContext';

const Me = ({ match }) => {
  const { user, setNavValue } = useContext(UserContext);
  const [reviewer, setReviewer] = useState([]);
  const [stopper, setStopper] = useState(0);

  const useStyles = makeStyles({
    form: {
      display: 'flex',
    },
    margin: {
      margin: '5px',
    },
  });

  const classes = useStyles();

  const [gender, setGender] = useState('male');

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      setNavValue('3');
    }

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <User>
      <Typography component="h1" variant="h5">
        Account Setting
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <img src={`./img/users/${user.data.profilePic}`} alt="" />
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Box component="form" noValidate autoComplete="off">
              <FormControl component="fieldset" className={classes.margin}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
              <div className={classes.form}>
                <TextField
                  label="First Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  className={classes.margin}
                />
                <TextField
                  label="Last Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  className={classes.margin}
                />
              </div>
              <TextField
                label="Bio"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                className={classes.margin}
              />
              <div className={classes.margin}>
                <SpokenLanguages />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </User>
  );
};

const User = styled.div`
  background-color: #555;
  color: #efe;
  padding: 40px 50px;
`;

export default Me;
