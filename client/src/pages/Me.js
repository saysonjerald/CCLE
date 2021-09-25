import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { TextField, Box } from '@mui/material';
import { makeStyles } from '@mui/material/styles';

import Ratings from '../components/Ratings';
import CheckboxesTags from '../components/SelectProgLanguage';
import { UserContext } from '../contexts/UserContext';

const Me = ({ match }) => {
  const { user } = useContext(UserContext);
  const [reviewer, setReviewer] = useState([]);
  const [stopper, setStopper] = useState(0);

  const getMe = () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .create({
          baseURL: 'http://localhost:3001/',
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .get(`api/v1/users/${user.data._id}/reviews`)
        .then((review) => {
          setReviewer(review.data.data.reviews);
        })
        .catch((err) => {
          reject('There was an error');
        });
    });
  };

  useEffect(() => {
    getMe();
  }, [stopper]);

  return (
    <User>
      <img src={`./img/users/${user.data.profilePic}`} alt="" />
      <h3>
        {user.data.firstname} {user.data.lastname}
      </h3>
      <p>{user.data.bio}</p>
      <p>{user.data.address}</p>
      <p>{user.data.programmingLanguage}</p>
      <p>{user.data.spokenLanguage}</p>
      <p>{user.data.prices}</p>
      <p>{user.data.priceStarting}</p>
      <Ratings
        ratingsAverage={user.data.ratingsAverage}
        ratingsQuantity={user.data.ratingsQuantity}
      />
      {reviewer.length ? (
        reviewer.map((review) => {
          return <p key={review.id}>{review.review}</p>;
        })
      ) : (
        <>
          <p>There are no reviews</p>
        </>
      )}
      <br />
      <hr />
      <h2>Account Settings</h2>
      <Box component="form" noValidate autoComplete="off">
        <TextField label="First Name" type="text" variant="outlined" />
        <TextField label="Last Name" type="text" variant="outlined" />
        <CheckboxesTags />
      </Box>
    </User>
  );
};

const User = styled.div`
  background-color: #555;
  color: #efe;
  padding: 40px 50px;
`;

export default Me;
