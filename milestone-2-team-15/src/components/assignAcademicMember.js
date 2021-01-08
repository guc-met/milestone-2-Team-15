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
function AssignAcademicMember(props) {

    const history = useHistory();
   
      
  return (

        <div >
        <Form style={{padding:"60px 0px 0px 250px"}}>
            <label for="newACid">Enter to-be-assigned Academic member ID</label> <br/>
            <input type="text" class="facNameInput" id="newACid" aria-describedby="newACidHelp" placeholder="Enter ID"/>

            <br/>
            
            <br/>


            <div>
                <input type="radio" id="TA" name="type" value="TA"/>
                <label for="TA">This academic member is a TA</label><br/>
                <input type="radio" id="notTA" name="type" value="notTA"/>
                <label for="notTA">This academic member is NOT a TA</label>
            </div>

            <br/>

            <Form>
                <label for="facID">Faculty ID of That Course</label> <br/>
                <input type="text" class="facID" id="facIDInputID" aria-describedby="facIDHelp" placeholder="Enter your faculty name"/>
                
            </Form>
            <br/>
            <Form>
                <label for="courseCode">Enter the Code of The Course of The Slot</label> <br/>
                <input type="text" class="courseCode" id="courseCode" aria-describedby="courseCodeHelp" placeholder="Enter Course Code"/>

            </Form>

            <br/>
            <br/>
            <Button onClick={() => history.push("assignAcademicMember")}>Assign Academic Member </Button>
        </Form>


    </div>
  );
}

export default AssignAcademicMember ;