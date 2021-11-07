import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

const BookingProvider = (props) => {
  const [pendingAppointmentStudent, setPendingAppointmentStudent] = useState(
    []
  );
  const [pendingAppointmentTeacher, setPendingAppointmentTeacher] = useState(
    []
  );

  const [bookedList, setBookedList] = useState([]);

  return (
    <BookingContext.Provider
      value={{
        pendingAppointmentStudent,
        setPendingAppointmentStudent,
        pendingAppointmentTeacher,
        setPendingAppointmentTeacher,
        bookedList,
        setBookedList,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
