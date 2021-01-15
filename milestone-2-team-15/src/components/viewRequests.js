import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  ListGroup,
  Modal,
  Form,
  Button,
  Card,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Plus } from "react-bootstrap-icons";
require("dotenv").config();
const token = localStorage.getItem("token");
function Viewreq() {
  const history = useHistory();
  const arr = [];
  const [requestcards, setrequestcards] = useState();

  useEffect(() => {
    async function cancelreq(reqid, reqtype) {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/ac_routes/cancelRequest`,
        data: {
          type: reqtype,
          rid: reqid,
        },
        headers: { token: token },
      });
      console.log(response);
    }
    let response = [];
    async function view() {
      if (checkedAll) {
        response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/ac_routes/viewAllRequests`,
          headers: { token: token },
        });
      } else if (checkedAccepted) {
        response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/ac_routes/viewAccepted`,
          headers: { token: token },
        });
      } else if (checkedRejected) {
        response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/ac_routes/viewRejected`,
          headers: { token: token },
        });
      } else if (checkedPending) {
        response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/ac_routes/viewPending`,
          headers: { token: token },
        });
      }

      if (response.length == 0) {
        return;
      }
      console.log(response);
      let requesttype;
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i] + "" === "link requests") {
          requesttype = "linking slot request";
          continue;
        }
        if (response.data[i] + "" === "leaves requests") {
          requesttype = "leave request";
          continue;
        }
        if (response.data[i] + "" === "change requests") {
          requesttype = "change day off request";

          continue;
        }
        if (response.data[i] + "" === "replacing requests") {
          requesttype = "replacing requests";
          continue;
        } else {
          const request = response.data[i];

          if (requesttype == "linking slot request") {
            if (request.state == "pending")
              arr.push(
                <Col class="Location_Col">
                  <Card>
                    <Card.Body>
                      <Card.Title>{requesttype}</Card.Title>
                    </Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        {"Request ID :" + request._id}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Linked slot ID :" + request.slotid}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"State:" + request.state}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Slot number:" + request.slot}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"courseID:" + request.coursecode}
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => {
                          cancelreq(request._id, "linking slot");
                        }}
                        class="Location__Button__delete"
                      >
                        <Icon.XOctagonFill />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            else
              arr.push(
                <Col class="Location_Col">
                  <Card>
                    <Card.Body>
                      <Card.Title>{requesttype}</Card.Title>
                    </Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        {"Request ID :" + request._id}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Linked slot ID :" + request.slotid}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"State:" + request.state}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Slot number:" + request.slot}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"courseID:" + request.coursecode}
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body style={{ textAlign: "center" }}></Card.Body>
                  </Card>
                </Col>
              );
          }
          if (requesttype == "leave request") {
            if (request.state == "pending")
              arr.push(
                <Col class="Location_Col">
                  <Card>
                    <Card.Body>
                      <Card.Title>{requesttype}</Card.Title>
                    </Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        {"Request ID :" + request._id}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Request sender mail:" + request.smail}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Replacment mail:" + request.rmail}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Sender ID:" + request.requesterid}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Replacment ID:" + request.replacmentid}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Replacment acceptance:" +
                          request.replacmentAcceptance}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"slot number:" + request.slotnumber}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"leave type:" + request.leaveType}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"state:" + request.state}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"HOD name:" + request.HoDname}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"comment:" + request.comment}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Date:" +
                          request.day +
                          "/" +
                          request.month +
                          "/" +
                          request.year}
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => {
                          cancelreq(request._id, "leave");
                        }}
                        class="Location__Button__delete"
                      >
                        <Icon.XOctagonFill />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            else
              arr.push(
                <Col class="Location_Col">
                  <Card>
                    <Card.Body>
                      <Card.Title>{requesttype}</Card.Title>
                    </Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        {"Request ID :" + request._id}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Request sender mail:" + request.smail}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Replacment mail:" + request.rmail}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Sender ID:" + request.requesterid}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Replacment ID:" + request.replacmentid}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Replacment acceptance:" +
                          request.replacmentAcceptance}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"slot number:" + request.slotnumber}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"leave type:" + request.leaveType}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"state:" + request.state}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"HOD name:" + request.HoDname}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"comment:" + request.comment}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Date:" +
                          request.day +
                          "/" +
                          request.month +
                          "/" +
                          request.year}
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body style={{ textAlign: "center" }}></Card.Body>
                  </Card>
                </Col>
              );
          }

          if (requesttype == "change day off request") {
            if (request.state == "pending")
              arr.push(
                <Col class="Location_Col">
                  <Card>
                    <Card.Body>
                      <Card.Title>{requesttype}</Card.Title>
                    </Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        {"Request ID :" + request._id}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Request sender mail:" + request.smail}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Request sender name" + request.name}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"the needed Day off:" + request.day}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"state:" + request.state}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"HOD name:" + request.HoDname}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"comment:" + request.comment}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Date:" +
                          request.day +
                          "/" +
                          request.month +
                          "/" +
                          request.year}
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => {
                          cancelreq(request._id, "change");
                        }}
                        class="Location__Button__delete"
                      >
                        <Icon.XOctagonFill />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            else
              arr.push(
                <Col class="Location_Col">
                  <Card>
                    <Card.Body>
                      <Card.Title>{requesttype}</Card.Title>
                    </Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        {"Request ID :" + request._id}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Request sender mail:" + request.smail}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Request sender name" + request.name}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"the needed Day off:" + request.day}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"state:" + request.state}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"HOD name:" + request.HoDname}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"comment:" + request.comment}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {"Date:" +
                          request.day +
                          "/" +
                          request.month +
                          "/" +
                          request.year}
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body style={{ textAlign: "center" }}></Card.Body>
                  </Card>
                </Col>
              );
          }
        }
      }
      setrequestcards(arr);
    }
    view();
  });

  const [checkedAll, setcheckedAll] = useState(false);
  const [checkedAccepted, setcheckedAccepted] = useState(false);
  const [checkedRejected, setcheckedRejected] = useState(false);
  const [checkedPending, setcheckedPending] = useState(false);

  function redirectandcheck(checkedbutton) {
    if (checkedbutton === "all") {
      setcheckedAll(true);
      setcheckedPending(false);
      setcheckedRejected(false);
      setcheckedAccepted(false);
    } else if (checkedbutton === "accepted") {
      setcheckedAll(false);
      setcheckedPending(false);
      setcheckedRejected(false);
      setcheckedAccepted(true);
    } else if (checkedbutton === "rejected") {
      setcheckedAll(false);
      setcheckedPending(false);
      setcheckedRejected(true);
      setcheckedAccepted(false);
    } else if (checkedbutton === "pending") {
      setcheckedAll(false);
      setcheckedPending(true);
      setcheckedRejected(false);
      setcheckedAccepted(false);
    }
  }

  return (
    <div class="Hr-Buttons">
      <>
        <ButtonGroup toggle>
          <ToggleButton
            type="radio"
            variant="secondary"
            name="radio"
            value="{radio.value}"
            checked={checkedAll}
            onChange={(e) => redirectandcheck("all")}
          >
            All requests
          </ToggleButton>
          <ToggleButton
            type="radio"
            variant="secondary"
            name="radio"
            value="{radio.value}"
            checked={checkedAccepted}
            onChange={(e) => redirectandcheck("accepted")}
          >
            Accepted requests
          </ToggleButton>
          <ToggleButton
            type="radio"
            variant="secondary"
            name="radio"
            value="{radio.value}"
            checked={checkedRejected}
            onChange={(e) => redirectandcheck("rejected")}
          >
            Rejected requests
          </ToggleButton>
          <ToggleButton
            type="radio"
            variant="secondary"
            name="radio"
            value="{radio.value}"
            checked={checkedPending}
            onChange={(e) => redirectandcheck("pending")}
          >
            Pending requests
          </ToggleButton>
        </ButtonGroup>
      </>
      <Row xs={1} sm={2} md={2} lg={2} xl={4} noGutter>
        {requestcards}
      </Row>
    </div>
  );
}
export default Viewreq;
