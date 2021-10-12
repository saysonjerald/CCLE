import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import Loading from '../components/Loading';

const VerifyAccount = ({ match }) => {
  const { urlAPI, user, loading } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios
          .create({
            baseURL: urlAPI,
            withCredentials: true, //I read around that you need this for cookies to be sent?
          })
          .patch(`${urlAPI}api/v1/users/verifyEmail/${match.params.emailToken}`)
          .then(() => {
            history.push(`/me`);
          });

        if (res) {
          console.log('Verified Successfuly');
        }
      } catch (err) {
        console.log(err);
      }
    };
    verifyToken();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!user.isVerify ? (
        <>
          <h1>...Verifying Account</h1>
        </>
      ) : (
        <>
          <h1>...Account Verified</h1>
        </>
      )}
    </>
  );
};

export default VerifyAccount;
