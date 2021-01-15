//Assign instruction from a course

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
function ViewStaff(props) {
  const [staffs, setstaffs] = useState([]);
  const [staffID, setstaffID] = useState("");
  const [stafftype, setstafftype] = useState("");
  const [staff, setstaff] = useState("");
  const [facID, setFacID] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Salary, setSalary] = useState("");
  const [DayOff, setDayoff] = useState("");
  const [Department, setDepartment] = useState("");
  const [Faculty, setFaculty] = useState("");
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      const facdep = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HoD/ViewDepIDandFacID`,
        headers: { token: token },
      });
      console.log(facdep.data);
      setFacID(facdep.data[0]);
      let facidd = facdep.data[0];

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HoD/viewstaff`,
        data: { facid: facidd },
        headers: { token: token },
      });
      console.log("response: " + response.data);

      const staffs = response.data.map((staff, index) => {
        return (
          <Dropdown.Item>
            <Button onClick={() => handleClick(staff)}>{staff.email}</Button>
          </Dropdown.Item>
        );
      });
      setstaffs(staffs);
    }
    fetchData();
  }, [show]);
  console.log("fac =" + facID);

  const handleClick = async (staff) => {
    console.log(staff.ID);
    setstaffID(staff.ID);
    setName(staff.name);
    setEmail(staff.email);
    setSalary(staff.salary.$numberDecimal);
    setDayoff(staff.dayOff);
    setDepartment(staff.department);
    setFaculty(staff.Faculty);
    const responsestaff = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/HoD/ViewOneStaff`,
      data: { sid: staff.ID },
      headers: { token: token },
    });
    setstaff(responsestaff.data);
    const responsestafftype = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/HoD/ViewStaffType`,
      data: { sid: staff.ID },
      headers: { token: token },
    });
    setstafftype(responsestafftype.data);
    setShow(true);
  };

  return (
    <div class="hod-Buttons">
      <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          id="dropdown-basic"
          class="hod-Button"
        >
          Choose a staff to be viewd
        </Dropdown.Toggle>

        <Dropdown.Menu>{staffs}</Dropdown.Menu>
      </Dropdown>

      {/*  */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            you are now viewing {stafftype} with ID {staffID} profile{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card body className="InstructorProfileCardd">
            <Row>
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  ID : {staffID}
                </Form.Label>
              </Col>
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  Name : {Name}
                </Form.Label>
              </Col>
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  Salary : {Salary}
                </Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  Faculty : {Faculty}
                </Form.Label>
              </Col>
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  Department : {Department}
                </Form.Label>
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Form.Label className="InstructorProfileLabel">
                  Email : {Email}
                </Form.Label>
              </Col>
              <Col xs={4}>
                <Form.Label className="InstructorProfileLabel">
                  DayOff : {DayOff}
                </Form.Label>
              </Col>
            </Row>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewStaff;
