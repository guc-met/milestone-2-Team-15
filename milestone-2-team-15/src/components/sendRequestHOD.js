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
function SendRequestHOD(props) {

    const history = useHistory();
   
      
  return (
    <div class="HOD-sendreq">
      <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          id="dropdown-basic"
          class="HOD-sendreq"
        >
          Request Type
        </Dropdown.Toggle>

        <Dropdown.Menu><Button onClick={() => history.push("sendlinkReq")}>Linking Request</Button></Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default SendRequestHOD ;