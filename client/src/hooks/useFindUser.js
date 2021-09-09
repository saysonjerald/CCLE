import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function findUser() {
      const auth = await axios.create({
        baseURL: 'http://localhost:3001/',
        withCredentials: true, //I read around that you need this for cookies to be sent?
      });

      try {
        await auth.get('/isLoggedIn').then((currentUser) => {
          setUser(currentUser);
        });
      } catch (err) {
        console.log(err);
      }
    }

    console.log('Hello');
    findUser();
  }, []);

  return {
    user,
    setUser,
    isLoading,
  };
}
