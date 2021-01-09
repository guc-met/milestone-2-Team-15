import React, { useState, useEffect } from "react"
import axios from "axios"
import { Col, Row, Form, Card } from "react-bootstrap"
import Listview from "./Listview"
import "../stylesheets/staffViewAttendance.css"
export default function StaffViewAttendance(props) {
  const [Data, setData] = useState([])
  const [month,setMonth]=useState()
  useEffect(async () => {
    setData(props.data)
    setMonth(props.month)
    // await axios({
    //   method: "post",
    //   url: "http://localhost:3000/attendance/:month",
    //   params{
    //     month:props.month
    //   }
    //   // headers:{
    //   //   token :token
    //   // }
    // }).then((res) => {
    //   console.log(res)
    //   setData(res.data)
    // })
    
    console.log(Data)
    console.log(month)
  },[props.month])

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
