//  supermarket


import { Form, Row, Col, Card, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../stylesheets/sideBar.css"
import DayOffcomp from "./dayoffcomp";

let i=0;

export default function viewdayofftest(){
  let daysoff = [{name:"inst1", dayOff:"1"},{name:"inst2", dayOff:"2"},{name:"inst3", dayOff:"3"}];

  let Mydaysoff = [];
  for(let i=0; i<3; i++){
    Mydaysoff.push(<DayOffcomp name= {daysoff[i].name} dayOff= {daysoff[i].dayOff}/>)
  }
  
  return(
    <div>
    <p> staff daysoff: </p>
    {Mydaysoff}
    </div>
  )
}