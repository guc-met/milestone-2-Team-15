import React, { useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import "../stylesheets/logout.css"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import backendlink from "../backendlink"
import { useHistory } from "react-router-dom"
export default function StaffeditProfile(props) {
  const history = useHistory()
  const link= `/${props.type}/editprofile`

  const link1="/"+props.type+"/editprofile"
  

  return (
    <div className="logout" style={{ marginLeft: "90%" }}>
      <Col style={{textAlign:"right"}}>
        <Button
          variant="dark"
          size="logoutButton"
          type="submit"
          onClick={ ()=>{history.push(link)}}
        >
          Edit
        </Button>
      </Col>
    </div>
  )
}
