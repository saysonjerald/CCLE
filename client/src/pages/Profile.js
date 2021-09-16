import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Profile = ({ match }) => {
  const [user, setUser] = useState({});
  const [stopper, setStopper] = useState(0);

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .create({
          baseURL: 'http://localhost:3001/',
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .get(`/getUser/${match.params.id}`)
        .then((user) => {
          console.log(user);
          resolve(setUser(user.data.user));
        })
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
      <p>{user.ratingsAverage}</p>
      <p>{user.ratingsQuantity}</p>
    </User>
  );
};

const User = styled.div`
  background-color: #555;
`;

export default Profile;
