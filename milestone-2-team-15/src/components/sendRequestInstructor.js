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
function SendRequestInstructor(props) {

    const history = useHistory();
   
      
  return (
    <div class="HOD-sendreq" style={{padding:"3.9vw 0px 0px 8.5vw"}}>
      <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          id="dropdown-basic"
          class="HOD-sendreq"
        >
          Request Type
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Button  onClick={() => history.push("sendlinkReq")}>Linking Request</Button>
        <br/>
        <Button  onClick={() => history.push("changedayoff")}>change day off request</Button>
        <br/>
        <Button onClick={() => history.push("replacementrequest")}>replacment request to a collegue</Button>
        <br/>
        <Button  onClick={() => history.push("replacementrequestHOD")}>replacment request to the HOD</Button>
        <br/>
        <Button  onClick={() => history.push("leaverequest")}>leave Request</Button>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default SendRequestInstructor ;