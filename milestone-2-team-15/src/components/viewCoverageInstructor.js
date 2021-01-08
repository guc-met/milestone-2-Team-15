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
function ViewCoverageInstructor(props) {

    const history = useHistory();
   
      
  return (

        <div >
        <Form style={{padding:"60px 0px 0px 250px"}}>
            <label for="facName">Faculty Name</label> <br/>
            <input type="text" class="facNameInput" id="facNameInputID" aria-describedby="facNameHwlp" placeholder="Enter your faculty name"/>
            
            <br/>
            <br/>
            <Button onClick={() => history.push("courseCoverage")}>View Coverage </Button>
        </Form>


    </div>
  );
}

export default ViewCoverageInstructor ;