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

const Review = ({
  review,
  rating,
  firstname,
  lastname,
  profilePic,
  createdAt,
}) => {
  const { urlAPI } = useContext(UserContext);
  return (
    <Card style={{ marginBottom: '3px' }}>
      <Box container sx={{ display: 'flex', alignItems: 'center' }}>
        <CardContent>
          <Avatar
            alt={`${firstname} ${lastname}`}
            src={`${urlAPI}/img/users/${profilePic}`}
            sx={{ width: 56, height: 56 }}
          />
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {`${new Date(createdAt).toLocaleString([], {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}`}
          </Typography>
          <Typography
            component="h3"
            variant="h6"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {`${firstname} ${lastname} `}
            <Rating
              name="read-only"
              precision={0.5}
              value={rating}
              readOnly
              style={{ marginLeft: '7px' }}
            />
          </Typography>
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
