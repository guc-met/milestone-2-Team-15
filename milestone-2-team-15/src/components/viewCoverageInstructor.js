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
function ViewCoverageInstructor(props) {
  const history = useHistory();

  const [facname, setFacname] = useState();
  const [msg, setmsg] = useState([]);
  let response = [];

  const token =localStorage.getItem("token");
    const view = async (event) => {
           response = await axios( {method:'post',url:`${process.env.REACT_APP_URL}/instructor_routes/viewCourseCoverage`,
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

      //console.log(request);
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

      let lol = "";
      if (typeof request === "string") {
        lol = request;
      } else {
        lol = request ? request.$numberDecimal : null;
      }

      if (request) {
        arr.push(<div>{lol}</div>);
      }
    }
    setmsg(arr);
    //setChosenFac("Media Engineeeering and Technology");
  };

  return (
    <div class="Hr-Buttons">
      <Form>
        <label for="facName">Faculty Name</label> <br />
        <input
          type="text"
          class="facNameInput"
          id="facNameInputID"
          aria-describedby="facNameHlp"
          placeholder="Enter your faculty name"
          onChange={(event) => {
            setFacname(event.target.value);
          }}
        />
        <br />
        <br />
        <Button onClick={view}>View Coverage </Button>
        <h5>{msg}</h5>
      </Form>
    </div>
  );
}

export default ViewCoverageInstructor;
