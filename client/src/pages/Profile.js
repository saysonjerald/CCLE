import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import {
  Grid,
  Typography,
  Button,
  Avatar,
  Paper,
  Chip,
  Box,
  Stack,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { UserContext } from '../contexts/UserContext';
import { ProrammingLanguageContext } from '../contexts/ProgrammingLanguageContext';
import { ReviewContext } from '../contexts/ReviewContext';
import { BookingContext } from '../contexts/BookingContext';

import ProgrammingLanguages from '../components/ProgrammingLanguages';
import ProgrammingCard from '../components/ProgrammingCard';
import ReviewCard from '../components/ReviewCard';
import ReviewPost from '../components/ReviewPost';
import PendingCardTeacher from '../components/PendingCardTeacher';
import PendingCardStudent from '../components/PendingCardStudent';
import SetAppointment from '../components/SetAppointment';
import BookingCalendar from '../components/BookingCalendar';
import IsEmailVerify from '../components/IsEmailVerify';

const Profile = ({ match }) => {
  const history = useHistory();
  const { user, setNavValue, urlAPI } = useContext(UserContext);
  const {
    language,
    setLanguage,
    topic,
    setTopic,
    description,
    setDescription,
    programmingLanguageKnown,
    setProgrammingLanguageKnown,
  } = useContext(ProrammingLanguageContext);
  const { reviewer, setReviewer } = useContext(ReviewContext);
  const {
    pendingAppointmentStudent,
    setPendingAppointmentStudent,
    pendingAppointmentTeacher,
    setPendingAppointmentTeacher,
    bookedList,
    setBookedList,
  } = useContext(BookingContext);

  const [userProfile, setUserProfile] = useState({});
  const [stopper, setStopper] = useState(0);

  let pendingStudentCounter = 0;
  let pendingTeacherCounter = 0;

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .all([
          await axios
            .get(`http://localhost:3001/api/v1/users/${match.params.id}`)
            .then((user) => {
              resolve(setUserProfile(user.data.user));
            }),
          await axios
            .create({
              baseURL: 'http://localhost:3001/',
              withCredentials: true, //I read around that you need this for cookies to be sent?
            })
            .get(`api/v1/users/${match.params.id}/reviews`)
            .then((review) => {
              setReviewer(review.data.reviews);
            }),
          await axios
            .create({
              baseURL: 'http://localhost:3001/',
              withCredentials: true, //I read around that you need this for cookies to be sent?
            })
            .get(`api/v1/users/${match.params.id}/programmingLanguage`)
            .then((programmingLang) => {
              setProgrammingLanguageKnown(programmingLang.data.programmingLang);
            }),
          await axios
            .create({
              baseURL: 'http://localhost:3001/',
              withCredentials: true, //I read around that you need this for cookies to be sent?
            })
            .get(`api/v1/users/${match.params.id}/pendingAppointment/student`)
            .then((data) => {
              setPendingAppointmentStudent(data.data.pendingAppointmentStudent);
            }),
          await axios
            .create({
              baseURL: 'http://localhost:3001/',
              withCredentials: true, //I read around that you need this for cookies to be sent?
            })
            .get(`api/v1/users/${match.params.id}/pendingAppointment/teacher`)
            .then((data) => {
              setPendingAppointmentTeacher(data.data.pendingAppointmentTeacher);
            }),
          await axios
            .create({
              baseURL: 'http://localhost:3001/',
              withCredentials: true, //I read around that you need this for cookies to be sent?
            })
            .get(`api/v1/users/${match.params.id}/booking/`)
            .then((data) => {
              setBookedList(data.data.Booked);
            }),
        ])
        .catch((err) => {
          reject('There was an error');
        });
    });
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setNavValue('3');
      getUser();
    }

    return () => {
      unmounted = true;
    };
  }, [match.params.id]);

  const useStyles = makeStyles({
    form: {
      display: 'flex',
    },
    margin: {
      margin: '5px',
    },
    wrapper: {
      width: '1200px',
      margin: '50px auto',
    },
  });
  const classes = useStyles();

  const onHandleNewCollaborate = async () => {
    try {
      await axios
        .create({
          baseURL: urlAPI,
          withCredentials: true, //I read around that you need this for cookies to be sent?
        })
        .post(`${urlAPI}session`, {})
        .then((data) => {
          history.push(`/session/${data.data.newSession.id}`);
          console.log(userProfile);
        });
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <User>
      {user && userProfile && (
        <div>
          <Stack direction="row" spacing={3}>
            <UserInfoWrapper elevation={12}>
              <Avatar
                alt={`${userProfile.firstname} ${userProfile.lastname}`}
                src={`${urlAPI}img/users/${userProfile.profilePic}`}
                sx={{ width: 156, height: 156 }}
                style={{ marginBottom: '10px' }}
              />
              <Typography component="h4" variant="h4">
                {userProfile.firstname} {userProfile.lastname}
              </Typography>
              <Typography component="p">
                {userProfile.address &&
                  userProfile.address.split(',').join(', ')}{' '}
                City
              </Typography>
              <Typography component="p">{userProfile.gender}</Typography>
              <Stack
                direction="row"
                spacing={0.5}
                mt={1}
                style={{
                  overflow: 'hidden',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {userProfile.spokenLanguage &&
                  userProfile.spokenLanguage.map((el) => {
                    return (
                      <Chip
                        label={el}
                        key={el}
                        style={{ marginBottom: '2.5px' }}
                      />
                    );
                  })}
              </Stack>
              <Typography style={{ marginTop: '5px' }} component="p">
                {userProfile.bio}
              </Typography>
              <div style={{ marginTop: '15px' }}>
                {match.params.id !== user.id ? (
                  <SetAppointment
                    profileId={match.params.id}
                    setPendingAppointmentTeacher={setPendingAppointmentTeacher}
                    match={match}
                  />
                ) : (
                  <p></p>
                )}
              </div>
            </UserInfoWrapper>
            <ProgLanguageWrapper elevation={12}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '16px',
                }}
              >
                {' '}
                <Typography component="h2" variant="h5">
                  Programming Languages
                </Typography>
                {match.params.id === user.id ? (
                  <>
                    <ProgrammingLanguages
                      match={match.params.id}
                      language={language}
                      setLanguage={setLanguage}
                      topic={topic}
                      setTopic={setTopic}
                      description={description}
                      setDescription={setDescription}
                      setProgrammingLanguageKnown={setProgrammingLanguageKnown}
                    />
                  </>
                ) : (
                  <>
                    <p></p>
                  </>
                )}
              </div>
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  style={{ overflowY: 'hidden' }}
                >
                  {programmingLanguageKnown.length ? (
                    programmingLanguageKnown.map((programmingLang) => {
                      return (
                        <ProgrammingCard
                          match={match.params.id}
                          key={programmingLang.id}
                          id={programmingLang.id}
                          language={programmingLang.language}
                          choosenTopic={programmingLang.topic}
                          choosenDescription={programmingLang.description}
                          ratePerMinute={programmingLang.ratePerMinute}
                          programmingLanguageKnown={programmingLanguageKnown}
                          setProgrammingLanguageKnown={
                            setProgrammingLanguageKnown
                          }
                        />
                      );
                    })
                  ) : (
                    <>
                      <p>User didn't set programming language yet</p>
                    </>
                  )}
                </Stack>
              </div>
            </ProgLanguageWrapper>
          </Stack>
          <ReviewWrapper elevation={12}>
            <Typography component="h2" variant="h5" gutterBottom>
              Reviews({userProfile.ratingsQuantity})
            </Typography>
            {reviewer.length ? (
              reviewer.map((review) => {
                return (
                  <ReviewCard
                    key={review.id}
                    review={review.review}
                    rating={review.rating}
                    createdAt={review.createdAt}
                    firstname={review.user.firstname}
                    lastname={review.user.lastname}
                    profilePic={review.user.profilePic}
                  />
                );
              })
            ) : (
              <>
                <p>There are no reviews</p>
              </>
            )}
          </ReviewWrapper>
          {match.params.id === user.id ? (
            <AppointmentWrapper elevation={12}>
              <>
                <Typography component="h2" variant="h5" gutterBottom>
                  Appointment Request
                </Typography>
                <Stack
                  spacing={1}
                  direction="row"
                  style={{ overflowY: 'hidden' }}
                >
                  {pendingAppointmentStudent.length ? (
                    pendingAppointmentStudent.map((appointment) => {
                      pendingStudentCounter++;
                      return appointment.pendingStatus === 'Pending' ? (
                        <PendingCardStudent
                          key={appointment.id}
                          appointmentId={appointment.id}
                          profilePic={appointment.student.profilePic}
                          firstname={appointment.student.firstname}
                          lastname={appointment.student.lastname}
                          programmingLanguage={appointment.programmingLanguage}
                          startingDate={appointment.startingDate}
                          endingDate={appointment.endingDate}
                          timeSpend={appointment.timeSpend}
                          ratePerMinute={appointment.ratePerMinute}
                          totalRate={appointment.totalRate}
                          totalCommission={appointment.totalCommission}
                          totalAmount={appointment.totalAmount}
                          setPendingAppointmentStudent={
                            setPendingAppointmentStudent
                          }
                          match={match}
                        />
                      ) : (
                        <div
                          key={appointment.id}
                          style={{ display: 'none' }}
                        ></div>
                      );
                    })
                  ) : (
                    <>
                      <p style={{ marginLeft: '16px', marginTop: '15px' }}>
                        There's no appointments request
                      </p>
                    </>
                  )}
                </Stack>
              </>
            </AppointmentWrapper>
          ) : (
            <>
              <p></p>
            </>
          )}
          <BookingWrapper elevation={12}>
            <Typography component="h2" variant="h5">
              Booking Request
            </Typography>
            <Stack spacing={1} direction="row" style={{ overflowY: 'hidden' }}>
              {pendingAppointmentTeacher.length ? (
                pendingAppointmentTeacher.map((appointment) => {
                  pendingTeacherCounter++;
                  return (
                    <PendingCardTeacher
                      key={appointment.id}
                      appointmentId={appointment.id}
                      studentId={appointment.student.id}
                      teacherId={appointment.teacher.id}
                      profilePic={appointment.teacher.profilePic}
                      firstname={appointment.teacher.firstname}
                      lastname={appointment.teacher.lastname}
                      programmingLanguage={appointment.programmingLanguage}
                      startingDate={appointment.startingDate}
                      endingDate={appointment.endingDate}
                      pendingStatus={appointment.pendingStatus}
                      timeSpend={appointment.timeSpend}
                      ratePerMinute={appointment.ratePerMinute}
                      totalRate={appointment.totalRate}
                      totalCommission={appointment.totalCommission}
                      totalAmount={appointment.totalAmount}
                      setPendingAppointmentTeacher={
                        setPendingAppointmentTeacher
                      }
                      setBookedList={setBookedList}
                      match={match}
                    />
                  );
                })
              ) : (
                <>
                  <p style={{ marginLeft: '16px', marginTop: '15px' }}>
                    No available bookings so far.
                  </p>
                </>
              )}
            </Stack>
          </BookingWrapper>
          <hr style={{ margin: '40px' }} />
          <Typography component="h2" variant="h5">
            Booked Appointments
          </Typography>
          {BookingCalendar && <BookingCalendar match={match} />}
          <IsEmailVerify />{' '}
        </div>
      )}
    </User>
  );
};

const User = styled.div`
  color: #efe;
  padding: 40px 50px;
  width: 1300px;
  margin: 0 auto;
`;

const UserInfoWrapper = styled(Paper)`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #202020;
  width: 455px;
  padding: 30px;
  text-align: center;
`;

const ProgLanguageWrapper = styled(Paper)`
  background-color: #202020;
  width: 835px;
  padding: 30px;
`;

const ReviewWrapper = styled(Paper)`
  background-color: #202020;
  width: 100%;
  margin-top: 25px;
  padding: 30px;
`;

const AppointmentWrapper = styled(Paper)`
  background-color: #202020;
  width: 100%;
  margin-top: 25px;
  padding: 30px;
`;

const BookingWrapper = styled(Paper)`
  background-color: #202020;
  width: 100%;
  margin-top: 25px;
  padding: 30px;
`;

export default Profile;
