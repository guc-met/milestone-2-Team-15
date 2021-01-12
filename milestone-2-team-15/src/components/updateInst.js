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
function Updateinst(props) {
  const [courses, setcourses] = useState([]);
  const [courseID, setCourseID] = useState("");
  const [coursename, setCoursename] = useState("");
  const [instID, setInstID] = useState("");
  const [ninstID, setNinstID] = useState("");
  const [facID, setFacID] = useState("");
  const [response, setResponse] = useState();

  const [show, setShow] = useState(false);
  useEffect(() => {
    async function fetchData() {
        const facdep = await axios.post(`http://localhost:3000/HoD/ViewDepIDandFacID`,{
            hid:"ac-100"
         });
         console.log(facdep.data);
      const depid = facdep.data[1];
      setFacID(facdep.data[0]);
      console.log("dep = "+depid)
      console.log("fac ="+facID)
      const response = await axios.post(`http://localhost:3000/HoD/ViewCourses`,{
        did:depid
      });

      console.log(response.data);

      const courses = response.data.map((course, index) => {
        return (
          <Dropdown.Item>
            <Button onClick={() => handleClick(course._id, course.courseName)}>{course.courseName}</Button>
          </Dropdown.Item>
        );
      });

      setcourses(courses);
    }
    fetchData();
  }, [show]);
  console.log("fac ="+facID)

  const handleClick = (courseID , coursename) => {
    console.log(courseID);
    setCourseID(courseID);
    setCoursename(coursename);
    setShow(true);
  };
  const handleSubmit = async () => {
    // const headID = req.body.hid;
    // const facultyid = req.body.facid;
    // const courseid = req.body.cid;
    // const Instructorid = req.body.id;
    // const newInstructorid = req.body.nid;
    const response = await axios.put(`http://localhost:3000/HoD/updateCourseInst`, {
        hid: "ac-100",
        facid: facID,
        cid: courseID,
        id: instID,
        nid: ninstID
    });
    setShow(false);
    // if (response.status == 200)
      setResponse(<Alert variant="success">{response.data} </Alert>);
    // else setResponse(<Alert variant="danger">{response.data} </Alert>);
  };

  return (
    <div class="hod-Buttons">
      <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          id="dropdown-basic"
          class="hod-Button"
        >
          All Courses to be viewd 
        </Dropdown.Toggle>

        <Dropdown.Menu>{courses}</Dropdown.Menu>
      </Dropdown>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title> Assigning Instructor to {coursename} course </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group class="hod_input" controlId="formGridroomKind">
            <Form.Label> Please enter the old nstructor ID: </Form.Label>
            <Form.Control
                required
                type="text"
                onChange={(event) => {
                setInstID(event.target.value);
                }}
                placeholder="ac-10"
            />
            </Form.Group>

            <Form.Group class="hod_input" controlId="formGridroomKind">
            <Form.Label> Please enter the new nstructor ID: </Form.Label>
            <Form.Control
                required
                type="text"
                onChange={(event) => {
                setNinstID(event.target.value);
                }}
                placeholder="ac-10"
            />
            </Form.Group>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      {response}
    </div>
  );
}

export default Updateinst;