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
import "../stylesheets/editp.css"
import "../stylesheets/logout.css"

const { Option, OptGroup } = Select;
require("dotenv").config();
export default function StaffEdit(props) {
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
      const response2 = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/ViewLocations`,
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
            <Form.Check style={{marginRight:"0.5%"}}
              onChange={() => {
                setLocation(location.locationId);
              }}
              type="radio"
              label={location.BuildingCharachter+location.FloorNumber+"." +location.roomNumber}
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
    
    else{
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
      url: `${process.env.REACT_APP_URL}/editstaff`,
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
  }
  };

  return (
    
    <Card className="editpcard">
      <Form validated={validated} onSubmit={handleSubmit}>
       
        <Form.Group as={Row}>
          <Form.Label as="legend"  style={{marginLeft:"1.5%",paddingTop: "0vw"}}column sm={2}>
            Location
          </Form.Label>
          {locations}
        </Form.Group>

       
        <Form.Group class="HR_input" controlId="formGridroomKind">
          <Col xs={4}>
          <Form.Label>gender</Form.Label>
          </Col>
          <Col xs={8}>
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
        </Col>
        </Form.Group>


        <Form.Group class="HR_input" role="form">
          <Button type="submit" style={{ float: "right" }} variant="dark" size="logoutButton">
            Submit
          </Button>
        </Form.Group>
      </Form>
      {response}
    </Card>
  );
}

