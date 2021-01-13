import HR from "./pages/HR"
import Location from "./pages/Location"
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import { Switch } from "react-router"
import "./App.css"
import LoginPage from "./pages/LoginPage"
import logo from "./logo.svg";
import HOD from "./pages/HOD.js"
import AssignInst from "./components/assignInst.js"
import Deletetest from "./components/deletetest.js"
import ViewStaff from "./components/viewStaffhod.js"
import Viewdayoff from "./components/viewdayOffhod.js"
import UpdateInst from "./components/updateInst.js"
import ViewAllreqshod from "./components/viewReqshod.js"
import CoverageOfCourses from "./components/viewCovhod.js"
import ViewTeachAssigns from "./components/viewTeachAssignhod.js"
import React, { useState, useEffect } from "react";
import ResetPasswordPage from "./pages/ResetPasswordPage"
import StaffViewAttendancePage from "./pages/StaffViewAttendancePage"
import StaffViewmissingDaysPage from "./pages/StaffViewmissingDaysPage"
import ExtraHoursPage from "./pages/ExtraHoursPage"
import MissingHoursPage from "./pages/MissingHoursPage"


import Signin from "./components/Signin"
import Signout from "./components/Signout"
import Logout from "./components/Logout"

//import logo from './logo.svg';
//import Login from "./components/login"
import DropDown from "./components/dropDown";
import Header from "./components/header";

import HRProfilePage from "./pages/profile/HRProfilePage"
import InstructorProfilePage from "./pages/profile/InstructorProfilePage"
import HODProfilePage from "./pages/profile/HODProfilePage"
import TAProfilePage from "./pages/profile/TAProfilePage"
import Sidebarhodhome from "./components/sidebarhodhome";
import SendRequestHOD from "./components/sendRequestHOD";
import SendLinkRequest from "./components/sendlinkreq";
import SidebarInstructorHome from "./components/sidebarInstructorHome";
import SendRequestInstructor from "./components/sendRequestInstructor";
import SendChangeDayOffRequest from "./components/changedayoffreq"
import Sidebardcoor from "./components/sidebarcoursecoor";
import SendRequestCoor from "./components/sendRequestCoor";
import Sendrepreqtorep from "./components/ReplacmentRqToRep"
import SendrepreqtoHOD from "./components/replacmentreqtoHOD"
import SendLeaveReq from "./components/sendLeaveReq"
import Viewreq from "./components/viewRequests"
import Viewlinkreq from "./components/coorlinkslotreqs";
import Addslot from "./components/cooraddslot";
import DeleteSlot from "./components/deleteslotcoor";
function App() {
  return (
    <div>
    <DropDown />
    <BrowserRouter>
    <Redirect from="/" to="/login" />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/attendance" component={StaffViewAttendancePage} />
        <Route exact path="/missingdays" component={StaffViewmissingDaysPage} />
        <Route exact path="/extrahours" component={ExtraHoursPage} />
        <Route exact path="/missinghours" component={MissingHoursPage} />
        <Route exact path="/resetpassword" component={ResetPasswordPage} />
        <Route exact path="/HRprofile" component={HRProfilePage} />
        <Route exact path="/instructorprofile" component={InstructorProfilePage} />
        <Route exact path="/hodprofile" component={HODProfilePage} />
        <Route exact path="/taprofile" component={TAProfilePage} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signout" component={Signout} />
        <Route exact path="/logout" component={Logout} />
      <Route path="/hod" component={HOD} />
      <Route path="/hod/sendReq" component={SendRequestHOD} />
      <Route path="/hod/sendlinkReq" component={SendLinkRequest} />
      <Route path="/hod/viewrequest" component={Viewreq} />
      <Route path="/Instructor" component={SidebarInstructorHome} />
      <Route path="/Instructor/sendReq" component={SendRequestInstructor} />
      <Route path="/Instructor/sendlinkReq" component={SendLinkRequest} />
      <Route path="/Instructor/changedayoff" component={SendChangeDayOffRequest} />
      <Route path="/Instructor/replacementrequest" component={Sendrepreqtorep} />
      <Route path="/Instructor/replacementrequestHOD" component={SendrepreqtoHOD} />
      <Route path="/Instructor/leaverequest" component={SendLeaveReq} />
      <Route path="/Instructor/viewrequest" component={Viewreq} />
      <Route path="/coordinator" component={Sidebardcoor} />
      <Route path="/coordinator/sendReq" component={SendRequestCoor}/>
      <Route path="/coordinator/changedayoff" component={SendChangeDayOffRequest}/>
      <Route path="/coordinator/replacementrequest" component={Sendrepreqtorep} />
      <Route path="/coordinator/replacementrequestHOD" component={SendrepreqtoHOD} />
      <Route path="/coordinator/leaverequest" component={SendLeaveReq} />
      <Route path="/coordinator/viewrequest" component={Viewreq} />
      <Route path="/coordinator/viewrecievedlinkslotreqs" component={Viewlinkreq} />
      <Route path="/coordinator/addslot" component={Addslot} />
      <Route path="/coordinator/deleteslot" component={DeleteSlot} />
        {/* delete instructor */}
        <Route path="/hod/deletetest" component={Deletetest} />
        {/* assign Instructor */}
        <Route path="/hod/AssignInst" component={AssignInst} />
        {/* update instructor */}
        <Route path="/hod/UpdateInst" component={UpdateInst} />
        {/* hod views staff */}
        <Route path="/hod/viewStaff" component={ViewStaff} />
        {/* view staff dayoff + view specific staff day off */}
        <Route path="/hod/viewStaffdayoff" component={Viewdayoff} />
        {/* viewAllreqs */}
        <Route path="/hod/viewAllreqs" component={ViewAllreqshod} />
        {/* viewCoverage */}
        <Route path="/hod/viewCoverage" component={CoverageOfCourses} />
        {/* viewTeachAssigns */}
        <Route path="/hod/viewTeachAssigns" component={ViewTeachAssigns} />
      

     
      


      
    </BrowserRouter>
  </div>
  );
}

export default App
