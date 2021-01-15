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
function Sendrepreqtorep(props) {
  const [replacmentid, setreplacmentid] = useState();
  const [msg, setmsg] = useState("");

  const sendReq = async (event) => {
    console.log("ana da5alt");
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/ac_routes/SendReplacmentRequestToReplacment`,
      data: {
        rid: replacmentid,
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
        <Form.Label>replacment ID: </Form.Label>
        <Form.Control
          required
          type="text"
          onChange={(event) => {
            setreplacmentid(event.target.value);
          }}
          placeholder="example :ac-23 .."
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

export default Sendrepreqtorep;
