import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState();
  const [stopper, setStopper] = useState(0);
  const [loading, setLoading] = useState(true);

  async function findUser() {
    try {
      const auth = await axios.create({
        baseURL: 'http://localhost:3001/',
        withCredentials: true, //I read around that you need this for cookies to be sent?
      });
      await auth.get('/isLoggedIn').then((currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    findUser();
  }, [stopper]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
