import React from "react";
import { useHistory } from "react-router-dom";
import DropDown from "../components/dropDown";

function HOD() {
  const history = useHistory();

  return (
    <>
      <DropDown type="hod" />
      <div class="sidenav">
        <br />
        <br />
        <br />
        <br />
        <br />
        <a href="/HOD/viewSchedule">View Schedule</a>
        <a href="/HOD/sendReq">Send Requests </a>
        <a href="/HOD/viewrequest">View Requests</a>
        <a href="/hod/deletetest">delete Instructor</a>
        <a href="/hod/AssignInst">Assign Instructor</a>
        <a href="/hod/UpdateInst">Update Instructor</a>
        <a href="/hod/viewStaff">View Staff</a>
        <a href="/hod/viewStaffdayoff">View Staff dayoff</a>
        <a href="/hod/viewAllreqs">View and manage requests</a>
        <a href="/hod/viewCoverage">View Coverage of each course</a>
        <a href="/hod/viewTeachAssigns">View Teaching Assignments</a>
      </div>
    </>
  );
}

export default HOD;
