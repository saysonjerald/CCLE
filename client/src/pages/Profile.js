import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { Grid, Typography, Button, Avatar } from '@mui/material';
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
      <Avatar
        alt={`${userProfile.firstname} ${userProfile.lastname}`}
        src={`${urlAPI}img/users/${userProfile.profilePic}`}
        sx={{ width: 156, height: 156 }}
      />
      <h3>
        {userProfile.firstname} {userProfile.lastname}
      </h3>
      <div>
        {match.params.id !== user.id ? (
          <SetAppointment profileId={match.params.id} />
        ) : (
          <p></p>
        )}
      </div>
      <p>{userProfile.bio}</p>
      <p>{userProfile.address}</p>
      <p>{userProfile.programmingLanguage}</p>
      <p>{userProfile.spokenLanguage}</p>
      <p>{userProfile.prices}</p>
      <p>{userProfile.priceStarting}</p>
      {match.params.id === user.id ? (
        <>
          <Typography component="h2" variant="h5">
            Appointment Request({pendingStudentCounter})
          </Typography>
          <Grid container spacing={2}>
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
                    grossPay={appointment.grossPay}
                    commission={appointment.commission}
                    netPay={appointment.netPay}
                    setPendingAppointmentStudent={setPendingAppointmentStudent}
                    match={match}
                  />
                ) : (
                  <div key={appointment.id}></div>
                );
              })
            ) : (
              <>
                <p>There are no request appointments</p>
              </>
            )}
          </Grid>
        </>
      ) : (
        <>
          <p></p>
        </>
      )}
      <Typography component="h2" variant="h5">
        Booking Request({pendingTeacherCounter})
      </Typography>
      <Grid container spacing={2}>
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
                grossPay={appointment.grossPay}
                commission={appointment.commission}
                netPay={appointment.netPay}
                setPendingAppointmentTeacher={setPendingAppointmentTeacher}
              />
            );
          })
        ) : (
          <>
            <p>There are no request appointments</p>
          </>
        )}
      </Grid>
      {match.params.id === user.id ? (
        <>
          <hr style={{ margin: '40px' }} />
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
      <Typography component="h2" variant="h5">
        Programming Languages
      </Typography>
      <Grid className={classes.form}>
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
                setProgrammingLanguageKnown={setProgrammingLanguageKnown}
              />
            );
          })
        ) : (
          <>
            <p>Empty programming language</p>
          </>
        )}
      </Grid>
      <hr style={{ margin: '40px' }} />
      <Typography component="h2" variant="h5">
        Booked Appointments
      </Typography>
      {BookingCalendar && <BookingCalendar match={match} />}
      {match.params.id !== user.id ? (
        <ReviewPost
          userURL={match.params.id}
          reviewer={reviewer}
          setReviewer={setReviewer}
          match={match.params.id}
        />
      ) : (
        <>
          <p></p>
        </>
      )}
      <Typography component="h2" variant="h5">
        Reviews({userProfile.ratingsQuantity})
      </Typography>
      {reviewer.length ? (
        reviewer.map((review) => {
          return (
            <ReviewCard
              key={review.id}
              review={review.review}
              rating={review.rating}
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
    </User>
  );
};

const User = styled.div`
  background-color: #555;
  color: #efe;
  padding: 40px 50px;
`;

export default Profile;
