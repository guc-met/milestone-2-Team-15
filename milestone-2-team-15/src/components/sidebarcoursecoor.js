import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../stylesheets/sideBar.css"
import DropDown from "./dropDown"
export default function sideBar(props) {
    return(<div>
    <div>
        <div class="red">
        <a href="/coordinator/viewrecievedlinkslotreqs">View Recieved Linking Slot Requests</a> <br/>
        <a href="/coordinator/deleteslot">Delete slot</a> <br/>
        </div>
        <div class="yellow"> 
        
        
        </div>
    <div class="sidenav">
    <a href="/coordinator/sendReq">Send Requests</a> <br/>
    <a href="/coordinator/viewrequest">View Requests</a> <br/>
    <a href="/coordinator/addslot">Add slot</a> <br/>
    
    <a href="#">View Schedule</a> <br/>
    
        
        
    </div>
 
    </div>
    <DropDown type="coordinator"/>
    </div>
)
}