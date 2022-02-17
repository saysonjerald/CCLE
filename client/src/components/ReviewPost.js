import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Rating,
  TextField,
  Box,
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';

const ReviewPost = ({
  userURL,
  reviewer,
  setReviewer,
  match,
  userID,
  teacherID,
  endSessionTeacherBtn,
  endSessionBtn,
}) => {
  const { urlAPI } = useContext(UserContext);
  const [reviewID, setReviewID] = useState(0);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0.5);
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState('false');
  const reviewDataRef = useRef();
  const history = useHistory();

  const postReview = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true,
        })
        .post(`${urlAPI}api/v1/users/${userURL}/reviews`, {
          review,
          rating: rating,
        })
        .then(() => {
          history.push(`/user/${teacherID}`);
          window.location.reload(false);
        });

      if (res.data.status === 'success') {
        console.log('Review Posted!');
        setReview('');
        setRating(0);
        await getReviews();
        return res;
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const updateReview = async () => {
    console.log(urlAPI);
    try {
      await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true,
        })
        .patch(`/api/v1/users/${teacherID}/reviews`, {
          id: reviewID,
          review,
          rating,
        })
        .then(() => {
          history.push(`/user/${teacherID}`);
          window.location.reload(false);
        });
    } catch (err) {}
  };

  const getReviews = async () => {
    try {
      await axios
        .create({
          baseURL: 'http://localhost:3001/',
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .get(`/api/v1/users/${teacherID}/reviews/${userID}`)
        .then((review) => {
          console.log(review);
          if (review.data.results === 1) {
            console.log(review.data.results);
            reviewDataRef.current = review.data.reviews[0];
            setIsAlreadyReviewed(true);
            setReviewID(review.data.reviews[0].id);
            setReview(review.data.reviews[0].review);
            setRating(review.data.reviews[0].rating * 1);
          } else {
            setIsAlreadyReviewed(false);
          }
        });
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        await getReviews();
      })();
    }, 1500);
  }, [endSessionTeacherBtn, endSessionBtn]);

  return (
    <Card>
      <CardContent style={{ paddingBottom: '0' }}>
        <TextField
          label="Write a review"
          variant="filled"
          multiline
          rows={4}
          fullWidth
          defaultValue={review}
          inputProps={{ maxLength: 500 }}
          onChange={(e) => setReview(e.target.value)}
        />
      </CardContent>
      <CardActions
        style={{ display: 'flex', justifyContent: 'end', margin: '0 10px' }}
      >
        <Rating
          defaultValue={rating}
          value={rating}
          precision={0.5}
          onChange={(e) => setRating(parseFloat(e.target.value))}
        />
        <Button
          variant="contained"
          style={{ marginLeft: '10px' }}
          onClick={async (e) => {
            try {
              isAlreadyReviewed ? await updateReview() : await postReview(e);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          {isAlreadyReviewed ? 'Update' : 'Submit'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ReviewPost;
