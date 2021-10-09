import React, { createContext, useState } from 'react';

export const ReviewContext = createContext();

const ReviewProvider = (props) => {
  const [reviewer, setReviewer] = useState([]);

  return (
    <ReviewContext.Provider value={{ reviewer, setReviewer }}>
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
