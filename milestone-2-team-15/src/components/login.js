import React, { useState } from "react"
import { Form, Row, Col, Card, Button } from "react-bootstrap"
import Logo from "../images/Guc.png"
import "../stylesheets/login.css"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import backendlink from "../backendlink"

export default function Login(props) {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const handleLogin = () => {
  
    try {
      axios({
        method: "post",
        url: "http://localhost:3000" + "/login",
        data: {
          Email: { Email },
          Password: { Password },
        },
      }).then((res) => {
        console.log("here")
        console.log(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="login">
      <Row className="LoginImageRow">
        <img src={Logo} alt="" className="LoginImage" />
      </Row>

      <Form.Group as={Row} controlId="formBasicEmail">
        <Form.Label className="LoginLabel">Email address</Form.Label>
        <Col xs={5} className="LogintextBoxCol">
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="LoginTextBox"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBasicPassword">
        <Form.Label className="LoginLabel">Password</Form.Label>
        <Col xs={5} className="LogintextBoxCol">
          <Form.Control
            type="password"
            placeholder="Password"
            className="LoginTextBox"
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </Col>
      </Form.Group>

      <Col className="LoginButtonCol ">
        <Button
          variant="dark "
          size="LoginButton"
          type="submit"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Col>
    </div>
  )
}
