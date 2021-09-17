import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

const Ratings = ({ ratingsAverage, ratingsQuantity }) => {
  const stars = () => {
    const round = Math.ceil(ratingsAverage);
    let content = [
      <FontAwesomeIcon icon={emptyStar} color="orange" />,
      <FontAwesomeIcon icon={emptyStar} color="orange" />,
      <FontAwesomeIcon icon={emptyStar} color="orange" />,
      <FontAwesomeIcon icon={emptyStar} color="orange" />,
      <FontAwesomeIcon icon={emptyStar} color="orange" />,
    ];

    for (let i = 0; i < round; i++) {
      ratingsAverage > 1
        ? (content[i] = <FontAwesomeIcon icon={faStar} color="orange" />)
        : (content[i] = (
            <FontAwesomeIcon icon={faStarHalfAlt} color="orange" />
          ));
      ratingsAverage--;
    }
    return content;
  };
  return (
    <>
      {stars()}
      <span>({ratingsQuantity})</span>
    </>
  );
};

export default Ratings;
