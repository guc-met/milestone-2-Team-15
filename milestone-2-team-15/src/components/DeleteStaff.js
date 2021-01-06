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
  const [staffArray, setStaffArray] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:3000/HR/ViewStaffs`);
      console.log(response.data);

      const staff = response.data.map((staff, index) => {
        return (
          <Dropdown.Item>
            <Button onClick={() => handleClick(staff.ID)}>{staff.email}</Button>
          </Dropdown.Item>
        );
      });

      setStaff(staff);
      setStaffArray(response.data);
    }
    fetchData();
  }, [flag]);

  const handleClick = async (staffID) => {
    console.log(staffID);

    const response = await axios.post(`http://localhost:3000/HR/DeleteStaff`, {
      staffID: staffID,
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
    </div>
  );
}

export default RegisterStaff;
