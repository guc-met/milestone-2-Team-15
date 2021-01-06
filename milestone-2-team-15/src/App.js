import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import HR from "./pages/HR";
import Location from "./pages/Location";
import { BrowserRouter, Route } from "react-router-dom";
//import logo from './logo.svg';
//import Login from "./components/login"
import DropDown from "./components/dropDown";
import Header from "./components/header";
import RegisterStaff from "./components/RegisterStaff";
// function App() {
//   return (

function App() {
  return (
    <div>
      <DropDown />
      <BrowserRouter>
        <Route path="/HR" component={HR} />
        <Route path="/Locations" component={Location} />
        <Route path="/HR/RegisterStaff" component={RegisterStaff} />
      </BrowserRouter>
    </div>
  );
}

export default App;
