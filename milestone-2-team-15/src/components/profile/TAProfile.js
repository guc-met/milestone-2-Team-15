import React, { useState, useEffect } from "react"
import { Row, Col, Card, Form } from "react-bootstrap"
import "../../stylesheets/TAProfile.css"
import "bootstrap/dist/css/bootstrap.min.css"
import StaffeditProfile from "../StaffeditProfilebutton"
export default function TAProfile(props) {
  const [ID, setId] = useState("")
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")

  const [Salary, setSalary] = useState("")
  const [NewSalary, setNewSalary] = useState()
  const [NewREAlSalary, setNewREALSalary] = useState()
const [Gender,setGender]=useState("")
  const [DayOff, setDayoff] = useState("")
  const [Department, setDepartment] = useState("")
  const [Faculty, setFaculty] = useState("")
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
    
    <div className="TACard">
      <div className= "ViewStaffAttendanceDiv"> 
       <StaffeditProfile type= "ta"/></div>
     
       <Card body className="TAProfileCardd">
      <Row>
        <Col xs={4}>
          <Form.Label className="TAProfileLabel">ID : {ID}</Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Label className="TAProfileLabel">Name : {Name}</Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Label className="TAProfileLabel">Salary : {Salary} </Form.Label>
        </Col>
      </Row>

      <Row>
        <Col xs={8}>
          <Form.Label className="TAProfileLabel">Faculty : {Faculty}
          </Form.Label>
        </Col>
        <Col xs={4}>
          <Form.Label className="TAProfileLabel">Department : {Department}
        
          </Form.Label>
        </Col>
        
      </Row>

      <Row>
        <Col xs={8}>
         
          <Form.Label className="TAProfileLabel">Email : {Email}</Form.Label>
        </Col>
        <Col xs={4} >
        
          <Form.Label className="TAProfileLabel">DayOff : {DayOff}</Form.Label>
        </Col>
        
      </Row>
      <Row>
      <Col xs={8}>  
        <Form.Label className="TAProfileLabel">Gender : {Gender}</Form.Label>
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
