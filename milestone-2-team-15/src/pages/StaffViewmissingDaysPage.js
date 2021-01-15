import React, { useState } from "react"
import StaffViewmissingDays from "../components/StaffViewmissingDays"
import "../stylesheets/viewStaffmissingDays.css"
import Header from "../components/header"
import Sidebarhodhome from "../components/sidebarhodhome"

export default function StaffViewAttendancePage(props) {
  return (
    <div>
      <div className="ViewStaffmissingDaysCard">
        <StaffViewmissingDays  />
      </div>
    </div>
  )
}
