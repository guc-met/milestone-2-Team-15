import React, { useState, useEffect } from "react"
import { Row, Col, Card, Form } from "react-bootstrap"
import "../../stylesheets/HRProfile.css"
import "bootstrap/dist/css/bootstrap.min.css"
import StaffeditProfile from "../StaffeditProfilebutton"
export default function HRProfile(props) {
  const [ID, setId] = useState("")
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Salary, setSalary] = useState("")
  const [DayOff, setDayoff] = useState("")
  const[Gender,setGender]=useState("")
  const[Location,setLocation]=useState("")

  useEffect(() => {
    setId(props.ID)
    setName(props.Name)
    setEmail(props.Email)
    setSalary(props.Salary)
    setDayoff(props.DayOff)
    setGender(props.Gender)
    setLocation(props.Location)
  })

  return (
   <div className="HRCard" >
     <div className="ViewStaffAttendanceDiv">
     <StaffeditProfile type="HR"/>
     </div>
    <Card body className="HRProfileCardd">
      <Row >
        <Col xs={4}>
          <Form.Label className="HRProfileLabel">ID : {ID}</Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Label className="HRProfileLabel">Name : {Name}</Form.Label>
        </Col>
        <Col xs={4}>
         
          <Form.Label className="HRProfileLabel">Salary : {Salary} </Form.Label>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
         
          <Form.Label className="HRProfileLabel">Email : {Email}</Form.Label>
        </Col>
        <Col xs={4} >
        
          <Form.Label className="HRProfileLabel">DayOff : {DayOff}</Form.Label>
        </Col>
        
      </Row>
      <Row>
      <Col xs={8}>
        
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
