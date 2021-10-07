import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Grid } from '@mui/material';

import { UserContext } from '../contexts/UserContext';
import Ratings from '../components/Ratings';
import ProgrammingLanguages from '../components/ProgrammingLanguages';
import ProgrammingCard from '../components/ProgrammingCard';
import { makeStyles } from '@mui/styles';

const Profile = ({ match }) => {
  const { user, setNavValue } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({});
  const [reviewer, setReviewer] = useState([]);
  const [programmingLanguage, setProgrammingLanguage] = useState([]);
  const [stopper, setStopper] = useState(0);

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .all([
          await axios
            .get(`http://localhost:3001/api/v1/users/${match.params.id}`)
            .then((user) => {
              resolve(setUserProfile(user.data.user));
            }),
          await axios
            .create({
              baseURL: 'http://localhost:3001/',
              withCredentials: true, //I read around that you need this for cookies to be sent?
            })
            .get(`api/v1/users/${match.params.id}/reviews`)
            .then((review) => {
              setReviewer(review.data.reviews);
            }),
          await axios
            .create({
              baseURL: 'http://localhost:3001/',
              withCredentials: true, //I read around that you need this for cookies to be sent?
            })
            .get(`api/v1/users/${match.params.id}/programmingLanguage`)
            .then((programmingLang) => {
              setProgrammingLanguage(programmingLang.data.programmingLang);
              console.log(programmingLang.data.programmingLang);
            }),
        ])
        .catch((err) => {
          reject('There was an error');
        });
    });
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setNavValue('3');
      getUser();
    }

    return () => {
      unmounted = true;
    };
  }, [match.params.id]);

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

  return (
    <User>
      <h3>
        {userProfile.firstname} {userProfile.lastname}
      </h3>
      <p>{userProfile.bio}</p>
      <p>{userProfile.address}</p>
      <p>{userProfile.programmingLanguage}</p>
      <p>{userProfile.spokenLanguage}</p>
      <p>{userProfile.prices}</p>
      <p>{userProfile.priceStarting}</p>
      {match.params.id === user.id ? (
        <>
          <hr style={{ margin: '40px' }} />
          <ProgrammingLanguages />
        </>
      ) : (
        <>
          <p></p>
        </>
      )}
      <Grid className={classes.form}>
        {programmingLanguage.length ? (
          programmingLanguage.map((programmingLang) => {
            return (
              <ProgrammingCard
                key={programmingLang.id}
                id={programmingLang.id}
                language={programmingLang.language}
                choosenTopic={programmingLang.topic}
                choosenDescription={programmingLang.description}
              />
            );
          })
        ) : (
          <>
            <p>Empty programming language</p>
          </>
        )}
      </Grid>
      <hr style={{ margin: '40px' }} />
      <Ratings
        ratingsAverage={userProfile.ratingsAverage}
        ratingsQuantity={userProfile.ratingsQuantity}
      />
      {reviewer.length ? (
        reviewer.map((review) => {
          return (
            <p key={review.id}>
              {review.user.firstname}: {review.review}
            </p>
          );
        })
      ) : (
        <>
          <p>There are no reviews</p>
        </>
      )}
    </User>
  );
};

const User = styled.div`
  background-color: #555;
  color: #efe;
  padding: 40px 50px;
`;

export default Profile;
