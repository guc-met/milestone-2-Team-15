import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import HR from "./pages/HR";
import Location from "./pages/Location";
import { BrowserRouter, Route } from "react-router-dom";
//import logo from './logo.svg';
//import Login from "./components/login"
import DropDown from "./components/dropDown"
import SideBar from "./components/sideBar"
import Header from "./components/header"
import Sidebarhodhome from "./components/sidebarhodhome"
import DropDown from "./components/dropDown";
import Header from "./components/header";
import RegisterStaff from "./components/RegisterStaff";
import UpdateStaff from "./components/UpdateStaff";
import DeleteStaff from "./components/DeleteStaff";

// function App() {
//   return (

function App() {
  return (<div>
    <DropDown/>

    <Sidebarhodhome/>
   </div>
  )
  // return (
  //   <div>
  //     <DropDown />
  //     <BrowserRouter>
  //       <Route path="/HR" component={HR} />
  //       <Route path="/Locations" component={Location} />
  //       <Route path="/HR/RegisterStaff" component={RegisterStaff} />
  //       <Route path="/HR/UpdateStaff" component={UpdateStaff} />
  //       <Route path="/HR/DeleteStaff" component={DeleteStaff} />
  //     </BrowserRouter>
  //   </div>
  // );
}

export default App;
