import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/sideBar.css";
import "../stylesheets/HR.css";

import { useHistory } from "react-router-dom";
function HR() {
  const history = useHistory();
  function onclick() {
    history.push("/Locations");
    return;
  }

  return (
    <div>
      <div class="red"></div>
      <div class="yellow"></div>
      <div class="sidenav">
        <a href="/HR/RegisterStaff">Register Staff</a>

        <a href="#">Update/delete Staff</a>
        <a href="#">Add Signin/signout</a>
        <a href="#">view any staff attendance record</a>
        <a href="#">view staff with missing hours </a>
        <a href="#">view staff with missing days</a>
        <a href="#">Update the salary of a staff member</a>
      </div>
    </div>
  );
}

export default HR;
