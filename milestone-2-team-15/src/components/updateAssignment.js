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
function UpdateAssignment(props) {

    const history = useHistory();
   
      
  return (

        <div >
        <Form style={{padding:"60px 0px 0px 250px"}}>
            <label for="delID">Enter Old Academic Member ID</label> <br/>
            <input type="text" class="delIDInput" id="delID" aria-describedby="delIDHelp" placeholder="Enter ID"/>

            <br/>
            <br/>

            <div>
                <input type="radio" id="delTA" name="type" value="isOldTA"/>
                <label for="TA">This academic member is a TA</label><br/>
                <input type="radio" id="isOldTA" name="type" value="notisOldTA"/>
                <label for="notDelTA">This academic member is NOT a TA</label>
            </div>

            <br/>

            <Form>
            <label for="newID">Enter New Academic Member ID</label> <br/>
            <input type="text" class="newIDInput" id="newID" aria-describedby="newIDHelp" placeholder="Enter ID"/>

            <br/>
            <br/>

            <div>
                <input type="radio" id="newTA" name="type" value="isNewTA"/>
                <label for="TA">This academic member is a TA</label><br/>
                <input type="radio" id="isNewTA" name="type" value="notisNewTA"/>
                <label for="notNewTA">This academic member is NOT a TA</label>
            </div>

            <br/>
            </Form>

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
            <Button onClick={() => history.push("updateAssignment")}>Update Academic Member Assignment</Button>
        </Form>


    </div>
  );
}

export default UpdateAssignment ;