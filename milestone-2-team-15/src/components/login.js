import React from "react"
import { Form, Row, Col, Card, Button } from "react-bootstrap"
import Logo from "../images/Guc.png"
import "../stylesheets/login.css"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Login(props) {
  return (
    <div className="login">
      <Row className="LoginImageRow">
        <img src={Logo} alt="" className="LoginImage" />
      </Row>

      <Form.Group
        as={Row}
        controlId="formBasicEmail"
        // className="LoginEmailLabel"
      >
        <Form.Label className="LoginEmailLabel">Email address</Form.Label>
        <Col xs={5} className="LogintextBoxCol">
          <Form.Control type="email" placeholder="Enter email" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBasicPassword">
        <Form.Label className="LoginEmailLabel">Password</Form.Label>
        <Col xs={5} className="LogintextBoxCol">
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>
      <Col className="LoginButtonCol ">
        <Button variant="dark" type="submit">
          Login
        </Button>
      </Col>
    </div>
  )
}
