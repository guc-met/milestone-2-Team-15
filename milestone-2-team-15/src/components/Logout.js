import React, { useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import "../stylesheets/logout.css"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import backendlink from "../backendlink"
import { useHistory } from "react-router-dom"
export default function Logout(props) {
  const history = useHistory()
  const [logoutmessage, setLogoutmessage] = useState("")
  const [logouterrmessage, setLogouterrnmessage] = useState("")
  const token = localStorage.getItem("token")
  const handlelogout = async () => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/logout`,
      headers: {
        token: token,
      },
    }).then((res) => {
      if (res.data === "something went wrong") {
        setLogouterrnmessage("something went wrong")
        setLogoutmessage("")
      } else {
        // setLogouterrnmessage("")
        // setLogoutmessage(res.data)
        localStorage.removeItem("token")
        history.push("/login")
      }
    })
  }
  // useEffect(() => {
  //   if (logoutmessage == "logout successfully") 
  // })
  return (
    <div className="logout">
      <Col className="logoutButtonCol ">
        <Button
          variant="dark"
          size="logoutButton"
          type="submit"
          onClick={handlelogout}
        >
          logout
        </Button>
        <Form.Control.Feedback type="valid">
          {logoutmessage}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {logouterrmessage}
        </Form.Control.Feedback>
      </Col>
    </div>
  )
}
