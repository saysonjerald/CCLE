import React, { useContext } from 'react';
import { Paper, Typography, Chip, Rating, Button } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const TutorCards = ({ user }) => {
  const { urlAPI } = useContext(UserContext);
  return (
    <User elevation={12}>
      <div>
        <img
          alt={`${user._id.firstname} ${user._id.lastname}`}
          src={`${urlAPI}/img/users/${user._id.profilePic}`}
        />
      </div>
      <div>
        <Typography
          component="h3"
          variant="h5"
          style={{ fontWeight: '500', marginBottom: '5px' }}
        >
          {user._id.firstname} {user._id.lastname}
        </Typography>
        {user.language.map((progLanguage) => {
          return (
            <Chip
              label={progLanguage}
              key={progLanguage}
              style={{ marginLeft: '5px' }}
            />
          );
        })}
        <Typography
          component="p"
          variant="body1"
          style={{
            marginLeft: '8px',
            marginTop: '5px',
            color: '#ccc',
            width: '700px',
          }}
        >
          {user._id.bio}
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          borderLeft: '2px solid #ddd',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <Rating value={user._id.ratingsAverage} precision={0.5} readOnly />
          <span style={{ marginLeft: '5px' }}>
            ({user._id.ratingsQuantity})
          </span>
        </div>
        <Link to={`/user/${user._id._id}`}>
          <Button variant="contained" style={{ fontWeight: '500' }}>
            View Profile
          </Button>
        </Link>
      </div>
    </User>
  );
};

const User = styled(Paper)`
  display: flex;
  align-items: center;
  background-color: #1a1919;
  padding: 2.5%;

  img {
    width: 100px;
    height: 100px;
    border-radius: 100px 100px;
    margin-right: 15px;
  }

  h3 {
    margin: 0 10px;
  }

  button {
    padding: 10px 5px;
  }
`;

export default TutorCards;
