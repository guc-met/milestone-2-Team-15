import React from "react";
import { useHistory } from "react-router-dom";
function HOD() {
  const history = useHistory();


  return (
    <div>
      <div class="red"></div>
      <div class="yellow"></div>
      <div class="sidenav">
        
        <a href="/hod/deletetest">delete Instructor</a>
        <a href="/hod/AssignInst">Assign Instructor</a>
        <a href="/hod/UpdateInst">Update Instructor</a>
        <a href="/hod/viewStaff">View Staff</a>
        <a href="/hod/viewStaffdayoff">View Staff dayoff</a>
        <a href="/hod/viewAllreqs">View and manage requests</a>
        <a href="/hod/viewCoverage">View Coverage of each course</a>
        <a href="/hod/viewTeachAssigns">View Teaching Assignments</a>

        
      </div>
    </div>
  );
}

export default HOD;
