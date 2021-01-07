import React, { useState, useEffect } from "react"
import { Row, Col, Card, Form } from "react-bootstrap"
import "../../stylesheets/HODProfile.css"
import "bootstrap/dist/css/bootstrap.min.css"
export default function HODProfile(props) {
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
   
    <Card body className="HODProfileCardd">
      <Row >
        <Col>
          <Form.Label className="HODProfileLabel">ID : {ID}</Form.Label>
        </Col>
        <Col>
          <Form.Label className="HODProfileLabel">Name : {Name}</Form.Label>
        </Col>
        <Col>
          {" "}
          <Form.Label className="HODProfileLabel">Salary : {Salary} </Form.Label>
        </Col>
      </Row>
      
      <Row >
        <Col>
          <Form.Label className="HODProfileLabel">ID : {ID}</Form.Label>
        </Col>
        <Col>
          <Form.Label className="HODProfileLabel">Name : {Name}</Form.Label>
        </Col>
        <Col>
          {" "}
          <Form.Label className="HODProfileLabel">Salary : {Salary} </Form.Label>
        </Col>
      </Row>
      <Row >
        <Col>
          <Form.Label className="HODProfileLabel">ID : {ID}</Form.Label>
        </Col>
        <Col>
          <Form.Label className="HODProfileLabel">Name : {Name}</Form.Label>
        </Col>
        <Col>
          {" "}
          <Form.Label className="HODProfileLabel">Salary : {Salary} </Form.Label>
        </Col>
      </Row>
      
      <Row>
        <Col xs={8}>
          {" "}
          <Form.Label className="HODProfileLabel">Email : {Email}</Form.Label>
        </Col>
        <Col xs={4}>
          {" "}
          <Form.Label className="HODProfileLabel">DayOff : {DayOff}</Form.Label>
        </Col>
      </Row>
      
    </Card>
    
  )
}
