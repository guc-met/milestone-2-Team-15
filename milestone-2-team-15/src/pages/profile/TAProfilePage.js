import React from "react"
import TAProfile from "../../components/profile/TAProfile"
import Sidebar from "../../components/sideBar"
import Header from "../../components/header"
export default function TAProfilePage(props){
    return (
        <div>
            <Header/>
            <TAProfile ID="TA-1" Name="Donia" Email="dondon@" Salary="100" DayOff="Saturday"/>
            <Sidebar/>
        </div>
    )
}