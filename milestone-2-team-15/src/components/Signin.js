import React, { useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import "../stylesheets/signin.css"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import backendlink from "../backendlink"
import { useHistory } from "react-router-dom"
export default function Signin(props) {
  const history = useHistory()
  const [signinmessage, setSigninmessage] = useState("")
  const [signinerrnmessage, setSigninerrnmessage] = useState("")
  const token = localStorage.getItem("token")
  const handlesignin = async () => {
    await axios({
      method: "post",
      url: "http://localhost:3000/signin",
      headers: {
        token: token,
      },
    }).then((res) => {
      if (res.data === "something went wrong" && res.status === 403) {
        setSigninerrnmessage("something went wrong")
        setSigninmessage("")
      } else if (res.data === "you cant sign in friday" && res.status === 403) {
        setSigninerrnmessage("you can't sign in it's friday")
        setSigninmessage("")
      } else if (res.data === "sign in done" && res.status === 200) {
        setSigninerrnmessage("")
        setSigninmessage("sign in done")
      } else if (res.data === "sign in successfully in dayoff" && res.status === 200) {
        setSigninerrnmessage("")
        setSigninmessage("sign in done in your dayOff")
      }
    })
  }
  return (
    <div className="signin">
      <Col className="signinButtonCol ">
        <Button
          variant="dark "
          size="signinButton"
          type="submit"
          onClick={handlesignin}
        >
          signin
        </Button>
        <Form.Control.Feedback type="valid">
          {signinmessage}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {signinerrnmessage}
        </Form.Control.Feedback>
      </Col>
    </div>
  )
}
