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

  const [departmentName, setDepartmentName] = useState("");
  const [departmentID, setDepartmentID] = useState("");

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseID, setCourseID] = useState("");
  const [flag, setFlag] = useState(false);
  const [response, setResponse] = useState();
  const [show, setShow] = useState(false);
  const [which, setWhich] = useState(-1); ///1 add faculty//2 Update faculty//3 add department//4 update department//5 add course//6 update course
  const [validated, setValidated] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setFacultyName("");
      setDepartmentName("");
      setCourseName("");
      setCourseCode("");
      setFacultyID("");
      setDepartmentID("");
      setCourseID("");
      setWhich(-1);

      const response = await axios.get(
        `http://localhost:3000/HR/ViewFaculties`
      );
      console.log(response.data);

      const hi = response.data.map((faculty) => {
        const facultyPanels = faculty.departments.map((department) => {
          const departmentPanels = department.courses.map((course) => {
            let InstructorsPanels = course.Instructors.map((Instructor) => {
              return <Panel>{Instructor.name}</Panel>;
            });
            let TAsPanels = course.TAs.map((TA) => {
              return <Panel>{TA.name}</Panel>;
            });
            let slotsPanels = course.slots.map((slot) => {
              return <Panel>{slot.name}</Panel>;
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

                          //  DeleteCourse();

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
                      Instructors :<Collapse>{InstructorsPanels}</Collapse>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      TAs :<Collapse>{TAsPanels}</Collapse>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Slots :<Collapse>{slotsPanels}</Collapse>
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

                        //  DeleteDepartment();

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
                      setFacultyID(faculty._id);

                      //  DeleteFaculty();

                      // If you don't want click extra trigger collapse, you can prevent this:
                      event.stopPropagation();
                    }}
                  />
                </Tooltip>
              </>
            }
          >
            <p>{faculty.name}</p>
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
      const response = await axios.post(`http://localhost:3000/HR/addFaculty`, {
        name: facultyName,
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
      const response = await axios.post(
        `http://localhost:3000/HR/UpdateFaculty`,
        {
          id: facultyID,
          faculty: {
            name: facultyName,
          },
        }
      );
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
  const DeleteFaculty = async (event) => {
    if (facultyID != "") {
      const response = await axios.post(
        `http://localhost:3000/HR/DeleteFaculty`,
        {
          id: facultyID,
        }
      );
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
      const response = await axios.post(
        `http://localhost:3000/HR/addDepartment`,
        {
          id: facultyID,
          department: {
            name: departmentName,
          },
        }
      );
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
    if (departmentName != "" && facultyID != "" && departmentID != "") {
      const response = await axios.post(
        `http://localhost:3000/HR/UpdateDepartment`,
        {
          id: facultyID,
          department: {
            id: departmentID,
            name: departmentName,
          },
        }
      );
      if (response.status == 200)
        setResponse(<Alert variant="success">{response.data} </Alert>);
      else setResponse(<Alert variant="danger">{response.data} </Alert>);
    } else {
      setResponse(
        <Alert variant="danger">
          Department name or ID or Faculty ID Undefined{" "}
        </Alert>
      );
    }
    setFlag(!flag);
  };
  const DeleteDepartment = async (event) => {
    if (facultyID != "" && departmentID != "") {
      const response = await axios.post(
        `http://localhost:3000/HR/DeleteDepartment`,
        {
          id: facultyID,
          department: {
            id: departmentID,
          },
        }
      );
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
      const response = await axios.post(`http://localhost:3000/HR/addCourse`, {
        facultyid: facultyID,
        departmentid: departmentID,
        course: {
          courseName: courseName,
          code: courseCode,
        },
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
      if (courseName != "") {
        course.courseName = courseName;
      }
      if (courseCode != "") {
        course.courseCode = courseCode;
      }
      console.log(course);
      const response = await axios.post(
        `http://localhost:3000/HR/updateCourse`,
        {
          facultyid: facultyID,
          departmentid: departmentID,
          courseid: courseID,
          course: course,
        }
      );
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
  const DeleteCourse = async (event) => {
    if (facultyID != "" && departmentID != "" && courseID != "") {
      const response = await axios.post(
        `http://localhost:3000/HR/DeleteCourse`,
        {
          facultyid: facultyID,
          departmentid: departmentID,
          courseid: courseID,
        }
      );
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
        visible={which === 5 || which === 6}
      >
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group class="HR_input" controlId="formGridroomKind">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              required
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
              required
              type="text"
              onChange={(event) => {
                setCourseCode(event.target.value);
              }}
              placeholder="CSEN 102,MATH 201"
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
