// makan registerstaff

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  ListGroup,
  Form,
  Modal,
  Button,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import { Plus } from "react-bootstrap-icons";
require("dotenv").config();
function RegisterStaff(props) {
  const [instid, setInstid] = useState("");
  const [courseid, setCourseid] = useState("");
  const [facid, setFacid] = useState("");

  const handleSubmit = async (event) => {
    console.log(instid);
    console.log(courseid);
    console.log(facid);

    const response = await axios.post(`http://localhost:3000/HR/addLocation`, {
      type: type,
      staff: {
        id: instid,
        salary: salary,
        locationID: location,
        email: email,
      },
    });
    // console.log(response);
  };

  return (
    <div class="Hr-Buttons">
      <Form validated onFinish={handleSubmit}>
      {/* const [instid, setInstid] = useState("");
  const [courseid, setCourseid] = useState("");
  const [facid, setFacid] = useState(""); */}

        <Form.Group class="hod_input" controlId="formGridroomKind">
          <Form.Label> Instructor ID: </Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(event) => {
              setInstid(event.target.value);
            }}
            placeholder="ac-10,ac-11...."
          />
        </Form.Group>
        <Form.Group class="hod_input" controlId="formGridroomKind">
          <Form.Label> Coures _ID: </Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(event) => {
              setCourseid(event.target.value);
            }}
            placeholder="5ff71096c788475336d89bb7"
          />
        </Form.Group>

        <Form.Group class="hod_input" controlId="formGridroomKind">
          <Form.Label>Faculty _ID </Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(event) => {
              setFacid(event.target.value);
            }}
            placeholder="5fe60aa2be0d53db46deb9ad"
          />
        </Form.Group>

        <Form.Group class="HR_input" role="form">
          <Button
            // type="submit"
            onClick={handleSubmit}
            style={{ float: "right" }}
            variant="primary"
          >
            Delete
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default RegisterStaff;
