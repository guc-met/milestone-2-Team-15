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
function DeleteMemberFromCourse(props) {
  const history = useHistory();

  const [deleteID, setDeleteID] = useState();
  const [isTAbool, setIsTAbool] = useState(false);
  //const [instid,setInstid] = useState();
  const [cc, setCc] = useState();
  const [msg, setmsg] = useState("");

  const token =localStorage.getItem("token");
    const sendReq = async (event) => {
           const response = await axios( {method:'post',url:`${process.env.REACT_APP_URL}/instructor_routes/deleteMemberFromCourse`,
           data:{
                id: deleteID,
                isTA: isTAbool,
                courseCode: cc,
           },  headers:{token:token}
         });
    setmsg((await response).data);
  };

  return (
    <div class="Hr-Buttons">
      <Form style={{ padding: "60px 0px 0px 260px" }}>
        <label for="delid">Enter Academic Member ID</label> <br />
        <input
          type="text"
          class="delIDInput"
          id="delID"
          aria-describedby="delIDHelp"
          placeholder="Enter ID"
          onChange={(event) => {
            setDeleteID(event.target.value);
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
              setIsTAbool(event.target.value);
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
              setIsTAbool(event.target.value);
            }}
          />
          <label for="notDelTA">This academic member is NOT a TA</label>
        </div>
        <br />
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
        <Button onClick={sendReq}>Remove Academic Member from Course</Button>
        <br />
        <p>{msg}</p>
      </Form>
    </div>
  );
}

export default DeleteMemberFromCourse;
