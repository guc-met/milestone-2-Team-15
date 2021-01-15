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
function Viewdayoff(props) {
  const [facID, setFacID] = useState("");
  const [stafftype, setstafftype] = useState("");
  const [staffID, setstaffID] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [selectedoperation, setSelectedoperation] = useState();
  const [toview, setToview] = useState("");
  const [toview2, setToview2] = useState("");
  const [opt1, setop1] = useState(""); //view all staff day-off route
  const [opt2, setop2] = useState(""); //view specific staff day-off route
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchData() {
      //   router.route("/viewstaffdayoff").post(async (req, res) => {//number 3 in 4.1 first half
      //     const headid = req.id;
      //     const facultyid = req.body.facid;

      // router.route("/viewonestaffdayoff").post(async (req, res) => {//number 3 in 4.1 2nd half
      //     const headid = req.id;
      //     const facultyid = req.body.facid;
      //     const staffid = req.body.sid;
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
        url: `${process.env.REACT_APP_URL}/HoD/viewstaff`,
        data: { facid: facidd },
        headers: { token: token },
      });
      const staffs = response.data.map((staff1, index) => {
        return (
          <Dropdown.Item>
            <Button onClick={() => handleClick(staff1.ID, facidd)}>
              {staff1.email}
            </Button>
          </Dropdown.Item>
        );
      });
      setop2(staffs);

      const response2 = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HoD/viewstaffdayoff`,
        data: { facid: facidd },
        headers: { token: token },
      });
      console.log("response:" + response2);
      const daysOFF = response2.data.map((routeresponse, index) => {
        return (
          <Row>
            <Col>
              <Form.Label className="InstructorProfileLabel">
                {routeresponse}
              </Form.Label>
            </Col>
          </Row>
        );
      });
      setop1(daysOFF);
    }
    fetchData();
  }, [show]);

  const handleClick = async (staffid, facid) => {
    // console.log(courseID);
    // setCourseID(courseID);
    // setCoursename(coursename);
    // setShow(true);
    console.log("fac =" + facID);

    setstaffID(staffid);
    const responsestaffdayoff = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/HoD/viewonestaffdayoff`,
      data: { sid: staffid, facid: facid },
      headers: { token: token },
    });
    //setstaff(responsestaff.data);
    const responsestafftype = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/HoD/ViewStaffType`,
      data: { sid: staffid },
      headers: { token: token },
    });
    // let dayoff = responsestaff.dayOff;
    let view = (
      <Row>
        <Col>
          <Form.Label className="InstructorProfileLabel">
            Dayoff: {responsestaffdayoff.data}
          </Form.Label>
        </Col>
      </Row>
    );
    setToview2(view);
    setstafftype(responsestafftype.data);
    setShow2(true);
  };

  const handleClickchooseOpt = async (operation) => {
    setShow(true);
    if (operation == "onestaff") {
      const view = (
        <div class="hod-Buttons">
          <Dropdown>
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
              class="hod-Button"
            >
              please choose a staff to view her/his dayoff:
            </Dropdown.Toggle>
            <Dropdown.Menu>{opt2}</Dropdown.Menu>
          </Dropdown>
        </div>
      );
      setToview(view);
      setSelectedoperation("a specific staff dayoff ");
    } else {
      const view = (
        <Card body className="InstructorProfileCardd">
          {opt1}
        </Card>
      );
      setToview(view);
      setSelectedoperation("all staffs dayoff ");
    }
  };

  return (
    <div class="hod-Buttons">
      <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          id="dropdown-basic"
          class="hod-Button"
        >
          how would you prefer to view the daysOff of your staff ?
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Button onClick={() => handleClickchooseOpt("onestaff")}>
              View specific staff dayOff
            </Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Button onClick={() => handleClickchooseOpt("allstaff")}>
              View all staffs dayOff
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title> you are now viewing {selectedoperation} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {toview}
          <Modal show={show2} onHide={() => setShow2(false)}>
            <Modal.Header>
              <Modal.Title>
                {" "}
                you are now viewing {stafftype} with ID {staffID} dayoff{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card body className="InstructorProfileCardd">
                {toview2}
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow2(false)}>
                ok
              </Button>
            </Modal.Footer>
          </Modal>
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

export default Viewdayoff;
