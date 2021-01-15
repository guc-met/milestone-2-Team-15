
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
   
    const [facname, setFacname] = useState();
    const [msg, setmsg]= useState([]);
    let response=[];

    const token =localStorage.getItem("token");
   const view = async (event) => {
          response = await axios( {method:'post',url:"http://localhost:3000/instructor_routes/viewCourseCoverage",
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
            let lol ="";
            if (typeof(request)==='string'){
              lol=request;
            }else if(request == "faculty not found"){
              lol="Faculty not found";
            }
            else{
              lol=request ? request.$numberDecimal: null
            }
            
            if(request){
              arr.push(
                <div>
                   {lol}
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
            <Button onClick={view}>View Coverage </Button>
            <h5>{msg}</h5>
        </Form>


    </div>
  );
}

export default ViewCoverageInstructor ;