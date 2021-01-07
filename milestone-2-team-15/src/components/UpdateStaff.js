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
  Dropdown,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import { Plus } from "react-bootstrap-icons";
require("dotenv").config();
function RegisterStaff(props) {
  const [type, setType] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(0);
  const [salary, setSalary] = useState(0);
  const [location, setLocation] = useState(0);
  const [staff, setStaff] = useState(0);
  const [staffArray, setStaffArray] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:3000/HR/ViewStaffs`);
      console.log(response.data);

      const staff = response.data.map((staff) => {
        return <Dropdown.Item href="">{staff.email}</Dropdown.Item>;
      });

      setStaff(staff);
      setStaffArray(response.data);
    }
    fetchData();
  }, [flag]);

  const handleSubmit = async (event) => {
    console.log(type);
    console.log(name);
    console.log(email);
    console.log(salary);
    console.log(location);

    const response = await axios.post(`http://localhost:3000/HR/addLocation`, {
      type: type,
      staff: {
        name: name,
        salary: salary,
        locationID: location,
        email: email,
      },
    });
    console.log(response);
  };

  return (
    <div class="Hr-Buttons">
      <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          id="dropdown-basic"
          class="Hr-Button"
        >
          All Staff
        </Dropdown.Toggle>

        <Dropdown.Menu>{staff}</Dropdown.Menu>
      </Dropdown>
      <Form validated onFinish={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            type :
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              required
              onChange={() => {
                setType("courseCoordinator");
              }}
              type="radio"
              label="Course Coordinator"
              name="type"
              id="Course Coordinator"
            />
            <Form.Check
              onChange={() => {
                setType("HoD");
              }}
              type="radio"
              label="Head of Department"
              name="type"
              id="Head of Department"
            />
            <Form.Check
              onChange={() => {
                setType("ta");
              }}
              type="radio"
              label="Teacing Assistant"
              name="type"
              id="Teacing Assistant"
            />
            <Form.Check
              onChange={() => {
                setType("HR");
              }}
              type="radio"
              label="HR"
              name="type"
              id="HR"
            />
            <Form.Check
              onChange={() => {
                setType("instructor");
              }}
              type="radio"
              label="instructor"
              name="type"
              id="instructor"
            />
          </Col>
        </Form.Group>

        <Form.Group class="HR_input" controlId="formGridroomKind">
          <Form.Label> Name: </Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Arwa,Leqaa,Donia...."
          />
        </Form.Group>
        <Form.Group class="HR_input" controlId="formGridroomKind">
          <Form.Label> Email: </Form.Label>
          <Form.Control
            required
            type="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="ahmed2000@guc.edu.eg"
          />
        </Form.Group>

        <Form.Group class="HR_input" controlId="formGridroomKind">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            required
            type="number"
            onChange={(event) => {
              setSalary(event.target.value);
            }}
            placeholder="2003,4004,1002..."
          />
        </Form.Group>

        <Form.Group class="HR_input" controlId="formGridroomKind">
          <Form.Label>Location </Form.Label>
          <Form.Control
            required
            type="number"
            onChange={(event) => {
              setLocation(event.target.value);
            }}
            placeholder="50,40,10..."
          />
        </Form.Group>

        <Form.Group style={{ marginTop: "1%" }} role="form">
          <Button
            // type="submit"
            style={{ float: "right" }}
            onClick={handleSubmit}
            variant="primary"
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default RegisterStaff;