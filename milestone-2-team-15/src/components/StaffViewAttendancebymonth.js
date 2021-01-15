import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Listvieww from "./Listvieww";
import "../stylesheets/staffViewAttendance.css";
export default function StaffViewAttendance(props) {
  const [Data, setData] = useState([]);
  const [month, setMonth] = useState();
  const token = localStorage.getItem("token");
  useEffect(async () => {
    setMonth(props.month);
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/attendance/:month`,
      params: {
        month: props.month,
      },
      headers: {
        token: token,
      },
    }).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  });

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
            <th xs={2}>attended </th>
            <th xs={3}>signin hour:minute:secound</th>
            <th xs={3}>signout hour:minute:secound</th>
          </tr>
        </thead>
        {Data.map((ea) => {
          return (
            <tbody>
              <Listvieww
                day={ea.day}
                date={ea.date}
                attended={ea.attnded}
                month={ea.month}
                year={ea.year}
                signinhour={ea.signin ? ea.signin.hours : null}
                signinminute={ea.signin ? ea.signin.minutes : null}
                signinsecounds={ea.signin ? ea.signin.secounds : null}
                signouthour={ea.signout ? ea.signout.hours : null}
                signoutminute={ea.signout ? ea.signout.minutes : null}
                signoutsecounds={ea.signout ? ea.signout.secounds : null}
              />
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}
