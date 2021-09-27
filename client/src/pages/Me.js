import React, { useState, useContext, useEffect, useRef } from 'react';
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
  ButtonBase,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material';

import SpokenLanguages from '../components/SpokenLanguages';
import { UserContext } from '../contexts/UserContext';

const Me = ({ match }) => {
  const { user, setNavValue } = useContext(UserContext);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [gender, setGender] = useState(user.gender);

  const useStyles = makeStyles({
    form: {
      display: 'flex',
    },
    margin: {
      margin: '5px',
    },
    wrapper: {
      width: '1200px',
      margin: '50px auto',
    },
  });

  const classes = useStyles();

  const profilePic = {
    title: 'Upload Photo',
    width: '100%',
    url: `./img/users/${user.profilePic}`,
  };

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 350,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      setNavValue('3');
    }

    return () => {
      unmounted = true;
    };
  }, []);

  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    // props.handleFile(fileUploaded);
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <Typography component="h1" variant="h5">
          Account Setting
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                minWidth: 300,
                width: '100%',
              }}
            >
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
                accept="image/jpeg, image/jpg,image/png"
              />
              <ImageButton
                onClick={handleClick}
                type="file"
                focusRipple
                key={profilePic.title}
                style={{
                  width: profilePic.width,
                }}
              >
                <ImageSrc
                  style={{ backgroundImage: `url(${profilePic.url})` }}
                />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {profilePic.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Box component="form" noValidate autoComplete="off">
                <FormControl component="fieldset" className={classes.margin}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    value={gender}
                    onClick={(e) => setGender(e.target.value)}
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
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <TextField
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    className={classes.margin}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
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
                <Button
                  className={classes.margin}
                  type="submit"
                  variant="contained"
                >
                  Update Account
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Me;
