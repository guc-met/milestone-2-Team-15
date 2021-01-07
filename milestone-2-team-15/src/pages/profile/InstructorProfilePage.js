import React from "react"
import InstructorProfile from "../../components/profile/InstructorProfile"
import Sidebar from "../../components/sideBar"
import Header from "../../components/header"
export default function InstructorProfilePage(props){
    return (
        <div>
            <Header/>
            <InstructorProfile ID="Instructor-1" Name="Donia" Email="dondon@" Salary="100" DayOff="Saturday"/>
            <Sidebar/>
        </div>
    )
}