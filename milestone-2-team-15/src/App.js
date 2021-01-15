import HR from "./pages/HR";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Switch } from "react-router";
import "./App.css";
import Location from "./components/Location";
import LoginPage from "./pages/LoginPage";
import logo from "./logo.svg";
import HOD from "./pages/HOD.js";
import AssignInst from "./components/assignInst.js";
import Deletetest from "./components/deletetest.js";
import ViewStaff from "./components/viewStaffhod.js";
import Viewdayoff from "./components/viewdayOffhod.js";
import UpdateInst from "./components/updateInst.js";
import ViewAllreqshod from "./components/viewReqshod.js";
import CoverageOfCourses from "./components/viewCovhod.js";
import ViewTeachAssigns from "./components/viewTeachAssignhod.js";
import React, { useState, useEffect } from "react";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPassword from "./components/ResetPassword";
import StaffViewAttendancePage from "./pages/StaffViewAttendancePage";
import StaffViewmissingDaysPage from "./pages/StaffViewmissingDaysPage";
import ExtraHoursPage from "./pages/ExtraHoursPage";
import MissingHoursPage from "./pages/MissingHoursPage";

import Signin from "./components/Signin";
import Signout from "./components/Signout";
import Logout from "./components/Logout";

//import logo from './logo.svg';
//import Login from "./components/login"
import DropDown from "./components/dropDown";
import Header from "./components/header";

import HRProfilePage from "./pages/profile/HRProfilePage";
import InstructorProfilePage from "./pages/profile/InstructorProfilePage";
import CoordinatorProfilePage from "./pages/profile/CoordinatorProfilePage";

