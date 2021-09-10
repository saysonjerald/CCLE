import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Loading from '../components/Loading';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
