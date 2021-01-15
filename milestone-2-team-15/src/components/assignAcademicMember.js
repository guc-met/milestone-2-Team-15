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

function AssignAcademicMember(props) {
  const [acadID, setAcadID] = useState();
  const [isTAbool, setIsTAbool] = useState(false);
  const [instid, setInstid] = useState();
  const [cc, setCc] = useState();
  const [faculty, setFaculty] = useState();
  const [msg, setmsg] = useState("");

  const token =localStorage.getItem("token");
    const sendReq = async (event) => {
           const response = await axios( {method:'post',url:`${process.env.REACT_APP_URL}/instructor_routes/assignAcademicMember`,
           data:{
                  
              newACid: acadID,
              isTA: isTAbool,
              courseCode: cc,
              facName: faculty,
           },  headers:{token:token}
         });
    setmsg((await response).data);
    console.log("suppppppp" + (await response).data + "\n");
  };

  return (
    <div class="Hr-Buttons">
      <Form>
        <label>Enter to-be-assigned Academic member ID</label> <br />
        <input
          type="text"
          className="facNameInput"
          id="newACid"
          aria-describedby="newACidHelp"
          placeholder="Enter ID"
          onChange={(event) => {
            setAcadID(event.target.value);
          }}
        />
        <p></p>
        <br />
        <br />
        <div>
          <input
            type="radio"
            id="TA"
            name="type"
            value="true"
            onChange={(event) => {
              setIsTAbool(event.target.value);
            }}
          />

          <label>This academic member is a TA</label>
          <br />

          <input
            type="radio"
            id="notTA"
            name="type"
            value="false"
            onChange={(event) => {
              setIsTAbool(event.target.value);
            }}
          />
          <label>This academic member is NOT a TA</label>
        </div>
        <br />
        <Form>
          <label>Faculty Name of That Course</label> <br />
          <input
            type="text"
            className="facID"
            id="facIDInputID"
            aria-describedby="facIDHelp"
            placeholder="Enter your faculty name"
            onChange={(event) => {
              setFaculty(event.target.value);
            }}
          />
        </Form>
        <br />
        <Form>
          <label>Enter the Code of The Course of The Slot</label> <br />
          <input
            type="text"
            className="courseCode"
            id="courseCode"
            aria-describedby="courseCodeHelp"
            placeholder="Enter Course Code"
            onChange={(event) => {
              setCc(event.target.value);
            }}
          />
        </Form>
        <br />
        <br />
        <Button onClick={sendReq}>Assign Academic Member </Button>
        <h3>{msg}</h3>
      </Form>
    </div>
  );
}

export default AssignAcademicMember;
