import React from 'react';

const TutorCards = ({ user }) => {
  return (
    <>
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
      <p>{user.address}</p>
      <p>{user.programmingLanguage}</p>
      <p>{user.spokenLanguage}</p>
      <p>{user.prices}</p>
      <p>{user.priceStarting}</p>
      <p>{user.isTeacher}</p>
    </>
  );
};

export default TutorCards;
