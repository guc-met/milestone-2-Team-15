import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  ListGroup,
  Alert,
  Button,
  Card,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
require("dotenv").config();
function StaffAttendanceRecord() {
  const [staff, setStaff] = useState(0);
  const [staffArray, setStaffArray] = useState(0);
  const [response, setResponse] = useState("");
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:3000/HR/ViewStaffs`);
      console.log(response.data);

      const staff = response.data.map((staff) => {
        return (
          <Dropdown.Item>
            <Button onClick={() => handleSubmit(staff)}>{staff.email}</Button>
          </Dropdown.Item>
        );
      });

      setStaff(staff);
      setStaffArray(response.data);
    }
    fetchData();
  }, []);
  const handleSubmit = async () => {
    const response = await axios.post(
      `http://localhost:3000/HR/ViewStaffAttendance`,
      {
        staffID: staff.ID,
      }
    );

    if (response.status == 200) {
      const hi = response.data.map();
      setResponse();
    } else setResponse(<Alert variant="danger">{response.data} </Alert>);
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
      {}
      {response}
    </div>
  );
}

export default StaffAttendanceRecord;
