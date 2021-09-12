import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import TutorCards from '../components/TutorCards';
import axios from 'axios';

const FindTutors = () => {
  const [users, setUsers] = useState([]);
  const [stopper, setStopper] = useState(0);

  const getUsers = () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .create({
          baseURL: 'http://localhost:3001/',
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .get('/find-tutors')
        .then((user) => {
          resolve(setUsers(user.data));
        })
        .catch((err) => {
          reject('There was an error');
        });
    });
  };

  useEffect(() => {
    getUsers();
  }, [stopper]);

  return users.length ? (
    <>
      {users.map((user) => {
        return <TutorCards user={user} key={user._id} />;
      })}
    </>
  ) : (
    <>
      <h1>There are no users</h1>
    </>
  );
};

export default FindTutors;
