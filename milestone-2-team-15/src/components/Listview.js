import React, { useEffect, useState } from "react"

import { Table, Row, Col } from "react-bootstrap"
import Listvieww from "./Listvieww"
import "../stylesheets/listview.css"
export default function Listview(props) {
  const [Record, setRecord] = useState()
  useEffect(() => {
    setRecord(props.eachrecord)
  })
  return (
    <Table
      striped
      bordered
      hover
      variant="dark"
      responsive
      className="ListviewTable"
    >
      <thead>
        <tr className="rview">
          <th>Day</th>
          <th>Date</th>
          <th xs={2}>attended </th>
          <th xs={3}>signin hour:minute:secound</th>
          <th xs={3}>signout hour:minute:secound</th>
        </tr>
      </thead>
      {props.eachrecord.map((ea) => {
        return (
          <tbody>
            <Listvieww
              day={ea.day}
              date={ea.date}
              attended={ea.attnded}
              month={ea.month}
              year={ea.year}
              signinhour={ea.signin ? ea.signin.hours : null}
              signinminute={ea.signin ? ea.signin.minutes : null}
              signinsecounds={ea.signin ? ea.signin.secounds : null}
              signouthour={ea.signout ? ea.signout.hours : null}
              signoutminute={ea.signout ? ea.signout.minutes : null}
              signoutsecounds={ea.signout ? ea.signout.secounds : null}
            />
          </tbody>
        )
      })}
    </Table>
  )
}
