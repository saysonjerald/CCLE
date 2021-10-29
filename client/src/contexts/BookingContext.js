import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

const BookingProvider = (props) => {
  const [pendingAppointmentStudent, setPendingAppointmentStudent] = useState(
    []
  );
  const [pendingAppointmentTeacher, setPendingAppointmentTeacher] = useState(
    []
  );

  return (
    <BookingContext.Provider
      value={{
        pendingAppointmentStudent,
        setPendingAppointmentStudent,
        pendingAppointmentTeacher,
        setPendingAppointmentTeacher,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
