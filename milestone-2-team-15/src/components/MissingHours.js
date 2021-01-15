import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "../stylesheets/extrahours.css";
import axios from "axios";
export default function ExtraHours(props) {
  const token = localStorage.getItem("token");
  const [missing, setMissing] = useState();
  useEffect(async () => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/missinghours`,
      headers: {
        token: token,
      },
    }).then((res) => {
      console.log(res);
      setMissing(res.data);
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
            <th>Missing Hours</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ fontSize: "1.3888888888888888vw" }}>{missing} </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
