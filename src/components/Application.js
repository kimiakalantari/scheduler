import React, { useState,useEffect } from "react";

import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment/index";

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";


export default function Application(props) {

  //useState hook
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const setDay = day => {
    return setState({ ...state, day })};

  useEffect(()=>{
    const dayURL = "http://localhost:8001/api/days";
    const appointmentURL="http://localhost:8001/api/appointments";
    const interviewersURL = "http://localhost:8001/api/interviewers";
    //The below get request is for one API end point:
    // axios.get(dayURL).then(response =>{
    //   console.log(response.data)
    //   setDays([...response.data]);
    // })
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ]).then((all) =>{
      // console.log("first promise resolved:",all[0]);
      // console.log("second promise resolved:" ,all[1].data);
      // console.log("all the promises:", all);
      setState(prev=>({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}));
    })
  },[]);

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
