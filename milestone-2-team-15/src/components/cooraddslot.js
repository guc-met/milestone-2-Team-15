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

function Addslot(props) {
  const [slotkind, setslotkind] = useState();
  const [day, setday] = useState();
  const [time, settime] = useState();
  const [courseid, setcourseid] = useState();
  const [loc, setloc] = useState();
  const [faculty, setfaculty] = useState();
  const [dep, setdep] = useState();
  const [msg, setmsg] = useState();

  const add = async (event) => {
    console.log("ana da5alt");
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/courseCoordinator_routes/addslot`,
      data: {
        skind: slotkind,
        sday: day,
        stime: time,
        sc_id: courseid,
        sloc: loc,
        facid: faculty,
        depid: dep,
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
        <Form.Label> slot kind: </Form.Label>
        <Form.Control
          required
          type="text"
          onChange={(event) => {
            setslotkind(event.target.value);
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
        <Form.Label> time: </Form.Label>
        <Form.Control
          required
          type="email"
          onChange={(event) => {
            settime(event.target.value);
          }}
          placeholder="example :kefy kedda "
        />
      </Form.Group>
      <Form.Group class="HOD_input" controlId="formGridroomKind">
        <Form.Label> course id: </Form.Label>
        <Form.Control
          required
          type="email"
          onChange={(event) => {
            setcourseid(event.target.value);
          }}
          placeholder="example :kefy kedda "
        />
      </Form.Group>
      <Form.Group class="HOD_input" controlId="formGridroomKind">
        <Form.Label> location: </Form.Label>
        <Form.Control
          required
          type="email"
          onChange={(event) => {
            setloc(event.target.value);
          }}
          placeholder="example :kefy kedda "
        />
      </Form.Group>
      <Form.Group class="HOD_input" controlId="formGridroomKind">
        <Form.Label> faculty id: </Form.Label>
        <Form.Control
          required
          type="email"
          onChange={(event) => {
            setfaculty(event.target.value);
          }}
          placeholder="example :kefy kedda "
        />
      </Form.Group>
      <Form.Group class="HOD_input" controlId="formGridroomKind">
        <Form.Label> department id: </Form.Label>
        <Form.Control
          required
          type="email"
          onChange={(event) => {
            setdep(event.target.value);
          }}
          placeholder="example :kefy kedda "
        />
      </Form.Group>

      <Form.Group class="HOD_input" role="form">
        <Button
          // type="submit"
          class="glow-on-hover"
          onClick={add}
        >
          Add Slot
        </Button>
        <h3> {msg} </h3>
      </Form.Group>
    </div>
  );
}

export default Addslot;
