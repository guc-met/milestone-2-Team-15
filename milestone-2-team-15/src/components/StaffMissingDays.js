import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { ListGroup, Button, Card, Row, Col } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Plus } from "react-bootstrap-icons";
require("dotenv").config();
function StaffMissingDays() {
  const history = useHistory();

  const [flag, setFlag] = useState(false);
  const [staffsCards, setStaffsCards] = useState();
  const [staffs, setStaffs] = useState();
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/HR/ViewStaffWithMissingDays`,
        data: {},
        headers: { token: token },
      });

      console.log(response.data);

      const hi = response.data.map((staff) => {
        return (
          <Col class="Location_Col">
            <Card>
              <Card.Body>
                <Card.Title>{staff.email}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        );
      });

      setStaffsCards(hi);
      setStaffs(response.data);
    }
    fetchData();
  }, [flag]);

  return (
    <div class="Hr-Buttons">
      <Row xs={1} sm={2} md={3} lg={4} xl={5} noGutter>
        {staffsCards}
      </Row>
    </div>
  );
}

export default StaffMissingDays;
