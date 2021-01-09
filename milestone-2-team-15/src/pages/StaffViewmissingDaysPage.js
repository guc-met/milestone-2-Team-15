import React, { useState } from "react"
import StaffViewmissingDays from "../components/StaffViewmissingDays"
import "../stylesheets/viewStaffmissingDays.css"
export default function StaffViewAttendancePage(props) {
  const [Arr, setArr] = useState([
    "2020-12-13",
    "2020-12-14",
    "2020-12-15",
    "2020-12-16",
    "2020-12-17",
    "2020-12-20",
    "2020-12-21",
    "2020-12-22",
    "2020-12-23",
  ])

  return (
    <div className="ViewStaffmissingDaysCard">
      <StaffViewmissingDays data={Arr} />
    </div>
  )
}
