import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "../stylesheets/extrahours.css";
import axios from "axios";
export default function ExtraHours(props) {
  const token = localStorage.getItem("token");
  const [Extra, setExtra] = useState();
  useEffect(async () => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/extrahours`,
      headers: {
        token: token,
      },
    }).then((res) => {
      console.log(res);
      setExtra(res.data);
    });
  });
  return (
    <div className="ExtraHoursCard">
      <Table
        striped
        bordered
        hover
        variant="dark"
        responsive
        className="ListviewTable"
      >
        <thead>
          <tr className="rview">
            <th>Extra Hours</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ fontSize: "1.3888888888888888vw" }}>{Extra} </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
