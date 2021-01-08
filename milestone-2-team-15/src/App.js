import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import HR from "./pages/HR";
import Location from "./components/Location";
import { BrowserRouter, Route } from "react-router-dom";
//import logo from './logo.svg';
//import Login from "./components/login"
import DropDown from "./components/dropDown";
import Header from "./components/header";
import RegisterStaff from "./components/RegisterStaff";
import UpdateStaff from "./components/UpdateStaff";
import DeleteStaff from "./components/DeleteStaff";
import staffAttendanceRecords from "./components/staffAttendanceRecords";
import staffMissingDays from "./components/StaffMissingDays";
import staffMissingHours from "./components/StaffMissingHours";
import UpdateSalary from "./components/UpdateSalary";
import Faculties from "./components/Faculties";

// function App() {
//   return (

function App() {
  return (
    <div>
      <DropDown />
      <BrowserRouter>
        <Route path="/HR" component={HR} />
        <Route path="/HR/Locations" component={Location} />
        <Route path="/HR/RegisterStaff" component={RegisterStaff} />
        <Route path="/HR/UpdateStaff" component={UpdateStaff} />
        <Route path="/HR/DeleteStaff" component={DeleteStaff} />
        <Route
          path="/HR/staffAttendanceRecords"
          component={staffAttendanceRecords}
        />
        <Route path="/HR/staffMissingDays" component={staffMissingDays} />
        <Route path="/HR/staffMissingHours" component={staffMissingHours} />
        <Route path="/HR/UpdateSalary" component={UpdateSalary} />
        <Route path="/HR/Faculties" component={Faculties} />
      </BrowserRouter>
    </div>
  );
}

export default App;
