// import React,{useState} from 'react';
// import { Form, Row, Col, Card, Button } from "react-bootstrap"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "../stylesheets/sideBar.css"
import DropDown from "./dropDown"

export default function sideBar(props) {
    return(
        <div>
        <DropDown type="hod"/>
    <div>
        <div className="red">
        <a href="#">View Requests</a> <br/>
        <a href="#">Manage Requests</a> <br/>
        <a href="#">View Coverage</a> <br/>
        </div>
        <div className="yellow"> 
        <a href="#">View Teaching Assignments </a> <br/>
        
        </div>
    <div className="sidenav">
        <a href="#">Manage Courses</a>
        <a href="#">View Staff</a>
        <a href="#">View DayOff </a>
        <a href="/HOD/sendReq">Send Requests </a>
        <a href="/HOD/viewrequest">View Requests</a> <br/>
        <a href="#">View Schedule</a> <br/>
        
        

 
     </div>
     </div>
     </div>
 )
 }