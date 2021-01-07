import React from "react"
import  HODProfile from "../../components/profile/HODProfile"
import Sidebarhodhome from "../../components/sidebarhodhome"
import Header from "../../components/header"
export default function HODProfilePage(props){
    return (
        <div>
            <Header/>
            <HODProfile ID="HOD-1" Name="Donia" Email="dondon@" Salary="100" DayOff="Saturday"/>
            <Sidebarhodhome/>
        </div>
    )
}