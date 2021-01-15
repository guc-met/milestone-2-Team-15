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
  Alert,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Plus } from "react-bootstrap-icons";
require("dotenv").config();
function Location() {
  const history = useHistory();

  const [flag, setFlag] = useState(false);
  const [locationsCards, setLocationsCards] = useState();
  const [visibility, setVisibility] = useState(false);
  const [id, setId] = useState(0);
  const [edit, setEdit] = useState(false);
  const [roomKind, setRoomKind] = useState("");
  const [buildingCharacter, setBuildingCharacter] = useState("");
  const [floorNumber, setFloorNumber] = useState(-1);
  const [roomNumber, setRoomNumber] = useState(-1);
  const [NumberOfAvailablePeople, setNumberOfAvailablePeople] = useState(-1);
  const [NumberOfPersons, setNumberOfPersons] = useState(-1);
  const [validated, setValidated] = useState(true);
  const [response, setResponse] = useState();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/HR/ViewLocations`,
        data: {},
        headers: { token: token },
      });

      console.log(response.data);

      const hi = response.data.map((location) => {
        return (
          <Col class="Location_Col">
            <Card>
              <Card.Body>
                <Card.Title>
                  {location.BuildingCharachter + location.roomNumber}
                </Card.Title>
              </Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  {"Floor Number :" + location.FloorNumber}
                </ListGroup.Item>
                <ListGroup.Item>
                  {"Number Of Persons:" + location.NumberOfPersons}
                </ListGroup.Item>
                <ListGroup.Item>
                  {"Number Of Available People:" +
                    location.NumberOfAvailablePeople}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body style={{ textAlign: "center" }}>
                <Button
                  onClick={() => {
                    if (location.NumberOfAvailablePeople != 0) {
                      setResponse(
                        <Alert variant="danger">
                          You have to transfer all staff befor deleting this
                          location
                        </Alert>
                      );
                    } else {
                      handledelete(location.locationId);
                    }
                  }}
                  variant="dark"
                  class="Location__Button__delete"
                >
                  <Icon.Trash />
                </Button>

                <Button
                  onClick={() => {
                    setId(location.locationId);
                    setEdit(true);
                    setVisibility(true);
                  }}
                  variant="dark"
                  class="Location__Button__Edit"
                >
                  <Icon.PencilSquare />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      });
      hi.push(
        <Col class="Location__Col">
          <Card>
            <Button
              onClick={() => {
                setEdit(false);
                setVisibility(true);
              }}
            >
              <Icon.Plus size={96} />
            </Button>
          </Card>
        </Col>
      );
      setLocationsCards(hi);
    }
    fetchData();
  }, [flag]);

  const handledelete = async (locationId) => {
    const token = localStorage.getItem("token");

    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/HR/DeleteLocation`,
      data: {
        id: locationId,
      },
      headers: { token: token },
    });
    setFlag(!flag);
    if (response.status == 200)
      setResponse(<Alert variant="success">{response.data} </Alert>);
    else setResponse(<Alert variant="danger">{response.data} </Alert>);
  };
  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    console.log(roomKind);
    console.log(buildingCharacter);
    console.log(floorNumber);
    console.log(roomNumber);
    console.log(NumberOfAvailablePeople);
    console.log(NumberOfPersons);
    console.log(edit);

    if (edit == false) {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HR/addLocation`,
        data: {
          roomKind: roomKind,
          BuildingCharachter: buildingCharacter,
          FloorNumber: floorNumber,
          roomNumber: roomNumber,
          NumberOfAvailablePeople: NumberOfAvailablePeople,
          NumberOfPersons: NumberOfPersons,
        },
        headers: { token: token },
      });

      if (response.status == 200)
        setResponse(<Alert variant="success">{response.data} </Alert>);
      else setResponse(<Alert variant="danger">{response.data} </Alert>);
    } else {
      const location = {};
      if (buildingCharacter != "")
        location.BuildingCharachter = buildingCharacter;
      if (roomKind != "") location.roomKind = roomKind;
      if (floorNumber != -1) location.FloorNumber = floorNumber;
      if (roomNumber != -1) location.roomNumber = roomNumber;
      if (NumberOfAvailablePeople != -1)
        location.NumberOfAvailablePeople = NumberOfAvailablePeople;
      if (NumberOfPersons != -1) location.NumberOfPersons = NumberOfPersons;
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/HR/updateLocation`,
        data: {
          id: id,
          location: location,
        },
        headers: { token: token },
      });

      console.log(response.data);
      if (response.status == 200)
        setResponse(<Alert variant="success">{response.data} </Alert>);
      else setResponse(<Alert variant="danger">{response.data} </Alert>);
    }

    setRoomKind("");
    setBuildingCharacter("");
    setFloorNumber(-1);
    setRoomNumber(-1);
    setNumberOfPersons(-1);
    setNumberOfAvailablePeople(-1);
    setFlag(!flag);
    setVisibility(false);
  };

  return (
    <div class="Hr-Buttons">
      <Row xs={1} sm={2} md={3} lg={4} xl={5} noGutter>
        {locationsCards}
      </Row>
      {response}

      <Modal
        show={visibility}
        onHide={() => {
          setVisibility(false);
        }}
      >
        <Form validated={edit ? false : validated} onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              roomKind:
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                required={!edit}
                onChange={() => {
                  setRoomKind("tutorial room");
                }}
                type="radio"
                label="tutorial room"
                name="roomKind"
                id="tutorialRoom"
              />
              <Form.Check
                onChange={() => {
                  setRoomKind("lecture hall");
                }}
                type="radio"
                label="lecture hall"
                name="roomKind"
                id="lectureHall"
              />
              <Form.Check
                onChange={() => {
                  setRoomKind("office");
                }}
                type="radio"
                label="office"
                name="roomKind"
                id="office"
              />
              <Form.Check
                onChange={() => {
                  setRoomKind("lab");
                }}
                type="radio"
                label="lab"
                name="roomKind"
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
                required={!edit}
                onChange={() => {
                  setBuildingCharacter("B");
                }}
                type="radio"
                label="B"
                name="BuildingCharacter"
                id="B"
              />
              <Form.Check
                onChange={() => {
                  setBuildingCharacter("C");
                }}
                type="radio"
                label="C"
                name="BuildingCharacter"
                id="C"
              />
              <Form.Check
                onChange={() => {
                  setBuildingCharacter("D");
                }}
                type="radio"
                label="D"
                name="BuildingCharacter"
                id="D"
              />
              <Form.Check
                onChange={() => {
                  setBuildingCharacter("G");
                }}
                type="radio"
                label="G"
                name="BuildingCharacter"
                id="G"
              />
            </Col>
          </Form.Group>
          <Form.Group controlId="formGridroomKind">
            <Form.Label> FloorNumber :</Form.Label>
            <Form.Control
              required={!edit}
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
              required={!edit}
              onChange={(event) => {
                setRoomNumber(event.target.value);
              }}
              placeholder="203,404,102..."
            />
          </Form.Group>

          <Form.Group controlId="formGridroomKind">
            <Form.Label>NumberOfAvailablePeople :</Form.Label>
            <Form.Control
              required={!edit}
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
              required={!edit}
              type="number"
              onChange={(event) => {
                setNumberOfPersons(event.target.value);
              }}
              placeholder="50,40,10..."
            />
          </Form.Group>
          <Form.Group role="form">
            <Button variant="primary" onClick={() => setVisibility(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ float: "right" }}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    </div>
  );
}

export default Location;
