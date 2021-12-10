import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

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
import Homepage from './pages/Homepage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#78FF86',
    },
    secondary: {
      main: '#78FF86',
    },
    background: {
      default: '#2C2C2C',
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
      <SnackbarProvider>
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
                      <Route exact path="/" component={Homepage} />
                      <Route exact path="/sign/:option" component={Home} />
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
      </SnackbarProvider>
    </>
  );
}

export default App;
