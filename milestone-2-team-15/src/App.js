import logo from "./logo.svg"
import React, { useState, useEffect } from "react"
import HR from "./pages/HR"
import Location from "./pages/Location"
import { BrowserRouter, Route } from "react-router-dom"
//import logo from './logo.svg';
import "./App.css"
import LoginPage from "./pages/LoginPage"
// function App() {
//   return <Login />
// }
import DropDown from "./components/dropDown"
import SideBar from "./components/LoginSidebar"
import Header from "./components/header"

import HRProfilePage from "./pages/profile/HRProfilePage"
import InstructorProfilePage from "./pages/profile/InstructorProfilePage"
import HODProfilePage from "./pages/profile/HODProfilePage"
import TAProfilePage from "./pages/profile/TAProfilePage"
import ResetPasswordPage from "./pages/ResetPasswordPage"

import Sidebarhodhome from "./components/sidebarhodhome"
import ResetPassword from "./components/ResetPassword"
import StaffViewAttendancePage from "./pages/StaffViewAttendancePage"

function App() {
  return (<div>
    <Header/>
    <StaffViewAttendancePage/>
    <Sidebarhodhome/>
    </div>
  )
}

export default App
