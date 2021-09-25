import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

const SignInSignUp = () => {
  const [value, setValue] = useState();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" value="0" />
          <Tab label="Item Two" value="1" />
          <Tab label="Item Three" value="2" />
        </Tabs>
      </Box>
      <div value={value} index={0}>
        Item One
      </div>
      <div value={value} index={1}>
        Item Two
      </div>
      <div value={value} index={2}>
        Item Three
      </div>
    </>
  );
};

export default SignInSignUp;
