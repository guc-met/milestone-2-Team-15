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
  Badge,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Select } from "antd";
import { Plus } from "react-bootstrap-icons";
import Faculties from "./Faculties";

const { Option, OptGroup } = Select;
require("dotenv").config();
function RegisterStaff(props) {
  const [name, setName] = useState("");

  const [salary, setSalary] = useState(0);
  const [location, setLocation] = useState(0);
  const [dayOff, setDayOff] = useState(-1);
  const [gender, setGender] = useState("");
  const [faculties, setFaculties] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [locations, setLocations] = useState([]);
  const [validated, setValidated] = useState(true);
  const [flag, setFlag] = useState(false);
  const [response, setResponse] = useState();
  const [staffs, setStaffs] = useState();
  const [staffChosen, setStaffChosen] = useState("");

  useEffect(() => {
    async function fetchData() {
      setName("");
      setSalary("");
      setLocation("");
      setDayOff("");
      setGender("");
      setFaculty("");
      setDepartment("");
      const token = localStorage.getItem("token");
      const response3 = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/HR/ViewStaffs`,
        data: {},
        headers: { token: token },
      });

      const staff = response3.data.map((staff) => {
        return (
          <Dropdown.Item>
            <Button onClick={() => setStaffChosen(staff)}>{staff.email}</Button>
          </Dropdown.Item>
        );
      });

      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/HR/ViewFaculties`,
        data: {},
        headers: { token: token },
      });

      console.log(response.data);
      setStaffs(staff);
      const faculties = response.data.map((faculty) => {
        const departments = faculty.departments.map((department) => {
          const value = {};
          value.department = department._id;
          value.faculty = faculty._id;
          return (
            <Option value={department._id}>
              <Button
                onClick={() => {
                  setFaculty(faculty._id);
                  setDepartment(department._id);
                }}
              >
                {department.name}
              </Button>
            </Option>
          );
        });
        return <OptGroup label={faculty.name}> {departments}</OptGroup>;
      });
      console.log(faculties);
      setFaculties(faculties);

      const response2 = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/HR/ViewLocations`,
        data: {},
        headers: { token: token },
      });

      console.log(response2.data);

      const locations = response2.data
        .filter((location) => {
          return location.NumberOfPersons > location.NumberOfAvailablePeople;
        })
        .map((location) => {
          return (
            <Form.Check
              onChange={() => {
                setLocation(location.locationId);
              }}
              type="radio"
              label={location.BuildingCharachter + location.roomNumber}
              name="location"
              id={location.locationId}
            />
          );
        });
      setLocations(locations);
    }
    fetchData();
  }, [flag]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (staffChosen == "") {
      setResponse(
        <Alert style={{ marginTop: "10%" }} variant="danger">
          Please Choose a a staff
        </Alert>
      );
      return;
    }
    const staff = {};
    if (name != "") staff.name = name;
    if (salary != "") staff.salary = salary;
    if (location != "") staff.locationID = location;
    if (dayOff != "") staff.dayOff = dayOff;
    if (gender != "") staff.gender = gender;
    if (department != "" && staffChosen.type != "HR")
      staff.department = department;
    if (faculty != "" && staffChosen.type != "HR") staff.faculty = faculty;

    console.log(dayOff);
    console.log(gender);
    console.log(department);
    console.log(faculty);
    const token = localStorage.getItem("token");

    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/HR/UpdateStaff`,
      data: {
        staffId: staffChosen.ID,
        staff: staff,
      },
      headers: { token: token },
    });

    if (response.status == 200)
      setResponse(
        <Alert style={{ marginTop: "10%" }} variant="success">
          {response.data}
        </Alert>
      );
    else
      setResponse(
        <Alert style={{ marginTop: "10%" }} variant="danger">
          {response.data}
        </Alert>
      );

    setFlag(!flag);
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

        <Dropdown.Menu>{staffs}</Dropdown.Menu>
      </Dropdown>
      <Badge pill variant="primary" style={{ backgroundColor: "gray" }}>
        {staffChosen ? staffChosen.email : null}
      </Badge>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group class="HR_input" controlId="formGridroomKind">
          <Form.Label> Name: </Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Arwa,Leqaa,Donia...."
          />
        </Form.Group>

        <Form.Group class="HR_input" controlId="formGridroomKind">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            onChange={(event) => {
              setSalary(event.target.value);
            }}
            placeholder="2003,4004,1002..."
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Location
          </Form.Label>
          {locations}
        </Form.Group>

        <Form.Group class="HR_input" controlId="formGridroomKind">
          <Form.Label>day Off</Form.Label>
          <Col sm={10}>
            <Form.Check
              onChange={() => {
                setDayOff(6);
              }}
              type="radio"
              label="Saturday"
              name="DayOff"
              id="Saturday"
            />
            <Form.Check
              onChange={() => {
                setDayOff(0);
              }}
              type="radio"
              label="Sunday"
              name="DayOff"
              id="Sunday"
            />
            <Form.Check
              onChange={() => {
                setDayOff(1);
              }}
              type="radio"
              label="Monday"
              name="DayOff"
              id="Monday"
            />
            <Form.Check
              onChange={() => {
                setDayOff(2);
              }}
              type="radio"
              label="Tuesday"
              name="DayOff"
              id="Tuesday"
            />
            <Form.Check
              onChange={() => {
                setDayOff(3);
              }}
              type="radio"
              label="Wednesday"
              name="DayOff"
              id="Wednesday"
            />
            <Form.Check
              onChange={() => {
                setDayOff(4);
              }}
              type="radio"
              label="Thursday"
              name="DayOff"
              id="Thursday"
            />
          </Col>
        </Form.Group>
        <Form.Group class="HR_input" controlId="formGridroomKind">
          <Form.Label>gender</Form.Label>
          <Form.Check
            onChange={() => {
              setGender("M");
            }}
            type="radio"
            label="Male"
            name="Gender"
            id="Male"
          />
          <Form.Check
            onChange={() => {
              setGender("F");
            }}
            type="radio"
            label="Female"
            name="Gender"
            id="Female"
          />
        </Form.Group>

        {staffChosen && staffChosen.type != "HR" ? (
          <Form.Group class="HR_input" controlId="formGridroomKind">
            <Select defaultValue="choose Department" style={{ width: 200 }}>
              {faculties}
            </Select>
          </Form.Group>
        ) : null}

        <Form.Group class="HR_input" role="form">
          <Button type="submit" style={{ float: "right" }} variant="primary">
            Submit
          </Button>
        </Form.Group>
      </Form>
      {response}
    </div>
  );
}

export default RegisterStaff;
