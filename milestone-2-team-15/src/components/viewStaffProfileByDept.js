import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  ListGroup,
  Form,
  Modal,
  Button,
  Card,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";

import * as Icon from "react-bootstrap-icons";

import { Plus } from "react-bootstrap-icons";
require("dotenv").config();
function ViewStaffProfileByDept(props) {
  const history = useHistory();

  const [facname, setFacname] = useState();
  const [msg, setmsg] = useState([]);
  let response = [];

  const token =localStorage.getItem("token");
    const view = async (event) => {
           response = await axios( {method:'post',url:`${process.env.REACT_APP_URL}/instructor_routes/viewStaffProfileByDept`,
           data:{
            facName: facname,
           },  headers:{token:token}
         });

    if (response.length == 0) {
      return;
    }

    const arr = [];
    for (let i = 0; i < response.data.length; i++) {
      const request = response.data[i];

      console.log(request);
      /* 
        let kind= "";

        let academicMember = "";
        let timing = "";
        let courseCode = "";
        let location = "";
        
        
        if(!request.kind==null){
          kind = request.kind;
        }
        if(request.academicMember){
          academicMember = request.academicMember;
        }
        if(request.timing){
          timing = request.timing;
        }
        if(request.courseCode){
          courseCode = request.courseCode;
        }
        if(request.location){
          location = request.location;
        }*/

      if (request) {
        arr.push(
          <div>
            <br />
            <p>
              <h4>Name: </h4>
              {request.name} <br />
              <br />
              <h4>ID: </h4>
              {request.ID} <br />
              <br />
              <h4>Email: </h4>
              {request.email} <br />
              <br />
              <h4>Faculty: </h4>
              {request.faculty} <br />
              <br />
              <h4>Department: </h4>
              {request.department} <br />
              <br />
              <h4>Day Off: </h4>
              {request.dayOff} <br />
              <br />
              <h4>Gender: </h4>
              {request.gender} <br />
              <br />
              <h4>Salary: </h4>
              {request.salary ? request.salary.$numberDecimal : null} <br />
              <br />
              <h4>Deduction: </h4>
              {request.leaveBalance
                ? request.leaveBalance.$numberDecimal
                : null}{" "}
              <br />
              <br />
              <h4>Leave Balance: </h4>
              {request.leaveBalance
                ? request.leaveBalance.$numberDecimal
                : null}{" "}
              <br />
              <br />
              <h4>Missing Days: </h4>
              {request.missingDays} <br />
              <br />
              <h4>Must Attend Hours: </h4>
              {request.mustAttendHours} <br />
              <br />
              <h4>Attended Hours: </h4>
              {request.attendedHours} <br />
              <br />
              <br />
              <br />
              <br />
              <style></style>
              <div class="vl"></div>
            </p>
          </div>
        );
      }
    }
    setmsg(arr);
    //setChosenFac("Media Engineeeering and Technology");
  };

  return (
    <div class="Hr-Buttons">
      <Form >
        <label for="facName">Faculty Name</label> <br />
        <input
          type="text"
          class="facNameInput"
          id="facNameInputID"
          aria-describedby="facNameHelp"
          placeholder="Enter your faculty name"
          onChange={(event) => {
            setFacname(event.target.value);
          }}
        />
        <br />
        <br />
        <Button onClick={view}>View Staff Profiles </Button>
        <p>{msg}</p>
      </Form>
    </div>
  );
}

export default ViewStaffProfileByDept;
