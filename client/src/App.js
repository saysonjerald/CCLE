import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import GlobalStyle from './components/GlobalStyle';
import UserContextProvider from './contexts/UserContext';
import PrivateRoute from './utils/PrivateRoute';
import Home from './pages/Home';
import FindTutors from './pages/FindTutors';

function App() {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <UserContextProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/find-tutors" component={FindTutors} />
        </Switch>
      </UserContextProvider>
    </>
  );
}

export default App;
