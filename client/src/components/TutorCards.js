import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TutorCards = ({ user }) => {
  return (
    <User>
      <img src={`./img/users/${user.profilePic}`} alt="" />
      <h3>
        {user.firstname} {user.lastname}
      </h3>
      <p>{user.bio}</p>
      <p>{user.address}</p>
      <p>{user.programmingLanguage}</p>
      <p>{user.spokenLanguage}</p>
      <p>{user.prices}</p>
      <p>{user.priceStarting}</p>
      <p>{user.ratingsAverage}</p>
      <p>{user.ratingsQuantity}</p>
      <Link to={`/user/${user._id}`}>
        <button>View Profile</button>
      </Link>
    </User>
  );
};

const User = styled.div`
  display: flex;
  background-color: #7af58f;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px 10px;

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
