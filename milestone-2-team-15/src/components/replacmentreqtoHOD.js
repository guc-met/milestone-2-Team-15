import React, { useState, useEffect } from "react";
import axios from "axios";

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
function SendrepreqtoHOD(props) {
  const [hodid, sethodid] = useState();
  const [leaveid, setleaveid] = useState();
  const [msg, setmsg] = useState("");

  const sendReq = async (event) => {
    console.log("ana da5alt");
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/ac_routes/SendReplacmentRequestToHod`,
      data: {
        hid: hodid,
        lid: leaveid,
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
        <Form.Label>HOD ID: </Form.Label>
        <Form.Control
          required
          type="text"
          onChange={(event) => {
            sethodid(event.target.value);
          }}
          placeholder="example :ac-23 .."
        />
      </Form.Group>
      <Form.Group class="HOD_input" controlId="formGridroomKind">
        <Form.Label>leave ID: </Form.Label>
        <Form.Control
          required
          type="text"
          onChange={(event) => {
            setleaveid(event.target.value);
          }}
          placeholder="example :5ff7d0c7061ad35a44e07dff"
        />
      </Form.Group>

      <Form.Group class="HOD_input" role="form">
        <Button
          // type="submit"
          class="glow-on-hover"
          onClick={sendReq}
          style={{ float: "right" }}
          variant="primary"
        >
          send request
        </Button>
        <h3> {msg} </h3>
      </Form.Group>
    </div>
  );
}

export default SendrepreqtoHOD;
