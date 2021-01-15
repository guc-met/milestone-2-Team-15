import React, { useState, useEffect } from "react"
import { Row, Col, Card, Form } from "react-bootstrap"
import "../../stylesheets/TAProfile.css"
import "bootstrap/dist/css/bootstrap.min.css"
import StaffeditProfile from "../StaffeditProfile"
export default function CoordinatorProfile(props) {
  const [ID, setId] = useState("")
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")

  const [Salary, setSalary] = useState("")
  const [NewSalary, setNewSalary] = useState()
  const [NewREAlSalary, setNewREALSalary] = useState()

  const [DayOff, setDayoff] = useState("")
  const [Department, setDepartment] = useState("")
  const [Faculty, setFaculty] = useState("")
  useEffect(() => {
    setId(props.ID)
    setName(props.Name)
    setEmail(props.Email)
    setSalary(props.Salary)
    setNewSalary(props.NewSalary)
    setNewREALSalary(props.NewREAlSalary)
    setDayoff(props.DayOff)
    setDepartment(props.Department)
    setFaculty(props.Faculty)
  })

  return (
    <div className= "ViewStaffAttendanceDiv">
      <StaffeditProfile type= "ta"/>
    <Card body className="TAProfileCardd">
      <Row>
        <Col>
          <Form.Label className="TAProfileLabel">ID : {ID}</Form.Label>
        </Col>
        <Col>
          <Form.Label className="TAProfileLabel">Name : {Name}</Form.Label>
        </Col>
        <Col>
          {" "}
          <Form.Label className="TAProfileLabel">Salary : {Salary} </Form.Label>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Label className="TAProfileLabel">
            Faculty : {Faculty}
          </Form.Label>
        </Col>
        <Col>
          <Form.Label className="TAProfileLabel">
            Department : {Department}
          </Form.Label>
        </Col>
      </Row>

      <Row>
        <Col xs={8}>
          {" "}
          <Form.Label className="TAProfileLabel">Email : {Email}</Form.Label>
        </Col>
        <Col xs={4}>
          {" "}
          <Form.Label className="TAProfileLabel">DayOff : {DayOff}</Form.Label>
        </Col>
      </Row>
    </Card>
    </div>
  )
}
