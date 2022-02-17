import React, { useState, useEffect, useContext } from 'react';
import {
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Button,
} from '@mui/material';
import TutorCards from '../components/TutorCards';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import axios from 'axios';

const FindTutors = () => {
  const [users, setUsers] = useState([]);
  const [stopper, setStopper] = useState(0);
  const [progLanguage, setProgLanguage] = useState('');
  const [topics, setTopics] = useState([]);
  const { setNavValue } = useContext(UserContext);

  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const getUsers = () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .create({
          baseURL: 'http://localhost:3001/api/v1/',
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .get(
          `/users?page=${pageNumber}&language=${progLanguage}&topics=${topics}`
        )
        .then((user) => {
          resolve(setUsers(user.data.users.docs));
          setNumberOfPages(user.data.users.totalPages);
          setNavValue('2');
        })
        .catch((err) => {
          reject('There was an error');
        });
    });
  };

  const gotoPrevious = () => {
    setPageNumber(Math.max(1, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages, pageNumber + 1));
  };

  useEffect(() => {
    (async () => {
      await getUsers();
    })();
  }, [stopper, pageNumber, progLanguage, topics]);

  return (
    <Wrapper elevation={12}>
      <Teachers>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Typography component="h3" variant="h5" style={{ fontWeight: '500' }}>
            Available Teachers
          </Typography>
          <div style={{ display: 'flex', width: '500px' }}>
            <FormControl fullWidth style={{ marginRight: '10px' }}>
              <InputLabel
                id="progLanguage"
                style={{
                  color: '#222',
                  fontWeight: '500',
                  backgroundColor: '#78FF86',
                  padding: '3px',
                  borderRadius: '10px',
                }}
              >
                Programming Languages
              </InputLabel>
              <Select
                labelId="progLanguage"
                value={progLanguage}
                label="Programming Language"
                onChange={(e) => setProgLanguage(e.target.value)}
                style={{
                  backgroundColor: '#78FF86',
                  color: '#222',
                  fontWeight: '500',
                }}
              >
                <MenuItem value={'All'}>All</MenuItem>
                <MenuItem value={'C#'}>C#</MenuItem>
                <MenuItem value={'C++'}>C++</MenuItem>
                <MenuItem value={'Go'}>Go</MenuItem>
                <MenuItem value={'Java'}>Java</MenuItem>
                <MenuItem value={'Kotlin'}>Kotlin</MenuItem>
                <MenuItem value={'Lua'}>Lua</MenuItem>
                <MenuItem value={'JavaScript'}>JavaScript</MenuItem>
                <MenuItem value={'Pascal'}>Pascal</MenuItem>
                <MenuItem value={'Perl'}>Perl</MenuItem>
                <MenuItem value={'Php'}>Php</MenuItem>
                <MenuItem value={'Python3'}>Phython3</MenuItem>
                <MenuItem value={'R'}>R</MenuItem>
                <MenuItem value={'Ruby'}>Ruby</MenuItem>
                <MenuItem value={'Shell'}>Shell</MenuItem>
                <MenuItem value={'SQL'}>SQL</MenuItem>
                <MenuItem value={'Swift'}>Swift</MenuItem>
                <MenuItem value={''}></MenuItem>
              </Select>
            </FormControl>

            <FormControl style={{ marginRight: '10px', width: '300px' }}>
              <InputLabel
                id="topics"
                style={{
                  color: '#222',
                  fontWeight: '500',
                  backgroundColor: '#78FF86',
                  padding: '3px',
                  borderRadius: '10px',
                }}
              >
                Select Topics
              </InputLabel>
              <Select
                labelId="topics"
                value={topics}
                label="Topics"
                multiple
                onChange={(e) => setTopics(e.target.value)}
                style={{
                  backgroundColor: '#78FF86',
                  color: '#222',
                  fontWeight: '500',
                }}
              >
                <MenuItem value={'Syntax'}>Syntax</MenuItem>
                <MenuItem value={'Data Types'}>Data Types</MenuItem>
                <MenuItem value={'Variables'}>Variables</MenuItem>
                <MenuItem value={'Keywords'}>Keywords</MenuItem>
                <MenuItem value={'Basic Operations'}>Basic Operations</MenuItem>
                <MenuItem value={'Loops'}>Loops</MenuItem>
                <MenuItem value={'Numbers'}>Numbers</MenuItem>
                <MenuItem value={'Characters'}>Characters</MenuItem>
                <MenuItem value={'Arrays'}>Arrays</MenuItem>
                <MenuItem value={'Strings'}>Strings</MenuItem>
                <MenuItem value={'Functions'}>Functions</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
                <MenuItem value={'All'} style={{ visibility: 'hidden' }}>
                  Select Topics
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Stack spacing={1}>
          {users.map((user) => {
            return <TutorCards user={user} key={user._id._id} />;
          })}
        </Stack>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3>Page of {pageNumber}</h3>
          <PageButtonWrapper>
            <Button
              onClick={gotoPrevious}
              variant="contained"
              style={{ marginRight: '10px' }}
            >
              Previous
            </Button>
            {pages.map((pageIndex) => (
              <Button
                variant="contained"
                key={pageIndex}
                onClick={() => setPageNumber(pageIndex + 1)}
                style={{ marginRight: '10px' }}
              >
                {pageIndex + 1}
              </Button>
            ))}
            <Button onClick={gotoNext} variant="contained">
              Next
            </Button>
          </PageButtonWrapper>
        </div>
      </Teachers>
    </Wrapper>
  );
};

const Wrapper = styled(Paper)`
  display: flex;
  width: 1200px;
  margin: 1% auto;
  padding: 3%;

  & .css-1wu7ecg-MuiSvgIcon-root-MuiSelect-icon {
    color: #222;
  }
`;

const Teachers = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  h1 {
    align-self: start;
    margin: 20px 0;
  }
`;

const PageButtonWrapper = styled.div`
  display: flex;
`;

export default FindTutors;
