import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import axios from 'axios';

const FindUser = () => {
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
        .then((data) => {
          resolve(setUsers(data));
        })
        .catch((err) => {
          reject('There was an error');
        });
    });
  };

  useEffect(() => {
    getUsers();
    console.log('From Useeffect Find tutors');
  }, [stopper]);

  console.log('From Find Tutors');

  return (
    <>
      <div className="user">
        <div className="user__name">Jerald Sayson</div>
        <div className="user__email">saysonjerald@gmail.com</div>
        <div className="user__age">27</div>
      </div>
    </>
  );
};

export default FindUser;
