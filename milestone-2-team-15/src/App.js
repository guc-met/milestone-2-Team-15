import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import HR from "./pages/HR";
import Location from "./pages/Location";
import { BrowserRouter, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Route path="/HR" component={HR} />
      <Route path="/Locations" component={Location} />
    </BrowserRouter>
  );
}

export default App;
