import React, { useState, useEffect } from "react"
import { Row, Col, Card, Form } from "react-bootstrap"
import "../../stylesheets/HODProfile.css"
import "bootstrap/dist/css/bootstrap.min.css"
import StaffeditProfile from "../StaffeditProfilebutton"

export default function HODProfile(props) {
  const [ID, setId] = useState("")
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Salary, setSalary] = useState("")
  const [DayOff, setDayoff] = useState("")
  const [Department, setDepartment] = useState("")
  const [Faculty, setFaculty] = useState("")
  const[Location,setLocation]=useState("")
  const[Gender,setGender]=useState("")

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

  <div className="HODPCard" >
      <div className="ViewStaffAttendanceDiv">
     <StaffeditProfile type="hod"/>
     </div>
    <Card body className="HODProfileCardd">
      <Row>
        <Col xs={4}>
          <Form.Label className="HODProfileLabel">ID : {ID}</Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Label className="HODProfileLabel">Name : {Name}</Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Label className="HODProfileLabel">Salary : {Salary}</Form.Label>
        </Col>
      </Row>

      <Row>
        <Col xs={8}>
          <Form.Label className="HODProfileLabel">Faculty : {Faculty}
          </Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Label className="HODProfileLabel">Department : {Department}
          </Form.Label>
        </Col>
        
      </Row>

      <Row>
        <Col xs={8} >
          <Form.Label className="HODProfileLabel">Email : {Email}</Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Label className="HODProfileLabel">DayOff : {DayOff}</Form.Label>
        </Col>
       
      </Row>
      <Row>
      <Col xs={8} >
        
        <Form.Label className="HRProfileLabel">Gender : {Gender}</Form.Label>
      </Col>
      <Col xs={4}>
      
          <Form.Label className="TAProfileLabel">Office : {Location}
          </Form.Label>
        </Col>
      </Row>
    </Card>
    </div>
  )
}
