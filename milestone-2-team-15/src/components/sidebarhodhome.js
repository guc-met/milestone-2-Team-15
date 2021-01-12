// import React,{useState} from 'react';
// import { Form, Row, Col, Card, Button } from "react-bootstrap"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "../stylesheets/sideBar.css"

// import DayOfftest from "./viewdayofftest.js";


// let toview="";
// //toview = (<DayOfftest/>)
// export default function SideBar(props) {
//     const [text,setText] = useState(toview);
//     const handleClickdayoff = function(){
//         toview = (<DayOfftest/>)
//         setText(toview);
//       }
//     return(
//     <div>
//         <div class="red">
//         <button onClick={handleClickdayoff}> View DayOff </button>
//         <a href="#">Manage Requests</a> 
//         <a href="#">View Coverage</a> 
//         </div>

//         <div class="yellow"> 
//         <a href="#">View Teaching Assignments </a> 
//         </div>

//         <div class="sidenav">
//             <a href="#">Manage Courses</a>
//             <a href="#">View Staff</a>
//             <a href="#">View DayOff </a>
//             <a href="#">View Requests</a>    
//         </div>

//         <div>
//             <h1 class="center"> you wanted to view: {text} </h1>
//         </div>
        

 
//     </div>
// )
// }