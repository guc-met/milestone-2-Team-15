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
  Alert,
  Dropdown,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import { Plus } from "react-bootstrap-icons";
require("dotenv").config();
function RegisterStaff(props) {
  const [staff, setStaff] = useState([]);
  const [staffChosen, setStaffChosen] = useState(0);
  const [response, setResponse] = useState();

  const [show, setShow] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/HR/ViewStaffs`,
        data: {},
        headers: { token: token },
      });

      const staff = response.data.map((staff, index) => {
        return (
          <Dropdown.Item>
            <Button
              variant="primary"
              class="HR__ALL__Buttons"
              onClick={() => handleClick(staff)}
            >
              {staff.email}
            </Button>
          </Dropdown.Item>
        );
      });

      setStaff(staff);
    }
    fetchData();
  }, [show]);

  const handleClick = (staff) => {
    console.log(staff);
    setStaffChosen(staff);
    setShow(true);
  };
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/HR/DeleteStaff`,
      data: { staffID: staffChosen.ID },
      headers: { token: token },
    });

    setShow(false);
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

        <Dropdown.Menu>{staff}</Dropdown.Menu>
      </Dropdown>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title> Deleting staff </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {staffChosen.email}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {response}
    </div>
  );
}

export default RegisterStaff;
