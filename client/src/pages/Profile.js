import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { UserContext } from '../contexts/UserContext';
import Ratings from '../components/Ratings';

const Profile = ({ match }) => {
  const [user, setUser] = useState({});
  const [reviewer, setReviewer] = useState([]);
  const [stopper, setStopper] = useState(0);
  const { setNavValue } = useContext(UserContext);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      setNavValue('3');
    }

    return () => {
      unmounted = true;
    };
  }, []);

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .all([
          await axios
            .get(`http://localhost:3001/api/v1/users/${match.params.id}`)
            .then((user) => {
              resolve(setUser(user.data.user));
            }),
          await axios
            .create({
              baseURL: 'http://localhost:3001/',
              withCredentials: true, //I read around that you need this for cookies to be sent?
            })
            .get(`api/v1/users/${match.params.id}/reviews`)
            .then((review) => {
              setReviewer(review.data.reviews);
              console.log(review);
            }),
        ])
        .catch((err) => {
          reject('There was an error');
        });
    });
  };

  useEffect(() => {
    getUser();
  }, [stopper]);

  return (
    <User>
      <h3>
        {user.firstname} {user.lastname}
      </h3>
      <p>{user.bio}</p>
      <p>{user.address}</p>
      <p>{user.programmingLanguage}</p>
      <p>{user.spokenLanguage}</p>
      <p>{user.prices}</p>
      <p>{user.priceStarting}</p>
      <Ratings
        ratingsAverage={user.ratingsAverage}
        ratingsQuantity={user.ratingsQuantity}
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
