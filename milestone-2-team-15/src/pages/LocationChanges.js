import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useHistory } from "react-router-dom";

import {
  ListGroup,
  Form,
  Modal,
  Button,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import { Plus } from "react-bootstrap-icons";
import "./HR.css";
require("dotenv").config();
function LocationChanges(props) {
  const [visibility, setVisibility] = useState(false);
  return (
    <Modal
      show={visibility}
      onHide={() => {
        setVisibility(false);
      }}
    >
      <Form>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            roomKind:
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="tutorial room"
              name="tutorial room"
              id="tutorialRoom"
            />
            <Form.Check
              type="radio"
              label="lecture hall"
              name="lecture hall"
              id="lectureHall"
            />
            <Form.Check type="radio" label="office" name="office" id="office" />
            <Form.Check type="radio" label="lab" name="lab" id="lab" />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Building Character:
          </Form.Label>
          <Col sm={10}>
            <Form.Check type="radio" label="B" name="B" id="B" />
            <Form.Check type="radio" label="C" name="C" id="C" />
            <Form.Check type="radio" label="D" name="D" id="D" />
            <Form.Check type="radio" label="G" name="G" id="G" />
          </Col>
        </Form.Group>
        <Form.Group controlId="formGridroomKind">
          <Form.Label> FloorNumber :</Form.Label>
          <Form.Control placeholder="5,4,1..." />
        </Form.Group>
        <Form.Group controlId="formGridroomKind">
          <Form.Label>roomNumber:</Form.Label>
          <Form.Control placeholder="203,404,102..." />
        </Form.Group>

        <Form.Group controlId="formGridroomKind">
          <Form.Label>NumberOfAvailablePeople :</Form.Label>
          <Form.Control placeholder="50,40,10..." />
        </Form.Group>
        <Form.Group controlId="formGridNumberOfPersons">
          <Form.Label>NumberOfPersons</Form.Label>
          <Form.Control placeholder="50,40,10..." />
        </Form.Group>

        <Button
          onSubmit={handleSubmit}
          style={{ float: "right" }}
          variant="primary"
        >
          Submit
        </Button>
      </Form>
    </Modal>
  );
}
const handleSubmit = (event) => {
  console.log(event);
};

export default LocationChanges;
