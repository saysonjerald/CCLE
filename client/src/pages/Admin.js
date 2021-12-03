import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { UserContext } from '../contexts/UserContext';

const columns = [
  { field: 'firstname', headerName: 'First Name', width: 200 },
  { field: 'lastname', headerName: 'Last Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'gender', headerName: 'Gender', width: 100 },
];

const AdminPage = () => {
  const { urlAPI } = useContext(UserContext);
  const [tableData, setTableData] = useState();
  useEffect(() => {
    (async () => {
      await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .get('api/v1/users')
        .then((data) => {
          setTableData(data.data.users);
        });
    })();
  }, []);

  return (
    <>
      <AdminWrapper>
        <Typography>Admin Page</Typography>
        <DatagridWrapper>
          <DataGrid
            rows={tableData}
            columns={columns}
            disableSelectionOnClick
            onClick={(e) => {
              console.log(e);
            }}
          />
        </DatagridWrapper>
        <Typography>Admin Page</Typography>
      </AdminWrapper>
    </>
  );
};

const AdminWrapper = styled.div`
  width: 1200px;
  margin: 50px auto;
`;

const DatagridWrapper = styled.div`
  height: 400px;
  width: 100%;
`;

export default AdminPage;
