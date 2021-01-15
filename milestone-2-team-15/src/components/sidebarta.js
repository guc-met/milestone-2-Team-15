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
          <a href="/ta/viewSchedule">View Schedule</a> <br />
          <a href="/ta/sendReq">Send Requests</a> <br />
          <a href="/ta/viewrequest">View Requests</a> <br />
          <a href="#">View Schedule</a> <br />
        </div>
      </div>
      <DropDown type="coordinator" />
    </div>
  );
}
