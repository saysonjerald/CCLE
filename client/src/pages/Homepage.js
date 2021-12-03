import React from 'react';
import styled from 'styled-components';
import { Typography, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  title: {
    marginTop: '8%',
    fontFamily: 'Roboto Black',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  progLanguageIMG: {
    width: '200px',
  },
});

const Homepage = () => {
  const classes = useStyles();
  return (
    <HomepageWrapper>
      <Typography component="h1" variant="h3" className={classes.title}>
        Where teams build faster, together
      </Typography>
      <Typography component="h2">
        Create, share, and get feedback with collaborative sandboxes for rapid
        web development.
      </Typography>
      <Stack direction="row" spacing={8} mt={8}>
        <img
          className={classes.progLanguageIMG}
          src="/img/Proglanguage/csharp.png"
          alt="C Sharp Logo"
        />
        <img
          className={classes.progLanguageIMG}
          src="/img/Proglanguage/js.png"
          alt="JavaScript Logo"
        />
        <img
          className={classes.progLanguageIMG}
          src="/img/Proglanguage/cpp.png"
          alt="C plus plus Logo"
        />
      </Stack>
    </HomepageWrapper>
  );
};

const HomepageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

export default Homepage;
