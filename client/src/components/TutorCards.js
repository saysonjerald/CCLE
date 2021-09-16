import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TutorCards = ({ user }) => {
  return (
    <User>
      <h3>
        {user.firstname} {user.lastname}
      </h3>
      <p>{user.bio}</p>
      <p>{user.address}</p>
      <p>{user.programmingLanguage}</p>
      <p>{user.spokenLanguage}</p>
      <p>{user.prices}</p>
      <p>{user.priceStarting}</p>
      <Link to={`/user/${user.slug}`}>
        <button>View Profile</button>
      </Link>
    </User>
  );
};

const User = styled.div`
  background-color: #7af58f;
  margin-right: 10px;
  margin-bottom: 10px;

  button {
    padding: 10px 5px;
  }
`;

export default TutorCards;
