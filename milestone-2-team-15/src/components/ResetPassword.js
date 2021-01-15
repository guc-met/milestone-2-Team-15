import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import "../stylesheets/ResetPassword.css";
import axios from "axios";

export default function ResetPassword(props) {
  const token = localStorage.getItem("token");
  const [NewPassword, setNewPassword] = useState("");
  const [NewRenterPassword, setNewRenterPassword] = useState("");
  const [NotsameError, setNotsameError] = useState("");
  const [Same, setSame] = useState(false);
  const [ResetSuccess, setResetSuccess] = useState("");
  const [ResetAgainWithSamePassword, setResetAgainWithSamePassword] = useState(
    ""
  );

  useEffect(() => {
    if (NewPassword === "" && NewRenterPassword === "") {
      setSame(false);
      setResetSuccess("");
    } else if (
      !(NewPassword === NewRenterPassword) &&
      !(NewRenterPassword === "")
    ) {
      setNotsameError("Please enter the same password");
      setSame(false);
      setResetSuccess("");
    } else if (
      !(NewPassword === NewRenterPassword) &&
      NewRenterPassword === ""
    ) {
      setNotsameError("");
      setSame(false);
      setResetSuccess("");
      setResetAgainWithSamePassword("");
    } else if (
      NewPassword === NewRenterPassword &&
      !(NewPassword === "" && NewRenterPassword === "")
    ) {
      setNotsameError("");
      setSame(true);
    }
    if (ResetSuccess === "RESET Successfully") {
      setSame(false);
      setResetAgainWithSamePassword("");
    }
  });

  const handleReset = async () => {
    console.log(Same);
    if (Same == true) {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/resetPassword`,
        data: {
          password: NewPassword,
        },
        headers: {
          token: token,
        },
      }).then((res) => {
        console.log(res);
        setNotsameError();
        setResetSuccess("RESET Successfully");
        setResetAgainWithSamePassword("");
      });
    } else {
      setResetAgainWithSamePassword("please enter different password");
      setResetSuccess("");
    }
  };
  return (
    <Card className="ResetPasswordCard">
      <Form.Group as={Row} controlId="formBasicPassword">
        <Form.Label className="ResetPasswordLabel">
          Enter New Password
        </Form.Label>
        <Col xs={6} className="ResetPasswordtextBoxCol">
          <Form.Control
            type="password"
            placeholder="Password"
            className="ResetPasswordTextBox"
            value={NewPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formBasicPassword">
        <Form.Label className="ResetPasswordLabel">
          Confirm New Password
        </Form.Label>
        <Col xs={6} className="ResetPasswordtextBoxCol">
          <Form.Control
            type="password"
            placeholder="Password"
            className="ResetPasswordTextBox"
            value={NewRenterPassword}
            onChange={(e) => {
              setNewRenterPassword(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {NotsameError}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Col className="LoginButtonCol ">
        <Button
          variant="dark "
          size="ResetPassword"
          type="submit"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Form.Control.Feedback type="valid">
          {ResetSuccess}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {ResetAgainWithSamePassword}
        </Form.Control.Feedback>
      </Col>
    </Card>
  );
}
