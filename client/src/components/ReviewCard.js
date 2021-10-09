import React, { useContext } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  StyledBadge,
  Divider,
  Rating,
  Avatar,
  Typography,
} from '@mui/material';

import { UserContext } from '../contexts/UserContext';

const Review = ({ review, rating, firstname, lastname, profilePic }) => {
  const { urlAPI } = useContext(UserContext);
  return (
    <Card>
      <Box container sx={{ display: 'flex', alignItems: 'center' }}>
        <CardContent>
          <Avatar
            alt={`${firstname} ${lastname}`}
            src={`${urlAPI}/img/users/${profilePic}`}
            sx={{ width: 56, height: 56 }}
          />
        </CardContent>
        <CardContent>
          <Typography component="h3" variant="h6">
            {`${firstname} ${lastname}`}
          </Typography>
          <Rating name="read-only" precision={0.5} value={rating} readOnly />
          <Divider />
          <Typography variant="body2" color="text.secondary">
            {`${review}`}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Review;
