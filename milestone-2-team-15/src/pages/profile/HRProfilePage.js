import React from "react"
import HRProfile from "../../components/profile/HRProfile"
import Sidebar from "../../components/sideBar"
import Header from "../../components/header"
export default function HRProfilePage(props){
    return (
        <div>
            <Header/>
            <HRProfile ID="HR-1" Name="Donia" Email="dondon@" Salary="100" DayOff="Saturday"/>
            <Sidebar/>
        </div>
    )
}