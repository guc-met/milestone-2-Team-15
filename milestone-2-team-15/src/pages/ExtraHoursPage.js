import React from "react"
import Header from "../components/header"
import Sidebarhodhome from "../components/sidebarhodhome"
import ExtraHours from "../components/ExtraHours"
export default function ExtraHoursPage(props) {
  return (
    <div>
      <Header />
      <Sidebarhodhome />
      <ExtraHours Extra={12}/>
    </div>
  )
}
