import React, { useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import Logo from "../images/Guc.png"
import "../stylesheets/login.css"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import backendlink from "../backendlink"
import { useHistory } from "react-router-dom"
import Token_Secret from "../dev"
const jwt = require("jsonwebtoken")
require("dotenv").config()
export default function Login(props) {
  const history = useHistory()
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [err, setErr] = useState("")
  const [re, setRe] = useState("")
  const handleLogin = async () => {
    await axios({
      method: "post",
      url: "http://localhost:3000/login",

      data: {
        email: Email,
        password: Password,
      },
    }).then((res) => {
      console.log(res.status)
      if (res.data == "please reset ur password" && res.status == 200) {
        setErr("please reset ur password")
      }
      if (res.status == 4004) {
        console.log("here")
        setErr("wrong Email")
      } else {
        const result = jwt.verify(res.data, Token_Secret.Token_Secret)

        if (result) {
          localStorage.setItem("token", res.data)
          // console.log(result)
          ///////////////////////////////////////////////////hereeeeeeeeeeeeeeeeee lseesasas
          let type = result.type
          switch (type) {
            case "instructor":
              history.push("/instructorprofile")
              break
            case "HR":
              history.push("/HR")
              break
            case "TA":
              history.push("/TA")
              break
            case "CourseCoordinator":
              history.push("/CourseCoordinator")
              break

            default:
              break
          }
        }
      }
    })
  }
  const handlereset = async () => {
    if (err=="please reset ur password") history.push("/resetpassword")
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
        <Form.Control.Feedback type="invalid">{err}</Form.Control.Feedback>
      </Col>
      <Col className="LoginButtonCol ">
        <Button
          variant="dark "
          size="LoginButton"
          type="submit"
          onClick={handlereset}
        >
          Reset Password
        </Button>
      </Col>
    </div>
  )
}