import HODProfilePage from "./pages/profile/HODProfilePage";
import TAProfilePage from "./pages/profile/TAProfilePage";
import Sidebarhodhome from "./components/sidebarhodhome";
import SendRequestHOD from "./components/sendRequestHOD";
import SendLinkRequest from "./components/sendlinkreq";
import SidebarInstructorHome from "./components/sidebarInstructorHome";
import SendRequestInstructor from "./components/sendRequestInstructor";
import SendChangeDayOffRequest from "./components/changedayoffreq";
import Sidebartta from "./components/sidebarta";
import Sidebardcoor from "./components/sidebarcoursecoor";
import SendRequestCoor from "./components/sendRequestCoor";
import Sendrepreqtorep from "./components/ReplacmentRqToRep";
import SendrepreqtoHOD from "./components/replacmentreqtoHOD";
import SendLeaveReq from "./components/sendLeaveReq";
import ViewCoverageInstructor from "./components/viewCoverageInstructor";
import ViewAssignedSlotsOfCourse from "./components/viewAssignedSlotsOfCourse";
import ViewStaffProfileByDept from "./components/viewStaffProfileByDept";
import AssignAcademicMember from "./components/assignAcademicMember";
import UpdateAssignment from "./components/updateAssignment";
import DeleteAssignment from "./components/deleteAssignment";
import DeleteMemberFromCourse from "./components/deleteMemberFromCourse";
import AssignCoordinator from "./components/assignCoordinator";
import Viewreq from "./components/viewRequests";
import Viewlinkreq from "./components/coorlinkslotreqs";
import Addslot from "./components/cooraddslot";
import DeleteSlot from "./components/deleteslotcoor";
import RegisterStaff from "./components/RegisterStaff";
import UpdateStaff from "./components/UpdateStaff";
import DeleteStaff from "./components/DeleteStaff";
import staffAttendanceRecords from "./components/staffAttendanceRecords";
import staffMissingDays from "./components/StaffMissingDays";
import staffMissingHours from "./components/StaffMissingHours";
import UpdateSalary from "./components/UpdateSalary";
import Faculties from "./components/Faculties";
import AddSignin from "./components/AddSigninSignOut";
import Updateslot from "./components/coorupdateslot";
import StaffEditP from "./components/StaffEditP";
import ViewSchedule from "./components/viewSchedule";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Redirect from="/" to="/login" /> */}
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/login" component={LoginPage} />

        <Route exact path="/logout" component={Logout} />
        {/* <Route exact path="/attendance" component={StaffViewAttendancePage} />
        <Route exact path="/missingdays" component={StaffViewmissingDaysPage} />
        <Route exact path="/extrahours" component={ExtraHoursPage} />
        <Route exact path="/missinghours" component={MissingHoursPage} />
        <Route exact path="/resetpassword" component={ResetPasswordPage} /> */}
        <Route exact path="/resetpasswordlogin" component={ResetPassword} />
       

        <Route path="/ta" component={Sidebartta} />
        <Route path="/hod" component={HOD} />
        <Route path="/ta/sendReq" component={SendRequestInstructor} />
        <Route path="/ta/sendlinkReq" component={SendLinkRequest} />
        <Route path="/ta/changedayoff" component={SendChangeDayOffRequest} />
        <Route path="/ta/replacementrequest" component={Sendrepreqtorep} />
        <Route path="/ta/replacementrequestHOD" component={SendrepreqtoHOD} />
        <Route path="/ta/leaverequest" component={SendLeaveReq} />
        <Route path="/ta/viewrequest" component={Viewreq} />
        <Route path="/ta/viewSchedule" component={ViewSchedule} />

        <Route path="/hod/sendReq" component={SendRequestHOD} />
        <Route path="/hod/sendlinkReq" component={SendLinkRequest} />
        <Route path="/hod/viewrequest" component={Viewreq} />
        <Route path="/Instructor" component={SidebarInstructorHome} />
        <Route path="/Instructor/sendReq" component={SendRequestInstructor} />
        <Route path="/Instructor/sendlinkReq" component={SendLinkRequest} />
        <Route
          path="/Instructor/changedayoff"
          component={SendChangeDayOffRequest}
        />
        <Route
          path="/Instructor/replacementrequest"
          component={Sendrepreqtorep}
        />
        <Route
          path="/Instructor/replacementrequestHOD"
          component={SendrepreqtoHOD}
        />
        <Route path="/Instructor/leaverequest" component={SendLeaveReq} />
        <Route path="/Instructor/viewrequest" component={Viewreq} />

        
        <Route path="/Instructor/viewSchedule" component={ViewSchedule} />


        <Route path="/coordinator" component={Sidebardcoor} />
        <Route path="/coordinator/viewSchedule" component={ViewSchedule} />
        <Route path="/coordinator/updateslot" component={Updateslot} />

        <Route path="/coordinator/sendReq" component={SendRequestCoor} />
        <Route
          path="/coordinator/changedayoff"
          component={SendChangeDayOffRequest}
        />
        <Route
          path="/coordinator/replacementrequest"
          component={Sendrepreqtorep}
        />
        <Route
          path="/coordinator/replacementrequestHOD"
          component={SendrepreqtoHOD}
        />
        <Route path="/coordinator/leaverequest" component={SendLeaveReq} />
        <Route path="/coordinator/viewrequest" component={Viewreq} />
        <Route
          path="/coordinator/viewrecievedlinkslotreqs"
          component={Viewlinkreq}
        />
        <Route path="/coordinator/addslot" component={Addslot} />
        <Route path="/coordinator/deleteslot" component={DeleteSlot} />
        <Route path="/hod/viewSchedule" component={ViewSchedule} />
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
        <Route path="/HR/AddSign" component={AddSignin} />
        <Route
          path="/Instructor/viewCoverage"
          component={ViewCoverageInstructor}
        />
        <Route
          path="/Instructor/viewAssignedSlotsOfCourse"
          component={ViewAssignedSlotsOfCourse}
        />
        <Route
          path="/Instructor/viewStaffProfileByDept"
          component={ViewStaffProfileByDept}
        />
        <Route
          path="/Instructor/assignAcademicMember"
          component={AssignAcademicMember}
        />
        <Route
          path="/Instructor/updateAssignment"
          component={UpdateAssignment}
        />
        <Route
          path="/Instructor/deleteAssignment"
          component={DeleteAssignment}
        />
        <Route
          path="/Instructor/deleteMemberFromCourse"
          component={DeleteMemberFromCourse}
        />
        <Route
          path="/Instructor/assignCoordinator"
          component={AssignCoordinator}
        />

       

       


