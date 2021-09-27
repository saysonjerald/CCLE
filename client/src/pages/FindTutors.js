import React, { useState, useEffect, useContext } from 'react';
import TutorCards from '../components/TutorCards';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import axios from 'axios';

const FindTutors = () => {
  const [users, setUsers] = useState([]);
  const [stopper, setStopper] = useState(0);
  const { setNavValue } = useContext(UserContext);

  const getUsers = () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .create({
          baseURL: 'http://localhost:3001/api/v1/',
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .get('/users')
        .then((user) => {
          resolve(setUsers(user.data.users));
          setNavValue('2');
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
    <Wrapper>
      <Filter></Filter>
      <Teachers>
        <h1>Available Teachers</h1>
        {users.map((user) => {
          return <TutorCards user={user} key={user._id} />;
        })}
      </Teachers>
    </Wrapper>
  ) : (
    <>
      <h1>There are no users</h1>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Teachers = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;

  h1 {
    align-self: start;
    margin: 20px 0;
  }
`;

const Filter = styled.div`
  width: 20%;
  height: 200px;
  background-color: #222;
  margin: 83px 10px 0 10px;
`;

export default FindTutors;
