import React, { createContext } from 'react';
import useFindUser from '../hook/useFindUser';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const { user, setUser, isLoading } = useFindUser();

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
