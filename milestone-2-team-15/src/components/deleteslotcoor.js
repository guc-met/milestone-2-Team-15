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

function DeleteSlot(props) {
  const [slotid, setslotid] = useState();
  const [msg, setmsg] = useState();

  const del = async (event) => {
    console.log("ana da5alt");
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/courseCoordinator_routes/deleteslot`,
      data: {
        sid: slotid,
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
        <Form.Label> Slot ID: </Form.Label>
        <Form.Control
          required
          type="text"
          onChange={(event) => {
            setslotid(event.target.value);
          }}
          placeholder="example :ac-23 .."
        />
      </Form.Group>
      <Form.Group class="HOD_input" role="form">
        <Button
          // type="submit"
          class="glow-on-hover"
          onClick={del}
        >
          Delete Slot
        </Button>
        <h3> {msg} </h3>
      </Form.Group>
    </div>
  );
}

export default DeleteSlot;
