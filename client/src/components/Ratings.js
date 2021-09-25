import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

const Ratings = ({ ratingsAverage, ratingsQuantity }) => {
  const stars = () => {
    const round = Math.ceil(ratingsAverage);
    let content = [
      <FontAwesomeIcon key="0" icon={emptyStar} color="orange" />,
      <FontAwesomeIcon key="1" icon={emptyStar} color="orange" />,
      <FontAwesomeIcon key="2" icon={emptyStar} color="orange" />,
      <FontAwesomeIcon key="3" icon={emptyStar} color="orange" />,
      <FontAwesomeIcon key="4" icon={emptyStar} color="orange" />,
    ];

    for (let i = 0; i < round; i++) {
      ratingsAverage > 1
        ? (content[i] = (
            <FontAwesomeIcon key={i.toString()} icon={faStar} color="orange" />
          ))
        : (content[i] = (
            <FontAwesomeIcon
              key={i.toString()}
              icon={faStarHalfAlt}
              color="orange"
            />
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
