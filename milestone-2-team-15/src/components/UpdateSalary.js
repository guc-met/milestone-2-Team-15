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
  Badge,
  Alert,
  Dropdown,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import { Plus } from "react-bootstrap-icons";
require("dotenv").config();
function UpdateSalary(props) {
  const [salary, setSalary] = useState();
  const [staff, setStaff] = useState();
  const [staffArray, setStaffArray] = useState([]);
  const [response, setResponse] = useState();
  const [validated, setValidated] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/HR/ViewStaffs`,
        data: {},
        headers: { token: token },
      });
      console.log(response.data);

      const staff = response.data.map((staff) => {
        return (
          <Dropdown.Item>
            <Button onClick={() => handleClick(staff)}>{staff.email}</Button>
          </Dropdown.Item>
        );
      });

      setStaffArray(staff);
    }
    fetchData();
  }, []);

  function handleClick(staff) {
    setStaff(staff);
    console.log(staff);
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (staff == null) {
      setResponse(<Alert variant="danger">Please choose a staff </Alert>);
      return;
    }
    setValidated(false);
    const token = localStorage.getItem("token");
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/HR/UpdateSalary`,
      data: {
        staffID: staff.ID,

        salary: salary,
      },
      headers: { token: token },
    });

    if (response.status == 200)
      setResponse(<Alert variant="success">{response.data} </Alert>);
    else setResponse(<Alert variant="danger">{response.data} </Alert>);
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

        <Dropdown.Menu>{staffArray}</Dropdown.Menu>
      </Dropdown>
      <Badge pill variant="primary" style={{ backgroundColor: "gray" }}>
        {staff ? staff.email : null}
      </Badge>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group class="HR_input" controlId="formGridroomKind">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            required
            type="number"
            onChange={(event) => {
              setSalary(event.target.value);
            }}
            placeholder="50,40,10..."
          />
        </Form.Group>
        <Form.Group class="HR_input" role="form">
          <Button
            type="submit"
            style={{ marginTop: "1%", float: "right" }}
            variant="primary"
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
      <div style={{ marginTop: "10%" }}>{response}</div>
    </div>
  );
}
export default UpdateSalary;
