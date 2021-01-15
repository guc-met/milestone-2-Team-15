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
function UpdateAssignment(props) {
  const [acadID, setAcadID] = useState();
  const [oldAcadID, setOldAcadID] = useState();

  const [isOldTAbool, setIsOldTAbool] = useState(false);
  const [isTAbool, setIsTAbool] = useState(false);

  const [instid, setInstid] = useState();
  const [cc, setCc] = useState();
  const [faculty, setFaculty] = useState();
  const [msg, setmsg] = useState("");

  const history = useHistory();

  const token =localStorage.getItem("token");
    const sendReq = async (event) => {
           const response = await axios( {method:'post',url:`${process.env.REACT_APP_URL}/instructor_routes/updateAssignment`,
           data:{
                isOldTA: isOldTAbool,
                isTA: isTAbool,
        
                delID: oldAcadID,
                newACid: acadID,
        
                courseCode: cc,
                facName: faculty,
           },  headers:{token:token}
         });
    console.log("yadi el nila " + JSON.stringify(response));
    let x = response.data ? response.data.$numberDecimal : null
    setmsg(x);
  };
  return (
    <div class="Hr-Buttons">
      <Form>
        <label for="delID">Enter Old Academic Member ID</label> <br />
        <input
          type="text"
          class="delIDInput"
          id="delID"
          aria-describedby="delIDHelp"
          placeholder="Enter ID"
          onChange={(event) => {
            setOldAcadID(event.target.value);
          }}
        />
        <br />
        <br />
        <div>
          <input
            type="radio"
            id="delTA"
            name="type"
            value="true"
            onChange={(event) => {
              setIsOldTAbool(event.target.value);
            }}
          />
          <label for="TA">This academic member is a TA</label>
          <br />
          <input
            type="radio"
            id="isOldTA"
            name="type"
            value="false"
            onChange={(event) => {
              setIsOldTAbool(event.target.value);
            }}
          />
          <label for="notDelTA">This academic member is NOT a TA</label>
        </div>
        <br />
        <Form>
          <label for="newID">Enter New Academic Member ID</label> <br />
          <input
            type="text"
            class="newIDInput"
            id="newID"
            aria-describedby="newIDHelp"
            placeholder="Enter ID"
            onChange={(event) => {
              setAcadID(event.target.value);
            }}
          />
          <br />
          <br />
          <div>
            <input
              type="radio"
              id="newTA"
              name="type"
              value="true"
              onChange={(event) => {
                setIsTAbool(event.target.value);
              }}
            />
            <label for="TA">This academic member is a TA</label>
            <br />
            <input
              type="radio"
              id="isNewTA"
              name="type"
              value="false"
              onChange={(event) => {
                setIsTAbool(event.target.value);
              }}
            />
            <label for="notNewTA">This academic member is NOT a TA</label>
          </div>
          <br />
        </Form>
        <Form>
          <label for="facID">Faculty Name of That Course</label> <br />
          <input
            type="text"
            class="facID"
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
          <label for="courseCode">
            Enter the Code of The Course of The Slot
          </label>{" "}
          <br />
          <input
            type="text"
            class="courseCode"
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
        <Button onClick={sendReq}>Update Academic Member Assignment</Button>
      </Form>

      <p>{msg}</p>
    </div>
  );
}

export default UpdateAssignment;
