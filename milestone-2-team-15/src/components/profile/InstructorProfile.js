import React, { useState, useEffect } from "react"
import { Row, Col, Card, Form } from "react-bootstrap"
import "../../stylesheets/InstructorProfile.css"
import "bootstrap/dist/css/bootstrap.min.css"
import StaffeditProfile from "../StaffeditProfilebutton"
export default function InstructorProfile(props) {
  const [ID, setId] = useState("")
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")

  const [Salary, setSalary] = useState("")
  const [NewSalary, setNewSalary] = useState()
  const [NewREAlSalary, setNewREALSalary] = useState()
  const [DayOff, setDayoff] = useState("")
  const [Department, setDepartment] = useState("")
  const [Faculty, setFaculty] = useState("")
  const[Gender,setGender]=useState("")
  const[Location,setLocation]=useState("")

  useEffect(() => {
    setId(props.ID)
    setName(props.Name)
    setEmail(props.Email)
    setSalary(props.Salary)
    setDayoff(props.DayOff)
    setDepartment(props.Department)
    setFaculty(props.Faculty)
    setGender(props.Gender)
    setLocation(props.Location)
  })

  return (
    <div className= "InstpCard">
      <div className= "ViewStaffAttendanceDiv">
      <StaffeditProfile type= "Instructor"/>
      </div>
    <Card body className="InstructorProfileCard">
      <Row>
        <Col xs={4}>
          <Form.Label className="InstructorProfileLabel">ID : {ID}</Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Label className="InstructorProfileLabel">Name : {Name}
          </Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Label className="InstructorProfileLabel">Salary : {Salary}
          </Form.Label>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Form.Label className="InstructorProfileLabel">Faculty : {Faculty}
          </Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Label className="InstructorProfileLabel">Department : {Department}
          </Form.Label>
        </Col>
       
      </Row>
      <Row>
        <Col  xs={8}>
          <Form.Label className="InstructorProfileLabel">Email : {Email}
          </Form.Label>
        </Col>
        <Col xs={4} >
          <Form.Label className="InstructorProfileLabel">DayOff : {DayOff}
          </Form.Label>
        </Col>
        
      </Row>
      <Row>
      <Col  xs={8}>
          <Form.Label className="InstructorProfileLabel">Gender : {Gender}
          </Form.Label>
        </Col>
      <Col  xs={4}>
          <Form.Label className="TAProfileLabel">Office : {Location}
          </Form.Label>
        </Col>
      </Row>
    </Card>
    </div>
  )
}
