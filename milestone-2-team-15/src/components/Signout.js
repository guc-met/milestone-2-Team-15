import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../stylesheets/signout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import backendlink from "../backendlink";
import { useHistory } from "react-router-dom";
export default function Signout(props) {
  const history = useHistory();
  const [signoutmessage, setSignoutmessage] = useState("");
  const [signouterrnmessage, setSignouterrnmessage] = useState("");

  const token = localStorage.getItem("token");
  const handlesignout = async () => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/signout`,
      headers: {
        token: token,
      },
    }).then((res) => {
      if (res.data === "something went wrong" ) {
        setSignouterrnmessage("something went wrong");
        setSignoutmessage("");
      } else if (res.data === "sign out correctly including sign in") {
        setSignouterrnmessage("");
        setSignoutmessage("sign out done");
      } else if (res.data === "sign out correctly without sign in") {
        setSignouterrnmessage("");
        setSignoutmessage("sign out done");
      } else if (res.data === "friday" && res.status === 200) {
        setSignouterrnmessage("you can't sign out it's friday");
        setSignoutmessage("");
      }
    });
  };
  return (
    <div className="signout">
      <Col className="signoutButtonCol ">
        <Button
          variant="dark "
          size="signoutButton"
          type="submit"
          onClick={handlesignout}
        >
          signout
        </Button>
        <Form.Control.Feedback type="valid">
          {signoutmessage}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {signouterrnmessage}
        </Form.Control.Feedback>
      </Col>
    </div>
  );
}
