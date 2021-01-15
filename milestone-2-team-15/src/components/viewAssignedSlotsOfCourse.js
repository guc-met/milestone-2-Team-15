import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  ListGroup,
  Modal,
  Form,
  Button,
  Card,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Dropdown
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Plus } from "react-bootstrap-icons";
require("dotenv").config();

function ViewAssignedSlots(props) {

const history = useHistory();
   
const [facname, setFacname] = useState();
const [msg, setmsg]= useState([]);
let response=[];

/*const view = async (event) => {
      response = await axios.post( "http://localhost:3000/instructor_routes/viewAssignedSlotOfCourse",
      {
        id:"16",
        facName:facname
      });
*/
      

    
        const token =localStorage.getItem("token");
        const view = async (event) => {
               response = await axios( {method:'post',url:"http://localhost:3000/instructor_routes/viewAssignedSlotOfCourse",
               data:{
                 facName:facname
               },  headers:{token:token}
             });
     
     




if(response.length==0){
  return;
}

  const arr=[];
 for(let i=0;i<response.data.length;i++){
     
        const request=response.data[i];

        console.log(request);
        
        if(request){
          arr.push(
            <div>
              <br/>
              <p><h4>Course Name: </h4>{request.courseName} <br/><br/>
                <h4>Kind: </h4>{request.kind} <br/><br/>
                <h4>Timing: </h4>{request.timing} <br/><br/>
                <h4>Course Code: </h4>{request.courseCode} <br/><br/>
                <h4>Location: </h4>{request.location} <br/><br/>
                <br/><br/><br/>
                <style >
                  </style>

                  <div class="vl"></div>
                </p>
              </div>
            )
          }
        }
setmsg(arr);
//setChosenFac("Media Engineeeering and Technology");
}
  
return (

    <div >
    <Form style={{padding:"60px 0px 0px 250px"}}>
    <label for="facName">Faculty Name</label> <br/>
    <input type="text" class="facNameInput" id="facNameInputID" aria-describedby="facNameHlp" placeholder="Enter your faculty name"
    onChange={(event) => {setFacname(event.target.value)}}/>
        
        <br/>
        <br/>
        <Button onClick={view}>View Assigned Slots </Button>
        <h5>{msg}</h5>
    </Form>
</div>
);
}

export default ViewAssignedSlots ;