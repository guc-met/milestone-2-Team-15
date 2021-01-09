import React, { useState, useEffect } from "react"
import axios from "axios"
import { Col, Row, Form, Card } from "react-bootstrap"
import Listview from "./Listview"
import "../stylesheets/staffViewAttendance.css"
export default function StaffViewAttendance(props) {
  const [Data, setData] = useState([])
  useEffect(async () => {
    // await axios({
    //   method: "post",
    //   url: "http://localhost:3000/attendance/:month",
    //   params{
    //     month:
    //   }
    //   // headers:{
    //   //   token :token
    //   // }
    // }).then((res) => {
    //   console.log(res)
    //   setData(res.data)
    // })
    setData(props.data)
    console.log(Data)
  })

  return (
    <div className="ViewStaffAttendanceCard">
      <>
        {Data.map((eachrecord) => {
          if (eachrecord.attendance.length > 0)
            return <Listview eachrecord={eachrecord.attendance} />
        })}
      </>
    </div>
  )
}
