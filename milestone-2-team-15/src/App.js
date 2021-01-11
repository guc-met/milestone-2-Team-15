import logo from "./logo.svg"
import React from "react"
import HR from "./pages/HR"
import Location from "./pages/Location"
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import { Switch } from "react-router"
import "./App.css"

import LoginPage from "./pages/LoginPage"

// import DropDown from "./components/dropDown"
// import SideBar from "./components/LoginSidebar"
// import Header from "./components/header"
// import Sidebarhodhome from "./components/sidebarhodhome"

import HRProfilePage from "./pages/profile/HRProfilePage"
import InstructorProfilePage from "./pages/profile/InstructorProfilePage"
import HODProfilePage from "./pages/profile/HODProfilePage"
import TAProfilePage from "./pages/profile/TAProfilePage"

import ResetPasswordPage from "./pages/ResetPasswordPage"
import StaffViewAttendancePage from "./pages/StaffViewAttendancePage"
import StaffViewmissingDaysPage from "./pages/StaffViewmissingDaysPage"
import ExtraHoursPage from "./pages/ExtraHoursPage"
import MissingHoursPage from "./pages/MissingHoursPage"


import Signin from "./components/Signin"
import Signout from "./components/Signout"
import Logout from "./components/Logout"


function App() {
  const token = localStorage.getItem("token")
  return (
    <div>
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

       
      </BrowserRouter>
    </div>
  )
}

export default App
