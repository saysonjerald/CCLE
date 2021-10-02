import React, { useState } from 'react';
import getAddress from 'country-city';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Address = ({ address, setAddress }) => {
  let add = address.split(',');
  const countryList = getAddress.getCountries();
  const [country, setCountry] = useState(add[0]);
  const [city, setCity] = useState(add[1]);
  return (
    <>
      <Autocomplete
        id="country"
        value={country ? country : ''}
        options={countryList}
        onChange={(event, value) => {
          setCountry(value);
          setCity('');
        }}
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8, backgroundColor: '#333' }}
              checked={selected}
            />
            {option}
          </li>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            placeholder="Add Country"
            required
          />
        )}
      />

      <Autocomplete
        id="city"
        value={city ? city : ''}
        options={country ? getAddress.getCities(country) : []}
        getOptionLabel={(option) => option}
        onChange={(event, value) => {
          setCity(value);
          setAddress(`${country},${value}`);
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8, backgroundColor: '#333' }}
              checked={selected}
            />
            {option}
          </li>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} label="City" placeholder="Add City" required />
        )}
      />
    </>
  );
};

export default Address;
