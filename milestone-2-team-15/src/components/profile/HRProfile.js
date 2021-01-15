import React, { useState, useEffect } from "react"
import { Row, Col, Card, Form } from "react-bootstrap"
import "../../stylesheets/HRProfile.css"
import "bootstrap/dist/css/bootstrap.min.css"
import StaffeditProfile from "../StaffeditProfile"
export default function HRProfile(props) {
  const [ID, setId] = useState("")
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Salary, setSalary] = useState("")
  const [DayOff, setDayoff] = useState("")
  useEffect(() => {
    setId(props.ID)
    setName(props.Name)
    setEmail(props.Email)
    setSalary(props.Salary)
    setDayoff(props.DayOff)
  })

  return (
   <div className="ViewStaffAttendanceDiv">
     <StaffeditProfile type="HR"/>
    <Card body className="HRProfileCardd">
      <Row >
        <Col>
          <Form.Label className="HRProfileLabel">ID : {ID}</Form.Label>
        </Col>
        <Col>
          <Form.Label className="HRProfileLabel">Name : {Name}</Form.Label>
        </Col>
        <Col>
          {" "}
          <Form.Label className="HRProfileLabel">Salary : {Salary} </Form.Label>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          {" "}
          <Form.Label className="HRProfileLabel">Email : {Email}</Form.Label>
        </Col>
        <Col xs={4}>
          {" "}
          <Form.Label className="HRProfileLabel">DayOff : {DayOff}</Form.Label>
        </Col>
      </Row>
      
    </Card>
    </div>
    
  )
}