<Route exact path="/ta/signin" component={Signin} />
<Route exact path="/ta/signout" component={Signout} />
<Route exact path="/ta/attendance" component={StaffViewAttendancePage} />
<Route exact path="/ta/resetpassword" component={ResetPasswordPage} />
<Route exact path="/ta/missingdays" component={StaffViewmissingDaysPage} />
<Route exact path="/ta/extrahours" component={ExtraHoursPage} />
<Route exact path="/ta/missinghours" component={MissingHoursPage} />
<Route exact path="/ta/taprofile" component={TAProfilePage} />
<Route
    exact
    path="/ta/editprofile"
    component={StaffEditP}
  />
<Route exact path="/hod/signin" component={Signin} />
<Route exact path="/hod/signout" component={Signout} />
<Route exact path="/hod/resetpassword" component={ResetPasswordPage} />
<Route exact path="/hod/attendance" component={StaffViewAttendancePage} />
<Route exact path="/hod/extrahours" component={ExtraHoursPage} />
<Route exact path="/hod/missinghours" component={MissingHoursPage} />
<Route exact path="/hod/missingdays" component={StaffViewmissingDaysPage} />
<Route exact path="/hod/profile" component={HODProfilePage} />
<Route
    exact
    path="/hod/editprofile"
    component={StaffEditP}
  />

 <Route exact path="/Instructor/signout" component={Signout} />
      <Route exact path="/Instructor/signin" component={Signin} />
      <Route exact path="/Instructor/resetpassword" component={ResetPasswordPage} />
      <Route exact path="/Instructor/attendance" component={StaffViewAttendancePage} />
      <Route exact path="/Instructor/extrahours" component={ExtraHoursPage} />
      <Route exact path="/Instructor/missinghours" component={MissingHoursPage} />
      <Route exact path="/Instructor/missingdays" component={StaffViewmissingDaysPage} />
      <Route
          exact
          path="/Instructor/profile"
          component={InstructorProfilePage}
        />
        
        <Route
    exact
    path="/Instructor/editprofile"
    component={StaffEditP}
  />

<Route exact path="/coordinator/signout" component={Signout} />
<Route exact path="/coordinator/signin" component={Signin} />
<Route exact path="/coordinator/resetpassword" component={ResetPasswordPage} />
<Route exact path="/coordinator/attendance" component={StaffViewAttendancePage} />
<Route exact path="/coordinator/extrahours" component={ExtraHoursPage} />
<Route exact path="/coordinator/missinghours" component={MissingHoursPage} />
<Route exact path="/coordinator/missingdays" component={StaffViewmissingDaysPage} />
<Route
    exact
    path="/coordinator/profile"
    component={CoordinatorProfilePage}
  />
  
  <Route
    exact
    path="/coordinator/editprofile"
    component={StaffEditP}
  />

<Route exact path="/HR/signout" component={Signout} />
<Route exact path="/HR/signin" component={Signin} />
<Route exact path="/HR/resetpassword" component={ResetPasswordPage} />
<Route exact path="/HR/attendance" component={StaffViewAttendancePage} />
<Route exact path="/HR/extrahours" component={ExtraHoursPage} />
<Route exact path="/HR/missinghours" component={MissingHoursPage} />
<Route exact path="/HR/missingdays" component={StaffViewmissingDaysPage} />
<Route exact path="/HR/profile" component={HRProfilePage} />
<Route exact path="/HR/editprofile" component={StaffEditP} />


      </BrowserRouter>
    </div>
  );
}

export default App;
