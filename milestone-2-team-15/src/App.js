  
import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
//import logo from './logo.svg';
//import Login from "./components/login"
import DropDown from "./components/dropDown";
import Header from "./components/header";


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
import ViewCoverageInstructor from "./components/viewCoverageInstructor"
import ViewAssignedSlotsOfCourse from "./components/viewAssignedSlotsOfCourse"
import ViewStaffProfileByDept from "./components/viewStaffProfileByDept"
import AssignAcademicMember from "./components/assignAcademicMember"
import UpdateAssignment from "./components/updateAssignment"
import DeleteAssignment from "./components/deleteAssignment"
import DeleteMemberFromCourse from"./components/deleteMemberFromCourse"
import AssignCoordinator from "./components/assignCoordinator"

function App() {

  
  return (
    <div>
    <DropDown />
    <BrowserRouter>
      <Route path="/HOD" component={Sidebarhodhome} />
      <Route path="/HOD/sendReq" component={SendRequestHOD} />
      <Route path="/HOD/sendlinkReq" component={SendLinkRequest} />
      <Route path="/Instructor" component={SidebarInstructorHome} />
      <Route path="/Instructor/sendReq" component={SendRequestInstructor} />
      <Route path="/Instructor/sendlinkReq" component={SendLinkRequest} />
      <Route path="/Instructor/changedayoff" component={SendChangeDayOffRequest} />
      <Route path="/Instructor/replacementrequest" component={SendrepreqtoHOD} />
      <Route path="/Instructor/replacementrequestHOD" component={SendrepreqtoHOD} />
      <Route path="/Instructor/leaverequest" component={SendLeaveReq} />
      <Route path="/coordinator" component={Sidebardcoor} />
      <Route path="/coordinator/sendReq" component={SendRequestCoor}/>
      <Route path="/coordinator/changedayoff" component={SendChangeDayOffRequest}/>
      <Route path="/coordinator/replacementrequest" component={Sendrepreqtorep} />
      <Route path="/coordinator/replacementrequestHOD" component={SendrepreqtoHOD} />
      <Route path="/coordinator/leaverequest" component={SendLeaveReq} />
      
      <Route path="/Instructor/viewCoverage" component={ViewCoverageInstructor} />
      <Route path="/Instructor/viewAssignedSlotsOfCourse" component={ViewAssignedSlotsOfCourse} />
      <Route path="/Instructor/viewStaffProfileByDept" component={ViewStaffProfileByDept} />
      <Route path="/Instructor/assignAcademicMember" component={AssignAcademicMember} />
      <Route path="/Instructor/updateAssignment" component={UpdateAssignment} />
      <Route path="/Instructor/deleteAssignment" component={DeleteAssignment} />
      <Route path="/Instructor/deleteMemberFromCourse" component={DeleteMemberFromCourse} />
      <Route path="/Instructor/assignCoordinator" component={AssignCoordinator} />
      
      
    </BrowserRouter>
  </div>
  );
}

export default App;