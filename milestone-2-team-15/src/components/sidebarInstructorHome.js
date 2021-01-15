import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/sideBar.css";
import DropDown from "./dropDown";
//import DropDownInstructorHome from "./dropDownInstructorHome"

/*<div class="red">
        
<a href="/Instructor/viewAssignedSlotsOfCourse">View my courses coverage</a> <br/>
<a href="/Instructor/viewStaffProfileByDept">View Staff Profiles</a> <br/>


</div>
<div class="yellow"> 


</div>*/

export default function sideBar(props) {
  return (
    <div>
      <div>
        {/*<div class="sidenav" style={{width:"200px",top:"70px", height:"100%",background:"url('https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg')", backgroundSize:"cover"}}>*/}
        <div class="sidenav">
          <br />
          <br />
          <br />
          <br />
          <br />
          <a href="/Instructor/sendReq">Send Requests</a> <br />
          <a href="/Instructor/viewrequest">View Requests</a> <br />
          <a href="/Instructor/viewSchedule">View Schedule</a> <br />
          <a href="/Instructor/viewCoverage">View My Courses Coverage</a> <br />
          <a href="/Instructor/viewAssignedSlotsOfCourse">
            View Asigned Slots of my Courses
          </a>{" "}
          <br />
          <a href="/Instructor/viewStaffProfileByDept">
            View Staff Profiles
          </a>{" "}
          <br />
          <a href="/Instructor/assignAcademicMember">
            Assign an Academic Member to a Vacant Slot
          </a>{" "}
          <br />
          <a href="/Instructor/updateAssignment">
            {" "}
            Update the Academic Member of a Slot
          </a>{" "}
          <br />
          <a href="/Instructor/deleteAssignment">
            {" "}
            Delete Slot Assignment of an Academic Member
          </a>{" "}
          <br />
          <a href="/Instructor/deleteMemberFromCourse">
            {" "}
            Remove an Academic Member from Course
          </a>{" "}
          <br />
          <a href="/Instructor/assignCoordinator">
            {" "}
            Assign a TA as a Coordinator
          </a>{" "}
          <br />
        </div>
      </div>
      <DropDown type="Instructor" />
    </div>
  );
}
