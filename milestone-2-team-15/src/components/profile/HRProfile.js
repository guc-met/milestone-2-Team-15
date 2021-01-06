import React, { useState, useEffect } from "react"
import { Row, Col, Card, Form } from "react-bootstrap"
import "../../stylesheets/HRProfile.css"
import "bootstrap/dist/css/bootstrap.min.css"
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
    <Card body className="HRCard">
      <Row>
        <Col>
          <Form.Label className="LoginLabell">ID : {ID}</Form.Label>
        </Col>
        <Col>
          <Form.Label className="LoginLabell">Name : {Name}</Form.Label>
        </Col>
        <Col>
          {" "}
          <Form.Label className="LoginLabell">Salary : {Salary} </Form.Label>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          {" "}
          <Form.Label className="LoginLabell">Email : {Email}</Form.Label>
        </Col>
        <Col xs={4}>
          {" "}
          <Form.Label className="LoginLabell">DayOff : {DayOff}</Form.Label>
        </Col>
      </Row>
    </Card>
  )
}
