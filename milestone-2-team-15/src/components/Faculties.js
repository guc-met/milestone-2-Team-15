import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  ListGroup,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

import {
  SettingOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import * as Icon from "react-bootstrap-icons";

import { Plus } from "react-bootstrap-icons";
import { Collapse, Modal, Tooltip } from "antd";
const { Panel } = Collapse;
require("dotenv").config();
function Faculties(props) {
  const [faculties, setFaculties] = useState(0);
  const [facultyName, setFacultyName] = useState("");
  const [facultyID, setFacultyID] = useState("");
  const [faculty, setFaculty] = useState("");

  const [departmentName, setDepartmentName] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [department, setDepartment] = useState("");

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseTeachingSlots, setTeachingSlots] = useState(-1);
  const [courseCoverage, setCourseCoverage] = useState(-1);
  const [courseAssignedSlots, setAssignedSlots] = useState(-1);
  const [courseCover, setCover] = useState(-1);
  const [course, setCourse] = useState("");
  const [courseID, setCourseID] = useState("");
  const [flag, setFlag] = useState(false);
  const [response, setResponse] = useState();
  const [show, setShow] = useState(false);
  const [which, setWhich] = useState(-1); ///1 add faculty//2 Update faculty//3 add department//4 update department//5 add course//6 update course
  const [validated, setValidated] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setFacultyName("");
      setFacultyID("");
      setDepartmentName("");
      setDepartmentID("");
      setCourseName("");
      setCourseCode("");
      setCourseCoverage(-1);
      setCover(-1);
      setTeachingSlots(-1);
      setAssignedSlots(-1);
      setCourseID("");
      setWhich(-1);
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/HR/ViewFaculties`,
        data: {},
        headers: { token: token },
      });

      console.log(response.data);

      const hi = response.data.map((faculty) => {
        const facultyPanels = faculty.departments.map((department) => {
          const departmentPanels = department.courses.map((course) => {
            console.log(course.coverage);
            let InstructorsPanels = course.Instructors.map((Instructor) => {
              return <Panel>{Instructor.name}</Panel>;
            });
            let TAsPanels = course.TAs.map((TA) => {
              return <Panel>{TA.name}</Panel>;
            });
            let slotsPanels = course.slots.map((slot) => {
              return (
                <Panel>
                  <ListGroup variant="flush">
                    <ListGroup.Item> Kind: {slot.kind}</ListGroup.Item>
                    <ListGroup.Item> Timing: {slot.timing}</ListGroup.Item>

                    <ListGroup.Item> Location:{slot.location}</ListGroup.Item>
                  </ListGroup>
                </Panel>
              );
            });
            return (
              <Panel
                extra={
                  <>
                    <Tooltip placement="top" title="Update Course">
                      <SettingOutlined
                        onClick={(event) => {
                          setCourseID(course._id);
                          setDepartmentID(department._id);
                          setFacultyID(faculty._id);
                          setCourse(course);
                          setWhich(6);

                          // If you don't want click extra trigger collapse, you can prevent this:
                          event.stopPropagation();
                        }}
                      />
                    </Tooltip>
                    <Tooltip placement="top" title="Delete Course">
                      <DeleteOutlined
                        onClick={(event) => {
                          setCourseID(course._id);
                          setDepartmentID(department._id);
                          setFacultyID(faculty._id);

                          DeleteCourse(course._id, department._id, faculty._id);

                          // If you don't want click extra trigger collapse, you can prevent this:
                          event.stopPropagation();
                        }}
                      />
                    </Tooltip>
                  </>
                }
              >
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <p>
                        {course ? course.courseName + " " + course.code : null}
                      </p>
                      {!course.assigned ? (
                        <p style={{ color: "red" }}>{"( Removed )"}</p>
                      ) : null}
                    </Card.Title>
                  </Card.Body>

                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      teachingSlots: {course.teachingSlots}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      assignedSlots: {course.assignedSlots}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      cover: {course.cover === 1 ? "True" : "False"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      coverage:
                      {course.coverage ? course.coverage.$numberDecimal : null}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Instructors: <Collapse>{InstructorsPanels}</Collapse>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      TAs: <Collapse>{TAsPanels}</Collapse>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Slots: <Collapse>{slotsPanels}</Collapse>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Panel>
            );
          });

          return (
            <Panel
              extra={
                <>
                  <Tooltip placement="top" title="add Course">
                    <PlusCircleOutlined
                      onClick={(event) => {
                        setDepartmentID(department._id);
                        setFacultyID(faculty._id);

                        //////////////modal
                        setWhich(5);
                        // If you don't want click extra trigger collapse, you can prevent this:
                        event.stopPropagation();
                      }}
                    />
                  </Tooltip>
                  <Tooltip placement="top" title="Update Department">
                    <SettingOutlined
                      onClick={(event) => {
                        setDepartmentID(department._id);
                        setFacultyID(faculty._id);
                        setDepartment(department);
                        //////////////modal
                        setWhich(4);
                        // If you don't want click extra trigger collapse, you can prevent this:
                        event.stopPropagation();
                      }}
                    />
                  </Tooltip>
                  <Tooltip placement="top" title="Delete Department">
                    <DeleteOutlined
                      onClick={(event) => {
                        setDepartmentID(department._id);
                        setFacultyID(faculty._id);

                        DeleteDepartment(department._id, faculty._id);

                        // If you don't want click extra trigger collapse, you can prevent this:
                        event.stopPropagation();
                      }}
                    />
                  </Tooltip>
                </>
              }
            >
              <p>{department.name}</p>
              {!department.assigned ? (
                <p style={{ color: "red" }}>{"( Removed )"}</p>
              ) : null}
              <Collapse>{departmentPanels}</Collapse>
            </Panel>
          );
        });
        return (
          <Panel
            extra={
              <>
                <Tooltip placement="top" title="add Department">
                  <PlusCircleOutlined
                    onClick={(event) => {
                      setFacultyID(faculty._id);

                      //////////////modal
                      setWhich(3);
                      // If you don't want click extra trigger collapse, you can prevent this:
                      event.stopPropagation();
                    }}
                  />
                </Tooltip>
                <Tooltip placement="top" title="Update Faculty">
                  <SettingOutlined
                    onClick={(event) => {
                      setFacultyID(faculty._id);

                      //////////////modal
                      setWhich(2);
                      // If you don't want click extra trigger collapse, you can prevent this:
                      event.stopPropagation();
                    }}
                  />
                </Tooltip>
                <Tooltip placement="top" title="Delete Faculty">
                  <DeleteOutlined
                    onClick={(event) => {
                      DeleteFaculty(faculty._id);

                      // If you don't want click extra trigger collapse, you can prevent this:
                      event.stopPropagation();
                    }}
                  />
                </Tooltip>
              </>
            }
          >
            <p>{faculty.name}</p>
            {!faculty.assigned ? (
              <p style={{ color: "red" }}>{"( Removed )"}</p>
            ) : null}
            <Collapse>{facultyPanels}</Collapse>
          </Panel>
        );
      });
      setFaculties(hi);
    }

    fetchData();
  }, [flag]);

  const addFaculty = async (event) => {
    if (facultyName != "") {
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HR/addFaculty`,
        data: {
          name: facultyName,
        },
        headers: { token: token },
      });

      if (response.status == 200)
        setResponse(<Alert variant="success">{response.data} </Alert>);
      else setResponse(<Alert variant="danger">{response.data} </Alert>);
    } else {
      setResponse(<Alert variant="danger">Faculty name Undefined </Alert>);
    }
    setFlag(!flag);
  };
  const UpdateFaculty = async (event) => {
    if (facultyName != "" && facultyID != "") {
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HR/UpdateFaculty`,
        data: {
          id: facultyID,
          faculty: {
            name: facultyName,
          },
        },
        headers: { token: token },
      });

      if (response.status == 200)
        setResponse(<Alert variant="success">{response.data} </Alert>);
      else setResponse(<Alert variant="danger">{response.data} </Alert>);
    } else {
      setResponse(
        <Alert variant="danger">Faculty name or ID Undefined </Alert>
      );
    }
    setFlag(!flag);
  };
  const DeleteFaculty = async (facultyid) => {
    if (facultyid != "") {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HR/DeleteFaculty`,
        data: {
          id: facultyid,
        },
        headers: { token: token },
      });

      if (response.status == 200)
        setResponse(<Alert variant="success">{response.data} </Alert>);
      else setResponse(<Alert variant="danger">{response.data} </Alert>);
    } else {
      setResponse(<Alert variant="danger">faculty ID Undefined </Alert>);
    }
    setFlag(!flag);
  };
  const addDepartment = async (event) => {
    if (departmentName != "" && facultyID != "") {
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HR/addDepartment`,
        data: {
          id: facultyID,
          department: {
            name: departmentName,
          },
        },
        headers: { token: token },
      });

      if (response.status == 200)
        setResponse(<Alert variant="success">{response.data} </Alert>);
      else setResponse(<Alert variant="danger">{response.data} </Alert>);
    } else {
      setResponse(
        <Alert variant="danger">
          Department Name Or Faculty name Undefined{" "}
        </Alert>
      );
    }
    setFlag(!flag);
  };
  const UpdateDepartment = async (event) => {
    console.log(departmentName, facultyID, departmentID);
    console.log({
      id: facultyID,
      department: {
        id: departmentID,
        name: departmentName,
      },
    });
    if (departmentName != "" && facultyID != "" && departmentID != "") {
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HR/UpdateDepartment`,
        data: {
          id: facultyID,
          department: {
            id: departmentID,
            name: departmentName,
          },
        },
        headers: { token: token },
      });

      console.log(response);
      if (response.status == 200)
        setResponse(<Alert variant="success">{response.data} </Alert>);
      else setResponse(<Alert variant="danger">{response.data} </Alert>);
    } else {
      setResponse(
        <Alert variant="danger">
          Department name or ID or Faculty ID Undefined
        </Alert>
      );
    }
    setFlag(!flag);
  };
  const DeleteDepartment = async (department_ID, faculty_ID) => {
    if (faculty_ID != "" && department_ID != "") {
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HR/DeleteDepartment`,
        data: {
          id: faculty_ID,
          department: {
            id: department_ID,
          },
        },
        headers: { token: token },
      });

      if (response.status == 200)
        setResponse(<Alert variant="success">{response.data} </Alert>);
      else setResponse(<Alert variant="danger">{response.data} </Alert>);
    } else {
      setResponse(
        <Alert variant="danger">faculty ID or department ID Undefined </Alert>
      );
    }
    setFlag(!flag);
  };
  const addCourse = async (event) => {
    if (
      courseName != "" &&
      courseCode != "" &&
      facultyID != "" &&
      departmentID != ""
    ) {
      const course = {};
      course.courseName = courseName;
      course.code = courseCode;
      if (courseAssignedSlots != -1) course.assignedSlots = courseAssignedSlots;
      if (courseTeachingSlots != -1) course.teachingSlots = courseTeachingSlots;
      if (courseCover != -1) course.cover = courseCover;
      if (courseCoverage != -1) course.coverage = courseCoverage;
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HR/addCourse`,
        data: {
          facultyid: facultyID,
          departmentid: departmentID,
          course: course,
        },
        headers: { token: token },
      });

      if (response.status == 200)
        setResponse(<Alert variant="success">{response.data} </Alert>);
      else setResponse(<Alert variant="danger">{response.data} </Alert>);
    } else {
      setResponse(
        <Alert variant="danger">
          Department ID Or Faculty ID or courseCode or courseName Undefined
        </Alert>
      );
    }
    setFlag(!flag);
  };
  const UpdateCourse = async (event) => {
    if (
      courseID != "" &&
      facultyID != "" &&
      departmentID != "" &&
      (courseName != "" || courseCode != "")
    ) {
      const course = {};

      if (courseAssignedSlots != -1) course.assignedSlots = courseAssignedSlots;
      if (courseTeachingSlots != -1) course.teachingSlots = courseTeachingSlots;
      if (courseCover != -1) course.cover = courseCover;
      if (courseCoverage != -1) course.coverage = courseCoverage;

      if (courseName != "") {
        course.courseName = courseName;
      }
      if (courseCode != "") {
        course.code = courseCode;
      }
      console.log(course);
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HR/updateCourse`,
        data: {
          facultyid: facultyID,
          departmentid: departmentID,
          courseid: courseID,
          course: course,
        },
        headers: { token: token },
      });

      if (response.status == 200)
        setResponse(<Alert variant="success">{response.data} </Alert>);
      else setResponse(<Alert variant="danger">{response.data} </Alert>);
    } else {
      setResponse(
        <Alert variant="danger">
          courseID or facultyID or departmentId undefined or no updates
        </Alert>
      );
    }
    setFlag(!flag);
  };
  const DeleteCourse = async (courseid, departmentid, facultyid) => {
    if (facultyid != "" && departmentid != "" && courseid != "") {
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HR/DeleteCourse`,
        data: {
          facultyid: facultyid,
          departmentid: departmentid,
          courseid: courseid,
        },
        headers: { token: token },
      });

      if (response.status == 200)
        setResponse(<Alert variant="success">{response.data} </Alert>);
      else setResponse(<Alert variant="danger">{response.data} </Alert>);
    } else {
      setResponse(
        <Alert variant="danger">
          faculty ID or departement ID or course ID Undefined{" "}
        </Alert>
      );
    }
    setFlag(!flag);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(false);
    }
    console.log(which);
    if (which == 1) addFaculty();
    else if (which == 2) UpdateFaculty();
    else if (which == 3) addDepartment();
    else if (which == 4) UpdateDepartment();
    else if (which == 5) addCourse();
    else if (which == 6) UpdateCourse();
  };
  console.log(which);
  return (
    <div class="Hr-Buttons">
      <Collapse defaultActiveKey={["1"]}>{faculties}</Collapse>
      <Card>
        <Button
          variant="primary"
          onClick={() => {
            setWhich(1);
          }}
          style={{ textAlign: "center" }}
        >
          <Icon.Plus size={96} />
        </Button>
      </Card>
      {response}
      <Modal
        footer={null}
        onCancel={() => {
          setWhich(-1);
          setFlag(!flag);
        }}
        visible={which == 1 || which === 2}
      >
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group class="HR_input" controlId="formGridroomKind">
            <Form.Label>Faculty Name</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(event) => {
                setFacultyName(event.target.value);
              }}
              placeholder="Media Engineering and Tecnology, Applied Arts ...."
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
      </Modal>
      <Modal
        footer={null}
        onCancel={() => {
          setWhich(-1);
          setFlag(!flag);
        }}
        visible={which === 3 || which === 4}
      >
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group class="HR_input" controlId="formGridroomKind">
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(event) => {
                setDepartmentName(event.target.value);
              }}
              placeholder="Computer Science, Electronics, Networks...."
            />
          </Form.Group>
          <Form.Group class="HR_input" role="form">
            <Button type="submit" style={{ marginTop: "1%", float: "right" }}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Modal>
      <Modal
        footer={null}
        onCancel={() => {
          setWhich(-1);
          setFlag(!flag);
        }}
        visible={which === 5 || which === 6}
      >
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group class="HR_input" controlId="formGridroomKind">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              required={which == 5}
              type="text"
              onChange={(event) => {
                setCourseName(event.target.value);
              }}
              placeholder="Physics, Math, Computer Science...."
            />
          </Form.Group>
          <Form.Group class="HR_input" controlId="formGridroomKind">
            <Form.Label>Course Code</Form.Label>
            <Form.Control
              required={which == 5}
              type="text"
              onChange={(event) => {
                setCourseCode(event.target.value);
              }}
              placeholder="CSEN 102,MATH 201"
            />
          </Form.Group>

          <Form.Group class="HR_input" controlId="formGridroomKind">
            <Form.Label>teaching slots</Form.Label>
            <Form.Control
              type="number"
              onChange={(event) => {
                setTeachingSlots(event.target.value);
              }}
              placeholder="22,11 ..."
            />
          </Form.Group>
          <Form.Group class="HR_input" controlId="formGridroomKind">
            <Form.Label>coverage </Form.Label>
            <Form.Control
              type="number"
              onChange={(event) => {
                setCourseCoverage(event.target.value);
              }}
              placeholder="22,11 ..."
            />
          </Form.Group>
          <Form.Group class="HR_input" controlId="formGridroomKind">
            <Form.Label>assigned slots</Form.Label>
            <Form.Control
              type="number"
              onChange={(event) => {
                setAssignedSlots(event.target.value);
              }}
              placeholder="22,11 ..."
            />
          </Form.Group>
          <Form.Group class="HR_input" controlId="formGridroomKind">
            <Form.Label as="legend" column sm={2}>
              Cover
            </Form.Label>
            <Form.Check
              onChange={() => {
                setCover(0);
              }}
              type="radio"
              label="False"
              name="type"
              id="False"
            />
            <Form.Check
              onChange={() => {
                setCover(1);
              }}
              type="radio"
              label="True"
              name="type"
              id="True"
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
      </Modal>
    </div>
  );
}

export default Faculties;
