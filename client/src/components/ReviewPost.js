import React, { useState, useContext } from 'react';
import axios from 'axios';
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

const ReviewPost = ({ userURL, setReviewer, match }) => {
  const { urlAPI } = useContext(UserContext);
  const [review, setReview] = useState('');
  const [ratings, setRatings] = useState(0.5);

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
          rating: ratings,
        });

      if (res.data.status === 'success') {
        console.log('Review Posted!');
        setReview('');
        setRatings(0);
        await getReviews();
        return res;
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const getReviews = async () => {
    console.log(ratings + ' Hello');
    try {
      await axios
        .create({
          baseURL: 'http://localhost:3001/',
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .get(`api/v1/users/${match}/reviews`)
        .then((review) => {
          console.log(review);
          setReviewer(review.data.reviews);
        });
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <Card>
      <CardContent style={{ paddingBottom: '0' }}>
        <TextField
          label="Write a review"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={review}
          inputProps={{ maxLength: 500 }}
          onChange={(e) => setReview(e.target.value)}
        />
      </CardContent>
      <CardActions
        style={{ display: 'flex', justifyContent: 'end', margin: '0 10px' }}
      >
        <Rating
          name="read-only"
          value={ratings}
          precision={0.5}
          onChange={(e) => setRatings(parseFloat(e.target.value))}
        />
        <Button
          variant="contained"
          style={{ marginLeft: '10px' }}
          onClick={postReview}
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default ReviewPost;
