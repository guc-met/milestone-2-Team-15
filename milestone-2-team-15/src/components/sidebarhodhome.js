// import React,{useState} from 'react';
// import { Form, Row, Col, Card, Button } from "react-bootstrap"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "../stylesheets/sideBar.css"

export default function sideBar(props) {
    return(
    <div>
        <div class="red">
        <a href="#">View Requests</a> <br/>
        <a href="#">Manage Requests</a> <br/>
        <a href="#">View Coverage</a> <br/>
        </div>
        <div class="yellow"> 
        <a href="#">View Teaching Assignments </a> <br/>
        
        </div>
    <div class="sidenav">
        <a href="#">Manage Courses</a>
        <a href="#">View Staff</a>
        <a href="#">View DayOff </a>
        <a href="/HOD/sendReq">Send Requests </a>
        <a href="/HOD/viewrequest">View Requests</a> <br/>
        <a href="#">View Schedule</a> <br/>
        
        

 
     </div>
     </div>
 )
 }