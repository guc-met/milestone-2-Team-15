import React from "react"
import Header from "../components/header"
import Sidebarhodhome from "../components/sidebarhodhome"
import MissingHours from "../components/MissingHours"
export default function ExtraHoursPage(props) {
  return (
    <div>
      <Header />
      <Sidebarhodhome />
      <MissingHours missing={12}/>
    </div>
  )
}