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
        <Col><Form.Label className="LoginLabel">ID:{ID}</Form.Label></Col>
        <Col><Form.Label className="LoginLabel">Name:{Name}</Form.Label></Col>
        <Col> <Form.Label className="LoginLabel">Email:{Email}</Form.Label></Col>
      </Row>
      <Row>
        <Col> <Form.Label className="LoginLabel">DayOff:{DayOff}</Form.Label></Col>
        <Col> <Form.Label className="LoginLabel">Salary:{Salary} </Form.Label></Col>
        <Col> <Form.Label className="LoginLabel">Salary:{Salary} </Form.Label></Col>
      </Row>
    </Card>
  )
}
