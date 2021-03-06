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

import IsEmailVerify from '../components/IsEmailVerify';

import SpokenLanguages from '../components/SpokenLanguages';
import Address from '../components/Address';
import { UserContext } from '../contexts/UserContext';
import { useSnackbar } from 'notistack';

const Me = ({ match }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, setUser, setNavValue, urlAPI } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let photoUploaded;

  const getUserDate = async () => {
    try {
      await axios
        .get(`http://localhost:3001/api/v1/users/${user.id}`)
        .then((data) => {
          setUser(...user, data.data.user);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let unmounted = false;
    setNavValue('3');
    (async () => {
      await getUserDate();
    })();

    if (!unmounted) {
      setNavValue('3');
    }

    return () => {
      unmounted = true;
    };
  }, []);

  const useStyles = makeStyles({
    form: {
      display: 'flex',
    },
    firstname: {
      marginRight: '8px',
    },
    wrapper: {
      width: '1000px',
      margin: '50px auto',
      backgroundColor: '#383838',
      padding: '50px 70px',
    },
    title: {
      marginBottom: '16px',
      fontWeight: '500',
    },
    profilePic: {
      marginBottom: '24px',
    },
    column1: {
      marginRight: '60px',
    },
    controlInput: {
      marginBottom: '16px',
    },
  });
  const classes = useStyles();

  const profilePic = {
    title: 'Upload Photo',
    width: '100%',
    url: `${urlAPI}img/users/${user.profilePic}`,
  };

  const authAxios = axios.create({
    baseURL: urlAPI,
    withCredentials: true, //I read around that you need this for cookies to be sent?
  });

  //#region CSS STYLED COMPONENT
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
  //#endregion

  //#region  Functions
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
    photoUploaded = event.target.files[0];
    const form = new FormData();

    if (form) {
      form.append('profilePic', photoUploaded);
      updateSettings(form, 'data').then((data) => {
        setUser({ ...user, profilePic: `${data.data.user.profilePic}` });
      });
    }
  };

  const updateSettings = async (data, type) => {
    try {
      const url =
        type === 'password'
          ? `${urlAPI}api/v1/users/updateMyPassword`
          : `${urlAPI}api/v1/users/updateMe`;

      const res = await authAxios({
        method: 'PATCH',
        url,
        data,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });

      if (res.data.status === 'success') {
        // console.log('success', `${type.toUpperCase()} updated successfully!`);
        enqueueSnackbar(`Account Updated Successfully`, {
          variant: 'success',
        });
        return res;
      }
    } catch (err) {
      enqueueSnackbar(`${err.response.data.message}`, {
        variant: 'error',
      });
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .patch(`${urlAPI}api/v1/users/updateMyPassword`, {
          passwordCurrent: currentPassword,
          password: newPassword,
          passwordConfirm: confirmPassword,
        });

      if (res.data.status === 'success') {
        // console.log('success updated successfully!');
        enqueueSnackbar(`Password Updated`, {
          variant: 'success',
        });
        return res;
      }
    } catch (err) {
      enqueueSnackbar(`${err.response.data.message}`, {
        variant: 'error',
      });
    }
  };

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  const updateData = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('firstname', titleCase(user.firstname));
    form.append('lastname', titleCase(user.lastname));
    form.append('gender', user.gender);
    form.append('bio', user.bio);

    for (var i = 0; i < user.spokenLanguage.length; i++) {
      form.append('spokenLanguage', user.spokenLanguage[i]);
    }

    form.append('address', user.address);

    await updateSettings(form, 'data');
  };
  //#endregion

  return (
    <div className={classes.wrapper}>
      <div>
        <Typography component="h1" variant="h5" className={classes.title}>
          Account Setting
        </Typography>
        <Grid container>
          <Grid item xs={4} className={classes.column1}>
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
                id="profilePic"
                name="profilePic"
              />
              <ImageButton
                onClick={handleClick}
                type="file"
                focusRipple
                key={profilePic.title}
                style={{
                  width: profilePic.width,
                }}
                className={classes.profilePic}
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
            <TextField
              label="Bio"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              style={{ width: '300px' }}
            />
          </Grid>

          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Box component="form" noValidate autoComplete="off">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    value={user.gender ? user.gender : ''}
                    onClick={(e) =>
                      setUser({ ...user, gender: e.target.value })
                    }
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
                    inputProps={{
                      pattern: '[a-zA-Z_ ]',
                      style: {
                        textTransform: 'capitalize',
                      },
                    }}
                    label="First Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={user.firstname}
                    onChange={(e) => {
                      // setFirstname(titleCase(e.target.value));
                      setUser({
                        ...user,
                        firstname: titleCase(e.target.value),
                      });
                    }}
                    className={`${classes.controlInput} ${classes.firstname}`}
                  />
                  <TextField
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={user.lastname}
                    onChange={(e) =>
                      setUser({ ...user, lastname: titleCase(e.target.value) })
                    }
                    className={classes.controlInput}
                  />
                </div>
                <div className={classes.controlInput}>
                  <SpokenLanguages user={user} setUser={setUser} />
                </div>
                <div>
                  <Address user={user} setUser={setUser} />
                </div>
                <Button
                  className={classes.controlInput}
                  variant="contained"
                  onClick={updateData}
                >
                  Update Account
                </Button>
                <hr style={{ margin: '40px' }} />
                <Typography
                  component="h2"
                  variant="h6"
                  className={classes.title}
                >
                  Change Password
                </Typography>
                <TextField
                  label="Current Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  className={classes.controlInput}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <TextField
                  label="New Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  className={classes.controlInput}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  className={classes.controlInput}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  className={classes.controlInput}
                  type="submit"
                  variant="contained"
                  onClick={updatePassword}
                >
                  Update Password
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <IsEmailVerify />
    </div>
  );
};

export default Me;
