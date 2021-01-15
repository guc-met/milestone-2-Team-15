import React from "react";

import { useHistory } from "react-router-dom";
import DropDown from "../components/dropDown";

function HR() {
  const history = useHistory();
  function onclick() {
    history.push("/Locations");
    return;
  }

  return (
    <div>
      <DropDown type="HR" />

      {/* <div class="red"></div>
      <div class="yellow"></div> */}
      <div class="sidenav">
        <a href="/HR/Locations">View All Locations</a>

        <a href="/HR/Faculties">View All Faculties</a>

        <a href="/HR/RegisterStaff">Register Staff</a>

        <a href="/HR/UpdateStaff">Update Staff</a>
        <a href="/HR/DeleteStaff">Delete Staff</a>

        <a href="/HR/staffAttendanceRecords">
          view any staff attendance record
        </a>
        <a href="/HR/AddSign">Add Signin/Signout</a>
        <a href="/HR/staffMissingHours">view staff with missing hours </a>
        <a href="/HR/staffMissingDays">view staff with missing days</a>
        <a href="/HR/UpdateSalary">Update the salary of a staff member</a>
        {/* </div>
    </div> */}
      </div>
    </div>
  );
}

export default HR;
