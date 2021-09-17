import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Profile = ({ match }) => {
  const [user, setUser] = useState({});
  const [reviewer, setReviewer] = useState([]);
  const [stopper, setStopper] = useState(0);

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .all([
          await axios
            .get(`http://localhost:3001/api/v1/users/${match.params.id}`)
            .then((user) => {
              resolve(setUser(user.data.data.user));
            }),
          await axios
            .create({
              baseURL: 'http://localhost:3001/',
              withCredentials: true, //I read around that you need this for cookies to be sent?
            })
            .get(`api/v1/users/${match.params.id}/reviews`)
            .then((review) => {
              setReviewer(review.data.data.reviews);
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
      <p>Rating Average: {user.ratingsAverage}</p>
      <p>Rating Quantity: {user.ratingsQuantity}</p>
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
`;

export default Profile;
