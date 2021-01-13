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
  ToggleButton
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Plus } from "react-bootstrap-icons";

require("dotenv").config();
 function Viewlinkreq() {
    
    const history = useHistory();
    const arr=[];
    const[requestcards,setrequestcards]=useState();
    let response="";
   useEffect (() => {
    console.log("hi")
    async function acceptreq(reqid) {
        console.log("ana da5alt")
        
        response = await axios.post("http://localhost:3000/courseCoordinator_routes/acceptSlotLink", {
             id:"111",
             slinkid:reqid,
    
        });

        
    }
    async function rejectreq(reqid) {
        console.log("ana da5alt")
        
         response = await axios.post("http://localhost:3000/courseCoordinator_routes/rejectSlotLink", {
             id:"111",
             slinkid:reqid,
    
        });
        
    }
        

        
        async function view() {
           
         response = await axios.post( "http://localhost:3000/courseCoordinator_routes/viewSlotLinkingReq",{
             id:"111"
         });
    
       console.log(response);
         for(let i=0;i<response.data.length;i++){
           
            
                const request=response.data[i];
                    if(request.state=="pending")
                    arr.push(
                        <Col class="Location_Col">
                          <Card>
                            <Card.Body>
                              <Card.Title>
                                Slot Linking Request
                              </Card.Title>
                            </Card.Body>
                            <ListGroup variant="flush">
                            <ListGroup.Item>
                                {"Request Sender ID :" + request.academicID}
                              </ListGroup.Item>
                            <ListGroup.Item>
                                {"Request ID :" + request._id}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                {"Linked slot ID :" + request.slotid}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                {"State:" + request.state}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                {"Slot number:" +request.slot}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                {"courseID:" +request.coursecode}
                              </ListGroup.Item>
                            </ListGroup>
                            <Card.Body style={{ textAlign: "center" }}>
                              <Button onClick={()=>{acceptreq(request._id)}} class="Location__Button__delete">
                                <Icon.Check2Square />
                              </Button>
                              <Button onClick={()=>{rejectreq(request._id)}} class="Location__Button__delete">
                                <Icon.XSquare />
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                      else
                      arr.push(
                        <Col class="Location_Col">
                          <Card>
                            <Card.Body>
                              <Card.Title>
                              Slot Linking Request
                              </Card.Title>
                            </Card.Body>
                            <ListGroup variant="flush">
                            <ListGroup.Item>
                                {"Request ID :" + request._id}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                {"Linked slot ID :" + request.slotid}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                {"State:" + request.state}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                {"Slot number:" +request.slot}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                {"courseID:" +request.coursecode}
                              </ListGroup.Item>
                            </ListGroup>
                            <Card.Body style={{ textAlign: "center" }}>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                }
                

        setrequestcards(arr);
        }
        view();

    });

    return (
        <div class="viewreq ">
   
  
      <Row xs={1} sm={2} md={2} lg={2} xl={4} noGutter>
        {requestcards}
      </Row>
      </div>
      
    )
}
export default Viewlinkreq;


