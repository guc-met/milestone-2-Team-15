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
function AssignCoordinator(props) {
  const history = useHistory();

  const [newID, setNewID] = useState();
  const [courseid, setCourseid] = useState();
  const [fac, setFac] = useState();
  const [msg, setmsg] = useState("");

  const token =localStorage.getItem("token");
    const sendReq = async (event) => {
           const response = await axios( {method:'post',url:`${process.env.REACT_APP_URL}/instructor_routes/assignCoordinator`,
           data:{
            id: newID,
            courseID: courseid,
            facName: fac,
           },  headers:{token:token}
         });
    setmsg((await response).data);
  };

  return (
    <div class="Hr-Buttons">
      <Form>
        <label for="TAid">Enter TA ID</label> <br />
        <input
          type="text"
          class="TAid"
          id="TAid"
          aria-describedby="TAidHelp"
          placeholder="Enter ID"
          onChange={(event) => {
            setNewID(event.target.value);
          }}
        />
        <br />
        <br />
        <Form>
          <label for="facID">Faculty Name of That Course</label> <br />
          <input
            type="text"
            class="facID"
            id="facIDInputID"
            aria-describedby="facIDHelp"
            placeholder="Enter your faculty name"
            onChange={(event) => {
              setFac(event.target.value);
            }}
          />
        </Form>
        <br />
        <Form>
          <label for="courseID">Enter the ID of The Course of The Slot</label>{" "}
          <br />
          <input
            type="text"
            class="courseID"
            id="courseIDid"
            aria-describedby="courseCodeHelp"
            placeholder="Enter Course Code"
            onChange={(event) => {
              setCourseid(event.target.value);
            }}
          />
        </Form>
        <br />
        <br />
        <Button onClick={sendReq}>Assign Coorditor</Button>
        <br />
        <p>{msg}</p>
      </Form>
    </div>
  );
}

export default AssignCoordinator;
