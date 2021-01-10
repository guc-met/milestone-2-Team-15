import React, { useEffect, useState } from "react"
import InstructorProfile from "../../components/profile/InstructorProfile"
import Sidebar from "../../components/sideBar"
import Header from "../../components/header"
import axios from "axios"
export default function InstructorProfilePage(props) {
  // const token = localStorage.getItem("token")
  // useEffect(async () => {
  //   await axios({
  //     method: "get",
  //     url: "http://localhost:3000/extrahours",
  //     headers: {
  //       token: token,
  //     },
  //   }).then((res) => {
  //     console.log(res.data)
  //   })
  // })
  return (
    <div>
      <Header />
      <InstructorProfile
        ID="Instructor-1"
        Name="Donia"
        Email="dondon@"
        Salary="100"
        DayOff="Saturday"
      />
      <Sidebar />
    </div>
  )
}
