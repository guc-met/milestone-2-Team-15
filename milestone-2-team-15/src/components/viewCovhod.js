import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default function InstructorProfile(props) {
  const [facID, setFacID] = useState("");
  const [show, setShow] = useState(false);
  const [covOfCourses, setCovOfCourses] = useState("");
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
        url: `${process.env.REACT_APP_URL}/HoD/viewCoursesCover`,
        data: { facid: facidd },
        headers: { token: token },
      });
      const coursecoverages = response.data.map((coverage) => {
        return (
          <Row>
            <Col>
              <Form.Label className="InstructorProfileLabel">
                {coverage}
              </Form.Label>
            </Col>
          </Row>
        );
      });
      setCovOfCourses(coursecoverages);
    }
    fetchData();
  }, [show]);

  return (
    <Card body className="InstructorProfileCardd">
      {covOfCourses}
    </Card>
  );
}
