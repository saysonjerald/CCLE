import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Nav from './components/Nav';
import GlobalStyle from './components/GlobalStyle';

import UserContextProvider from './contexts/UserContext';
import ProgrammingLanguageProvider from './contexts/ProgrammingLanguageContext';
import ReviewProvider from './contexts/ReviewContext';
import BookingProvider from './contexts/BookingContext';

import PrivateRoute from './utils/PrivateRoute';
import VerifyAccount from './pages/VerifyAccount';

import Home from './pages/Home';
import FindTutors from './pages/FindTutors';
import Profile from './pages/Profile';
import Me from './pages/Me';
import Session from './pages/Session';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#efe',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UserContextProvider>
          <ProgrammingLanguageProvider>
            <ReviewProvider>
              <BookingProvider>
                <Switch>
                  <PrivateRoute path="/session/:id" component={Session} />
                  <>
                    <Toolbar>
                      <Nav />
                    </Toolbar>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute
                      exact
                      path="/find-tutors"
                      component={FindTutors}
                    />
                    <PrivateRoute path="/user/:id" component={Profile} />
                    <PrivateRoute exact path="/me" component={Me} />
                    <Route
                      path="/verifyAccount/:emailToken"
                      component={VerifyAccount}
                    />
                  </>
                </Switch>
              </BookingProvider>
            </ReviewProvider>
          </ProgrammingLanguageProvider>
        </UserContextProvider>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default App;
