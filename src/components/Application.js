import React from "react";
import useApplicationData from "hooks/useApplicationData";



import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment/index";

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";


export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  const interviewers = getInterviewersForDay(state,state.day)

    return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
       cancelInterview={cancelInterview}
    />
  );
});

  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
       </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {/* {dailyAppointments.map(appointment => {
          // return <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />
          //If we want every key in an object to become a prop for a component, we can spread the object into the props definition
          return <Appointment key={appointment.id} {...appointment} />
        })} */}
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
