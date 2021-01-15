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
function ViewSchedule(props) {

    const history = useHistory();
    
    const [arr, setArr] = useState([]);
    // const [msg, setmsg]= useState([]);
    
    let response="";
   const token =localStorage.getItem("token");
   const view = async (event) => {
          response = await axios( {method:'post',url:`${process.env.REACT_APP_URL}/ac_routes/viewschedule`,
          data:{
          },  headers:{token:token}
        });

    if(response.length==0){
      return;
    }

    const lol=new Array();

     for(let i=0;i<response.data.length-1;i++){
       let day = response.data[i];
        

        lol[i]=new Array();
      for(let j=0; j<day.length; j++){
        let slot = day[j];
        let text = "";


        if(slot!=0){
          if(slot.kind ){
              
            text+="Kind: "+slot.kind+"\n";
          }
          if(slot.corseCode){
              
            text+="Course Code: "+slot.courseCode+"\n";
          }
          if(slot.location){
            text+="Location: "+slot.location+"\n";
          }
          lol[i][j]=text;
        }else{
          lol[i][j]="";
        }
    }
     }
    
     setArr(lol);
  }


  if(arr.length!=0){

  return (
    
    <div style={{padding:"3.9vw 0px 0px 25vw"}}>

        
        <Button align="center" 
            onClick={view}
            >Show Schedule </Button>
            <br/><br/>

        {
            <div>
      <table border="5" cellspacing="0" align="center"> 
        <caption>Timetable</caption>
        <tr> 
            <td align="center" height="50" 
                width="100"><br/> 
                <b>Day/Period</b><br/> 
            </td> 
            <td align="center" height="50" 
                width="100"> 
                <b>1st<br/>8:15-9:45</b> 
            </td> 
            <td align="center" height="50" 
                width="100"> 
                <b>2nd<br/>10:00-11:30</b> 
            </td> 
            <td align="center" height="50" 
                width="100"> 
                <b>3rd<br/>11:45-1:15</b> 
            </td> 
            <td align="center" height="50" 
                width="100"> 
                <b>4th<br/>1:45-3:15</b> 
            </td> 
            <td align="center" height="50" 
                width="100"> 
                <b>5th<br/>3:45-5:15</b> 
            </td> 
        </tr> 
        <tr> 
            <td align="center" height="50"> 
                <b>Saturday</b></td> 
            <td align="center" height="50"> {arr[0][0]}</td> 
            <td align="center" height="50"> {arr[0][1]}</td> 
            <td align="center" height="50"> {arr[0][2]}</td> 
            <td align="center" height="50"> {arr[0][3]}</td> 
            
            <td colspan="1" align="center" 
                height="50"> {arr[0][4]}</td> 
        </tr> 
        <tr> 
            <td align="center" height="50"> 
                <b>Sunday</b> 
            </td> 
            <td colspan="1" align="center" 
                height="50">    {arr[1][0]} 
            </td> 
            <td align="center" height="50"> {arr[1][1]}</td> 
            <td align="center" height="50"> {arr[1][2]}</td>
            <td align="center" height="50"> {arr[1][3]}</td>
            <td align="center" height="50"> {arr[1][4]}</td>
        </tr> 
        <tr> 
            <td align="center" height="50"> 
                <b>Monday</b> 
            </td> 
            <td align="center" height="50"> {arr[2][0]}</td> 
            <td align="center" height="50"> {arr[2][1]}</td> 
            <td align="center" height="50"> {arr[2][2]}</td> 
            <td align="center" height="50">{arr[2][3]}</td> 
            <td colspan="2" align="center" 
                height="50"> {arr[2][4]} 
            </td> 
        </tr> 
        <tr> 
            <td align="center" height="50"> 
                <b>Tuesday</b> 
            </td> 
            <td align="center" height="50"> {arr[3][0]}</td> 
            <td align="center" height="50"> {arr[3][1]}</td> 
            <td align="center" height="50"> {arr[3][2]}</td> 
            <td align="center" height="50"> {arr[3][3]}</td> 
            <td colspan="1" align="center" 
                height="50"> {arr[3][4]}
            </td> 
        </tr> 
        <tr> 
            <td align="center" height="50"> 
                <b>Wednesday</b> 
            </td> 

            <td colspan="1" align="center" 
                height="50"> {arr[4][0]} 
            </td> 
            <td align="center" height="50"> {arr[4][1]}</td> 
            <td align="center" height="50"> {arr[4][2]}</td> 
            <td align="center" height="50"> {arr[4][3]}</td> 
            <td align="center" height="50"> {arr[4][4]}</td> 
        </tr> 
        <tr> 
            <td align="center" height="50"> 
                <b>Saturday</b> 
            </td> 
            <td align="center" height="50"> {arr[5][0]}</td> 
            <td align="center" height="50"> {arr[5][1]}</td> 
            <td align="center" height="50"> {arr[5][2]}</td>
            <td align="center" height="50"> {arr[5][3]}</td> 
            <td colspan="1" align="center" 
                height="50"> {arr[5][4]} 
            </td> 
        </tr> 
    </table> 
        </div>}
    </div>
  );
}
    else{
        return(
            
            <div style={{padding:"3.9vw 0px 0px 25vw"}}>
                <Button align="center" 
                    onClick={view}
                    >Show Schedule </Button>
                    <br/><br/>

                {
                    <div>
            <table border="5" cellspacing="0" align="center"> 
                <caption>Timetable</caption>
                <tr> 
                    <td align="center" height="50" 
                        width="100"><br/> 
                        <b>Day/Period</b><br/> 
                    </td> 
                    <td align="center" height="50" 
                        width="100"> 
                        <b>1st<br/>8:15-9:45</b> 
                    </td> 
                    <td align="center" height="50" 
                        width="100"> 
                        <b>2nd<br/>10:00-11:30</b> 
                    </td> 
                    <td align="center" height="50" 
                        width="100"> 
                        <b>3rd<br/>11:45-1:15</b> 
                    </td> 
                    <td align="center" height="50" 
                        width="100"> 
                        <b>4th<br/>1:45-3:15</b> 
                    </td> 
                    <td align="center" height="50" 
                        width="100"> 
                        <b>5th<br/>3:45-5:15</b> 
                    </td> 
                </tr> 
                <tr> 
                    <td align="center" height="50"> 
                        <b>Saturday</b></td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td> 
                    
                    <td colspan="1" align="center" 
                        height="50"> </td> 
                </tr> 
                <tr> 
                    <td align="center" height="50"> 
                        <b>Sunday</b> 
                    </td> 
                    <td colspan="1" align="center" 
                        height="50">     
                    </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td>
                    <td align="center" height="50"> </td>
                    <td align="center" height="50"> </td>
                </tr> 
                <tr> 
                    <td align="center" height="50"> 
                        <b>Monday</b> 
                    </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"></td> 
                    <td colspan="2" align="center" 
                        height="50">
                    </td> 
                </tr> 
                <tr> 
                    <td align="center" height="50"> 
                        <b>Tuesday</b> 
                    </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td> 
                    <td colspan="1" align="center" 
                        height="50"> 
                    </td> 
                </tr> 
                <tr> 
                    <td align="center" height="50"> 
                        <b>Wednesday</b> 
                    </td> 

                    <td colspan="1" align="center" 
                        height="50">
                    </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td> 
                </tr> 
                <tr> 
                    <td align="center" height="50"> 
                        <b>Saturday</b> 
                    </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td> 
                    <td align="center" height="50"> </td>
                    <td align="center" height="50"> </td> 
                    <td colspan="1" align="center" 
                        height="50">
                    </td> 
                </tr> 
            </table> 
                </div>}
            </div>
        )
    }
}

export default ViewSchedule;