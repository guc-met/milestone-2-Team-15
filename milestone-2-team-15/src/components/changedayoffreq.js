import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

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
const token = localStorage.getItem("token");
function SendChangeDayOffRequest(props) {
  const [hod, sethod] = useState();
  const [day, setday] = useState();
  const [cmnt, setcmnt] = useState();
  const [msg, setmsg] = useState();

  const sendReq = async (event) => {
    console.log("ana da5alt");
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/ac_routes/changedayreq`,
      data: {
        hid: hod,
        d: day,
        comment: cmnt,
      },
      headers: { token: token },
    });
    console.log("ana tele3t");
    setmsg(response.data);
    console.log(msg);
  };
  return (
    <div class="HOD-sendreq">
      <Form.Group class="HOD_input" controlId="formGridroomKind">
        <Form.Label> HOD ID: </Form.Label>
        <Form.Control
          required
          type="text"
          onChange={(event) => {
            sethod(event.target.value);
          }}
          placeholder="example :ac-23 .."
        />
      </Form.Group>
      <Form.Group class="HOD_input" controlId="formGridroomKind">
        <Form.Label> day: </Form.Label>
        <Form.Control
          required
          type="email"
          onChange={(event) => {
            setday(event.target.value);
          }}
          placeholder="example :1 .."
        />
      </Form.Group>
      <Form.Group class="HOD_input" controlId="formGridroomKind">
        <Form.Label> comment: </Form.Label>
        <Form.Control
          required
          type="email"
          onChange={(event) => {
            setcmnt(event.target.value);
          }}
          placeholder="example :kefy kedda "
        />
      </Form.Group>

      <Form.Group class="HOD_input" role="form">
        <Button
          // type="submit"
          class="glow-on-hover"
          onClick={sendReq}
        >
          send request
        </Button>
        <h3> {msg} </h3>
      </Form.Group>
    </div>
  );
}

export default SendChangeDayOffRequest;
