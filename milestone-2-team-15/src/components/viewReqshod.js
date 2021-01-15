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
import "bootstrap/dist/css/bootstrap.min.css";
const token = localStorage.getItem("token");
export default function InstructorProfile(props) {
  const [facID, setFacID] = useState("");
  const [show, setShow] = useState(false);
  const [teachinassign, setTeachinassign] = useState("");
  const [changereqs, setChangereqs] = useState("");
  const [leavereqs, setLeavereqs] = useState("");
  const [allreqs, setAllreqs] = useState("");
  //const [comment, setComment]= useState("");
  const [response, setResponse] = useState();
  const change = "";
  const leave = "";
  let comment = "";
  useEffect(() => {
    async function fetchData() {
      //   router.route("/viewAllreq").post(async (req, res) => {//number 4 in 4.1
      //     const headid = req.body.id;
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
        url: `${process.env.REACT_APP_URL}/HoD/viewAllreq`,
        headers: { token: token },
      });

      const requests = response.data.map((req) => {
        let x = "";
        if (req.type == "Change Dayoff") {
          // "type":"change dayOff",
          //       "smail": changereqs[i].smail,
          //       "name": changereqs[i].name,
          //       "day": changereqs[i].day,
          //       "state": changereqs[i].state,
          //       "HoDname": changereqs[i].HoDname,
          //       "comment": changereqs[i].comment
          x = (
            <Card body className="rowleqaa">
              <Row class="rowleqaa">
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    request id: {req.reqid}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    request type: {req.type}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    staff mail: {req.smail}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    staff name: {req.name}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    requested new day: {req.day}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    request state: {req.state}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    name of the head of department: {req.HoDname}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    comment when needed: {req.comment}
                  </Form.Label>
                </Col>
              </Row>
              <Row class="rowleqaa">
                <Form.Group class="hod_input" controlId="formGridroomKind">
                  <Form.Label class="tagreeb">
                    {" "}
                    Enter a comment (optoinal):
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(event) => {
                      //setComment(event.target.value);
                      comment = event.target.value;
                    }}
                    placeholder="comment"
                  />
                </Form.Group>
              </Row>
              <Row class="rowleqaa">
                <Col>
                  <Button
                    onClick={() => handleaccept("ac-100", req.reqid, req.type)}
                  >
                    Accept request
                  </Button>
                </Col>
                <Col>
                  <Button
                    onClick={() => handlereject("ac-100", req.reqid, req.type)}
                  >
                    Reject request
                  </Button>
                </Col>
              </Row>
            </Card>
          );

          // setChangereqs(x);
        } else {
          // "type":"Leave",
          //       "smail": leavereqs[i].smail,
          //       "rmail": leavereqs[i].rmail,
          //       "day": leavereqs[i].day,
          //       "month": leavereqs[i].month,
          //       "year": leavereqs[i].year,
          //       "name": leavereqs[i].name,
          //       "replacementName": leavereqs[i].replacementName,
          //       "requesterid":leavereqs[i].requesterid,
          //       "replacmentid":leavereqs[i].replacmentid,
          //       "replacmentAcceptance":leavereqs[i].replacmentAcceptance,
          //       "slotnumber": leavereqs[i].slotnumber,
          //       "leaveType": leavereqs[i].leaveType,
          //       "state": leavereqs[i].state,
          //       "HoDname": leavereqs[i].HoDname,
          //       "comment": leavereqs[i].comment
          x = (
            <Card body className="rowleqaa">
              <Row class="rowleqaa">
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    request id: {req.reqid}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    request type: {req.type}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    leave type: {req.leaveType}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    staff mail: {req.smail}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    staff name: {req.name}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    staff id: {req.requesterid}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    replacement staff mail if available: {req.rmail}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    replacement staff name if available: {req.replacementName}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    replacement staff id if available: {req.replacmentid}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    replacement acceptance id if available:{" "}
                    {req.replacmentAcceptance}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    day in the week of leave: {req.day}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    day in month of leave: {req.realday}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    month of leave: {req.month}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    year of leave: {req.year}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    request state: {req.state}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    slot id: {req.slotnumber}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    name of the head of department: {req.HoDname}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="InstructorProfileLabel">
                    comment if available: {req.comment}
                  </Form.Label>
                </Col>
              </Row>
              <Row class="rowleqaa">
                <Form.Group class="hod_input" controlId="formGridroomKind">
                  <Form.Label class="tagreeb">
                    {" "}
                    Enter a comment (optoinal):
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(event) => {
                      // console.log("bla:"+event.target.value)
                      // setComment(event.target.value);
                      comment = event.target.value;
                    }}
                    placeholder="comment"
                  />
                </Form.Group>
              </Row>
              <Row class="rowleqaa">
                <Col>
                  <Button
                    onClick={() => handleaccept("ac-100", req.reqid, req.type)}
                  >
                    Accept request
                  </Button>
                </Col>
                <Col>
                  <Button
                    onClick={() => handlereject("ac-100", req.reqid, req.type)}
                  >
                    Reject request
                  </Button>
                </Col>
              </Row>
            </Card>
          );

          //setChangereqs(setLeavereqs);
        }
        return x;
      });
      setAllreqs(requests);
    }
    fetchData();
  }, [show]);

  // router.route("/acceptreq").post(async (req, res) => {//Accept req number 5 in 4.1
  //     const headid = req.body.id;
  //     const reqid = req.body.rid;
  //     const reqtype = req.body.rtype;
  // router.route("/rejectreq").post(async (req, res) => {//Reject req number 6 in 4.1
  //     const headid = req.body.id; // 6
  //     const reqid = req.body.rid;// "5fe2ab1d8fa26d38e8bc8ff7"
  //     const reqtype = req.body.rtype; //leave
  const handleaccept = async (headid, reqid, reqtype) => {
    console.log("type:" + reqtype);
    console.log(comment);
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/HoD/acceptreq`,
      data: { rid: reqid, rtype: reqtype, rcomment: comment },
      headers: { token: token },
    });
    // if (response.status == 200)
    setResponse(<Alert variant="success">{response.data} </Alert>);
  };

  const handlereject = async (headid, reqid, reqtype) => {
    console.log("blaaaa:" + comment);
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/HoD/rejectreq`,
      data: { rid: reqid, rtype: reqtype, rcomment: comment },
      headers: { token: token },
    });
    // if (response.status == 200)
    setResponse(<Alert variant="success">{response.data} </Alert>);
  };

  console.log("change:" + changereqs);
  console.log("leave:" + leavereqs);
  return (
    // <Card body className="InstructorProfileCardd">
    <div>
      <div class="Location_plus_card">{response}</div>
      {allreqs}
    </div>

    // </Card>
  );
}
