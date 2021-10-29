import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState();
  const [stopper, setStopper] = useState(0);
  const [loading, setLoading] = useState(true);
  const [navValue, setNavValue] = useState('1');
  const [urlAPI, seturlAPI] = useState('http://localhost:3001/');

  // async function findUser() {
  //   try {
  //     const auth = await axios.create({
  //       baseURL: 'http://localhost:3001/',
  //       withCredentials: true, //I read around that you need this for cookies to be sent?
  //     });
  //     await auth.get('/isLoggedIn').then((currentUser) => {
  //       setUser(currentUser.data);
  //       setLoading(false);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    async function findUser() {
      try {
        const auth = await axios.create({
          baseURL: 'http://localhost:3001/',
          withCredentials: true, //I read around that you need this for cookies to be sent?
        });
        await auth
          .get('/isLoggedIn')
          .then((currentUser) => {
            setUser(currentUser.data);
            setLoading(false);
          })
          .then(() => {
            // const socket = io('http://localhost:3001');
            // socket.emit('online', { id: user.id, isOnline: true });
          });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    findUser();
  }, [stopper]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        navValue,
        setNavValue,
        urlAPI,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
