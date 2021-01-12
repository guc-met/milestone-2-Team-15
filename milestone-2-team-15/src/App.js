import React, { useState, useEffect } from "react";
import HOD from "./pages/HOD.js"
import AssignInst from "./components/assignInst.js"
import Deletetest from "./components/deletetest.js"
import ViewStaff from "./components/viewStaffhod.js"
import Viewdayoff from "./components/viewdayOffhod.js"
import UpdateInst from "./components/updateInst.js"
import ViewAllreqshod from "./components/viewReqshod.js"
import CoverageOfCourses from "./components/viewCovhod.js"
import ViewTeachAssigns from "./components/viewTeachAssignhod.js"
import Sidebarhodhome from "./components/sidebarhodhome";
import { BrowserRouter, Route } from "react-router-dom";


import DropDown from "./components/dropDown";


// function App() {
//   return (

function App() {
  return (
    <div>
      <DropDown />
      <BrowserRouter>
      {/* mainpage */}
      {/* <Route path="/HOD" component={Sidebarhodhome} /> */}
        <Route path="/hod" component={HOD} /> 
        {/* delete instructor */}
        <Route path="/hod/deletetest" component={Deletetest} />
        {/* assign Instructor */}
        <Route path="/hod/AssignInst" component={AssignInst} />
        {/* update instructor */}
        <Route path="/hod/UpdateInst" component={UpdateInst} />
        {/* hod views staff */}
        <Route path="/hod/viewStaff" component={ViewStaff} />
        {/* view staff dayoff + view specific staff day off */}
        <Route path="/hod/viewStaffdayoff" component={Viewdayoff} />
        {/* viewAllreqs */}
        <Route path="/hod/viewAllreqs" component={ViewAllreqshod} />
        {/* viewCoverage */}
        <Route path="/hod/viewCoverage" component={CoverageOfCourses} />
        {/* viewTeachAssigns */}
        <Route path="/hod/viewTeachAssigns" component={ViewTeachAssigns} />




      </BrowserRouter>
    </div>
  );
}

export default App;
