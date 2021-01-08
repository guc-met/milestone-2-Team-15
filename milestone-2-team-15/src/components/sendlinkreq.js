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
function SendLinkRequest(props) {
  const [coorid, setcoorid] = useState();
  const [slotnumber, setlotnumber] = useState();
  const [courseid, setcourseid] = useState();
  const [slotid, setslotid] = useState();
  const [id, setid] = useState();
  const [msg,setmsg]=useState("");
  
  const sendReq = async (event) => {
  
    console.log("ana da5alt")
    const response = await axios.post("http://localhost:3000/ac_routes/slotLinkingRequest", {
         coid:coorid,
         id:id,
         slotnumber:slotnumber,
         code:courseid,
        sid:slotid
    });
    console.log("ana tele3t");
    setmsg(response.data);
    console.log(msg);
  };
    return(
        <div class="HOD-sendreq">
    <Form.Group class="HOD_input" controlId="formGridroomKind">
    <Form.Label> ID: </Form.Label>
    <Form.Control
      required
      type="text"
      onChange={(event) => {
        setid(event.target.value);
      }}
      placeholder="example :ac-23 .."
    />
  </Form.Group>
    <Form.Group class="HOD_input" controlId="formGridroomKind">
    <Form.Label> coordinator ID: </Form.Label>
    <Form.Control
      required
      type="text"
      onChange={(event) => {
        setcoorid(event.target.value);
      }}
      placeholder="example :ac-23 .."
    />
  </Form.Group>
  <Form.Group class="HOD_input" controlId="formGridroomKind">
    <Form.Label> slot number: </Form.Label>
    <Form.Control
      required
      type="email"
      onChange={(event) => {
        setlotnumber(event.target.value);
      }}
      placeholder="example :1 .."
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
      placeholder="example :5fdf53bd878b5178e62bb4b1 "
    />
  </Form.Group>
  <Form.Group class="HOD_input" controlId="formGridroomKind">
    <Form.Label> slot id: </Form.Label>
    <Form.Control
      required
      type="email"
      onChange={(event) => {
        setslotid(event.target.value);
      }}
      placeholder="example : 5fe5ed28b621891d10667b8e"
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
          <h3 > { msg} </h3>
        </Form.Group>
  
  </div>
    )

  
}

export default SendLinkRequest ;