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
function AssignCoordinator(props) {



  return (

        <div >
        <Form style={{padding:"60px 0px 0px 250px"}}>
            <label for="TAid">Enter TA ID</label> <br/>
            <input type="text" class="TAid" id="TAid" aria-describedby="TAidHelp" placeholder="Enter ID"/>

            <br/>
            <br/>

            <Form>
                <label for="facID">Faculty ID of That Course</label> <br/>
                <input type="text" class="facID" id="facIDInputID" aria-describedby="facIDHelp" placeholder="Enter your faculty name"/>
                
            </Form>
            <br/>
            <Form>
                <label for="courseID">Enter the ID of The Course of The Slot</label> <br/>
                <input type="text" class="courseID" id="courseIDid" aria-describedby="courseCodeHelp" placeholder="Enter Course Code"/>

            </Form>
            <br/>
            <br/>
            <Button>Assign Coorditor</Button>
        </Form>


    </div>
  );
}

export default AssignCoordinator ;