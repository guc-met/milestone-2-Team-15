import React, { useState, useEffect } from "react";
import axios from "axios";


import "bootstrap/dist/css/bootstrap.min.css"


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
function SendChangeDayOffRequest(props) {
  const [hod, sethod] = useState();
  const [day, setday] = useState();
  const [cmnt, setcmnt] = useState();
  const [id, setid] = useState();
  const[msg,setmsg]=useState();
  
  
  const sendReq = async (event) => {
  
    console.log("ana da5alt")
    const response = await axios.post("http://localhost:3000/ac_routes/changedayreq", {
        id:id,
        hid:hod,
        d:day,
        comment:cmnt
    });
    console.log("ana tele3t");
    setmsg(response.data);
    console.log(msg);
  };
    return(
        <div class="HOD-sendreq" style={{padding:"60px 0px 0px 140px"}}>
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
          <h3 > { msg} </h3>
        </Form.Group>
  
  </div>
    )

  
}

export default SendChangeDayOffRequest ;