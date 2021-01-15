import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default function ViewTeachassigns(props) {
  const [facID, setFacID] = useState("");
  const [show, setShow] = useState(false);
  const [teachinassign, setTeachinassign] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      const facdep = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HoD/ViewDepIDandFacID`,
        headers: { token: token },
      });
      console.log("facid" + facdep.data);
      setFacID(facdep.data[0]);
      let facidd = facdep.data[0];

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HoD/viewTeachAssign`,
        data: { facid: facidd },
        headers: { token: token },
      });

      // "course": courses[j].courseName,
      //                 "slotid":slots[k]._id,
      //                 "kind": slots[k].kind,
      //                 "academicMember": slots[k].academicMember,
      //                 "timing": slots[k].timing,
      //                 "courseCode": slots[k].courseCode,
      //                 "location": slots[k].location
      const teachassigns = response.data.map((assignments) => {
        return (
          <Card body className="rowleqaa">
            <Row class="rowleqaa">
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  course name: {assignments.course}
                </Form.Label>
              </Col>
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  slot id: {assignments.slotid}
                </Form.Label>
              </Col>
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  slot kind: {assignments.kind}
                </Form.Label>
              </Col>
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  assigned academic member: {assignments.academicMember}
                </Form.Label>
              </Col>
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  slot timing: {assignments.timing}
                </Form.Label>
              </Col>
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  course id: {assignments.courseCode}
                </Form.Label>
              </Col>
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  slot location: {assignments.location}
                </Form.Label>
              </Col>
              <Col>
                <Form.Label className="InstructorProfileLabel">
                  course name: {assignments.course}
                </Form.Label>
              </Col>
            </Row>
          </Card>
        );
      });
      setTeachinassign(teachassigns);
    }
    fetchData();
  }, [show]);

  return (
    // <Card body className="InstructorProfileCardd">
    <div>{teachinassign}</div>

    // </Card>
  );
}
