import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Grid } from '@mui/material';
import { Editor } from '../components/CodeEditor';

const Session = ({ match }) => {
  const history = useHistory();

  useEffect(() => {
    const getSession = async () => {
      try {
        await axios.get(`http://localhost:3001/session/${match.params.id}`);
      } catch (err) {
        console.log('err', err);
        history.push('/find-tutors');
      }
    };
    getSession();
  }, []);
  return (
    <>
      <Grid
        style={{
          minWidth: '100%',
          height: '100vh',
        }}
      >
        <Editor />
      </Grid>
    </>
  );
};

export default Session;
