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
require("dotenv").config();
function LocationChanges(props) {
  const [visibility, setVisibility] = useState(true);
  const [roomKind, setRoomKind] = useState();
  const [buildingCharacter, setBuildingCharacter] = useState("");
  const [floorNumber, setFloorNumber] = useState(0);
  const [roomNumber, setRoomNumber] = useState(0);
  const [NumberOfAvailablePeople, setNumberOfAvailablePeople] = useState(0);
  const [NumberOfPersons, setNumberOfPersons] = useState(0);

  const handleSubmit = async (event) => {
    console.log(roomKind);
    console.log(buildingCharacter);
    console.log(floorNumber);
    console.log(roomNumber);
    console.log(NumberOfAvailablePeople);
    console.log(NumberOfPersons);
    console.log(props.edit);
    if (props.edit == false) {
      const response = await axios.post(
        `http://localhost:3000/HR/addLocation`,
        {
          roomKind: roomKind,
          BuildingCharachter: buildingCharacter,
          FloorNumber: floorNumber,
          roomNumber: roomNumber,
          NumberOfAvailablePeople: NumberOfAvailablePeople,
          NumberOfPersons: NumberOfPersons,
        }
      );
      console.log(response);
    } else {
      console.log("hi");
    }
  };

  return (
    <Modal
      show={props.visibility}
      onHide={() => {
        setVisibility(false);
      }}
    >
      <Form onFinish={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            roomKind:
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              onChange={() => {
                setRoomKind("tutorial room");
              }}
              type="radio"
              label="tutorial room"
              name="tutorial room"
              id="tutorialRoom"
            />
            <Form.Check
              onChange={() => {
                setRoomKind("lecture hall");
              }}
              type="radio"
              label="lecture hall"
              name="lecture hall"
              id="lectureHall"
            />
            <Form.Check
              onChange={() => {
                setRoomKind("office");
              }}
              type="radio"
              label="office"
              name="office"
              id="office"
            />
            <Form.Check
              onChange={() => {
                setRoomKind("lab");
              }}
              type="radio"
              label="lab"
              name="lab"
              id="lab"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Building Character:
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              onChange={() => {
                setBuildingCharacter("B");
              }}
              type="radio"
              label="B"
              name="B"
              id="B"
            />
            <Form.Check
              onChange={() => {
                setBuildingCharacter("C");
              }}
              type="radio"
              label="C"
              name="C"
              id="C"
            />
            <Form.Check
              onChange={() => {
                setBuildingCharacter("D");
              }}
              type="radio"
              label="D"
              name="D"
              id="D"
            />
            <Form.Check
              onChange={() => {
                setBuildingCharacter("G");
              }}
              type="radio"
              label="G"
              name="G"
              id="G"
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="formGridroomKind">
          <Form.Label> FloorNumber :</Form.Label>
          <Form.Control
            type="number"
            onChange={(event) => {
              setFloorNumber(event.target.value);
            }}
            placeholder="5,4,1..."
          />
        </Form.Group>
        <Form.Group controlId="formGridroomKind">
          <Form.Label>roomNumber:</Form.Label>
          <Form.Control
            type="number"
            onChange={(event) => {
              setRoomNumber(event.target.value);
            }}
            placeholder="203,404,102..."
          />
        </Form.Group>

        <Form.Group controlId="formGridroomKind">
          <Form.Label>NumberOfAvailablePeople :</Form.Label>
          <Form.Control
            type="number"
            onChange={(event) => {
              setNumberOfAvailablePeople(event.target.value);
            }}
            placeholder="50,40,10..."
          />
        </Form.Group>
        <Form.Group controlId="formGridNumberOfPersons">
          <Form.Label>NumberOfPersons</Form.Label>
          <Form.Control
            type="number"
            onChange={(event) => {
              setNumberOfPersons(event.target.value);
            }}
            placeholder="50,40,10..."
          />
        </Form.Group>
        <Form.Group role="form">
          <Button
            // type="submit"
            onClick={handleSubmit}
            style={{ float: "right" }}
            variant="primary"
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Modal>
  );
}

export default LocationChanges;
