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
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Select } from "antd";
import { Plus } from "react-bootstrap-icons";
import Faculties from "./Faculties";

const { Option, OptGroup } = Select;
require("dotenv").config();
function RegisterStaff(props) {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [dayOff, setDayOff] = useState("");
  const [gender, setGender] = useState("");
  const [faculties, setFaculties] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [locations, setLocations] = useState("");
  const [validated, setValidated] = useState(true);
  const [flag, setFlag] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    async function fetchData() {
      setType("");
      setName("");
      setEmail("");
      setSalary("");
      setLocation("");
      setDayOff("");
      setGender("");
      setFaculty("");
      setDepartment("");
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/HR/ViewFaculties`,
        data: {},
        headers: { token: token },
      });

      console.log(response.data);

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
          return location.NumberOfAvailablePeople < location.NumberOfPersons;
        })
        .map((location) => {
          return (
            <Form.Check
              required
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
    const staff = {};
    staff.name = name;
    staff.salary = salary;
    staff.locationID = location;
    staff.email = email;
    if (
      staff.name == "" ||
      staff.salary == "" ||
      staff.locationID == "" ||
      staff.email == ""
    ) {
      setResponse(
        <Alert style={{ marginTop: "10%" }} variant="danger">
          please renter the fields it looks like you are missing something
        </Alert>
      );
      return;
    }
    if (dayOff != "" && type != "HR") staff.dayOff = dayOff;
    if (gender != "") staff.gender = gender;
    if (department != "" && type != "HR") staff.department = department;
    if (faculty != "" && type != "HR") staff.faculty = faculty;
    console.log(name);
    console.log(salary);
    console.log(location);
    console.log(email);

    console.log(dayOff);
    console.log(gender);
    console.log(department);
    console.log(faculty);
    console.log(staff);
    const token = localStorage.getItem("token");

    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/HR/register`,
      data: {
        type: type,
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
          {response ? response.data : "Something went wrong"}
        </Alert>
      );
    setFlag(!flag);
  };

  return (
    <div class="Hr-Buttons">
      <Form validated={validated} onSubmit={handleSubmit}>
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
              label="Teaching Assistant"
              name="type"
              id="Teaching Assistant"
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
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Location
          </Form.Label>
          {locations}
        </Form.Group>
        {type && type != "HR" ? (
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
        ) : null}

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

        {type && type != "HR" ? (
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
