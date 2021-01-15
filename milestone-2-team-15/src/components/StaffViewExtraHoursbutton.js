import React, { useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import "../stylesheets/logout.css"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import backendlink from "../backendlink"
import { useHistory } from "react-router-dom"
export default function StaffViewExtraHoursbutton(props) {
  const history = useHistory()
  const link= `/${props.type}/extrahours`

  const link1="/"+props.type+"/extrahours"
  

  return (
    <div className="logout">
      <Col className="logoutButtonCol ">
        <Button
          variant="dark"
          size="logoutButton"
          type="submit"
          onClick={ ()=>{history.push(link)}}
        >
          Extra Hours
        </Button>
      </Col>
    </div>
  )
}
