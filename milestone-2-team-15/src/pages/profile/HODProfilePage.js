import React, { useEffect, useState } from "react"
import HODProfile from "../../components/profile/HODProfile"
import Sidebarhodhome from "../../components/sidebarhodhome"
import Header from "../../components/header"
import axios from "axios"

export default function HODProfilePage(props) {
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
      <HODProfile
        ID="HOD-1"
        Name="Donia"
        Email="dondon@"
        Salary="100"
        DayOff="Saturday"
      />
      <Sidebarhodhome />
    </div>
  )
}
