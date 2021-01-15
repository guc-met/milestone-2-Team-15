import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/LoginSidebar.css";
import { Row, Col } from "react-bootstrap";
export default function LoginSideBar(props) {
  return (
    <Col className="LoginSidebarCol">
      <Row className="sidenav"></Row>
      <Row className="red"></Row>
      <Row className="yellow"></Row>
    </Col>
  );
}
