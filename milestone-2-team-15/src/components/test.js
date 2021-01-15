import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useHistory } from "react-router-dom";

import { ListGroup, Button, Card, Row, Col } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import LocationChanges from "./LocationChanges";
import { Plus } from "react-bootstrap-icons";
import "./HR.css";
require("dotenv").config();
function Location() {
  const history = useHistory();

  const [flag, setFlag] = useState(false);
  const [locationsCards, setLocationsCards] = useState();
  const [locations, setLocations] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/HR/ViewLocations`
      );
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
                <Button class="Location__Button__delete">
                  <Icon.Trash />
                </Button>

                <Button onclick={editButton()} class="Location__Button__Edit">
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
                history.push("/AddLocation");
              }}
              style={{ textAlign: "center" }}
            >
              <Icon.Plus size={96} />
            </Button>
          </Card>
        </Col>
      );
      setLocationsCards(hi);
      setLocations(response.data);
    }
    fetchData();
  }, [flag]);

  async function editButton() {
    const response = await axios.post(`http://localhost:3000`);
  }
  function onclick() {
    console.log("hi");
    return;
  }

  return (
    <div class="Hr-Buttons">
      <Row xs={1} sm={2} md={3} lg={4} xl={5} noGutter>
        {locationsCards}
      </Row>
      <LocationChanges visibility="false" />
    </div>
  );
}

export default Location;
