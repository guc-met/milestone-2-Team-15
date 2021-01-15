import React from "react";
import {
  Dropdown,
  Navbar,
  DropdownButton,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import arrowWhite from "../images/arrowwhite.png";
import arrowBlack from "../images/download.png";
import Logout from "./Logout";
import StaffViewMissingDaysButton from "./StaffViewMissingDaysbutton";
import StaffViewMissingHoursButton from "./StaffViewMissingHoursbutton";
import StaffViewExtraHoursButton from "./StaffViewExtraHoursbutton";
import StaffResetPassbutton from "./StaffResetPassbutton";

import StaffViewAttendancebutton from "./StaffViewAttendancebutton";
import StaffProfile from "./StaffProfile";
import Signin from "./Signin";
import Sign from "./StaffSignbutton";
import Signout from "./Signout";
import logoo from "../images/Guc.png";
export default function dropDown(props) {
  const link = "/" + props.type;
  return (
    <Navbar
      style={{
        zIndex: "1",
        width: "100%",
      }}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand href={link}>
        <img src={logoo} height="30" width="60" w alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <StaffProfile type={props.type} />
          <StaffViewExtraHoursButton type={props.type} />
          <StaffViewMissingHoursButton type={props.type} />
          {/* <NavDropdown title="Hours" id="collasible-nav-dropdown"  className="ViewStaffAttenndanceDropDownStyle">
        <NavDropdown.Item ></NavDropdown.Item>
        
        <NavDropdown.Item > </NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown> */}

          <Signin />
          <Signout />

          <StaffViewAttendancebutton type={props.type} />

          <StaffResetPassbutton type={props.type} />

          {/* <StaffViewExtraHoursButton type="Instructor"/> */}

          {/* <StaffViewMissingHoursButton type="Instructor"/> */}

          {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
          <StaffViewMissingDaysButton type={props.type} />
        </Nav>
        {/* <Form inline> */}
          <Logout />
        {/* </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
