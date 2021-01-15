import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "../stylesheets/staffViewAttendance.css";
export default function StaffViewAttendance(props) {
  const token = localStorage.getItem("token");
  const [Data, setData] = useState([]);
  useEffect(async () => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/missingdays`,
      headers: {
        token: token,
      },
    }).then((res) => {
      console.log(res);
      setData(res.data);
    });
  });
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="ViewStaffAttendanceCard">
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
            <th>Day</th>
            <th>Date</th>
          </tr>
        </thead>
        <>
          {Data.map((eachrecord) => {
            return (
              <tbody>
                <tr>
                  <td>{days[new Date(eachrecord).getDay()]} </td>
                  <td>{eachrecord} </td>
                </tr>
              </tbody>
            );
          })}
        </>
      </Table>
    </div>
  );
}
