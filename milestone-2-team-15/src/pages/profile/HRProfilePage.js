import Reac, { useEffect, useState } from "react"
import HRProfile from "../../components/profile/HRProfile"
import Sidebar from "../../components/sideBar"
import Header from "../../components/header"
import axios from "axios"

export default function HRProfilePage(props) {
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
      <HRProfile
        ID="HR-1"
        Name="Donia"
        Email="dondon@"
        Salary="100"
        DayOff="Saturday"
      />
      <Sidebar />
    </div>
  )
}
