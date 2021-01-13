import React, { useEffect, useState } from "react"
import { Card, Row, Col,Table } from "react-bootstrap"
import "../stylesheets/listview.css"
export default function Listvieww(props) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const [Record, setRecord] = useState()
  useEffect(() => {
    setRecord(props.eachrecord)
  })
  return (
    <tr className="rview">
      <th>{days[props.day]}</th>
      <th>{props.date}</th>
      <th xs={2}>{props.attended ? "Yes" : "No"}</th>

      <th xs={3}>
        {props.signinhour ? props.signinhour + ":": props.signinhour  == 0? "00" + ":" : "No "}
        {props.signinminute ? props.signinminute + ":" :props.signinminute  == 0? 0  + ":" : "Signin "}
        {props.signinsecounds ? props.signinsecounds  : props.signinsecounds  == 0? 0:"Record"}
      </th>
      <th xs={3}>
        {props.signouthour ? props.signouthour + ":":props.signouthour==0 ? "00" + ":" : "No "}
        {props.signoutminute ? props.signoutminute + ":":props.signoutminute== 0? 0 + ":" : " Signout "}
        {props.signoutsecounds ? props.signoutsecounds  : props.signoutsecounds == 0? 0:"Record"}
      </th>
    </tr>
  )
}
