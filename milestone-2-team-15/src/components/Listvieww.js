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
        {props.signinhour ? props.signinhour + ":" : "No "}
        {props.signinminute ? props.signinminute + ":" : "Signin "}
        {props.signinsecounds ? props.signinsecounds  : props.signinsecounds  ==0? 0:"Record"}
      </th>
      <th xs={3}>
        {props.signouthour ? props.signouthour + ":" : "No "}
        {props.signoutminute ? props.signoutminute + ":" : " Signout "}
        {props.signoutsecounds ? props.signoutsecounds  : props.signoutsecounds ==0? 0:"Record"}
      </th>
    </tr>
  )
}
