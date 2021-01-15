import React, { useState, useEffect } from "react";
import StaffViewAttendance from "../components/StaffViewAttendance";
import StaffViewAttendancebymonth from "../components/StaffViewAttendancebymonth";
import Header from "../components/header";
import Sidebarhodhome from "../components/sidebarhodhome";
import axios from "axios";
import Listview from "./Listview";
import Listvieww from "./Listvieww";
import { Dropdown, Table, Button } from "react-bootstrap";
import "../stylesheets/staffViewAttendance.css";
export default function StaffViewAttendancePage(props) {
  const [table, setTable] = useState();
  const [flag, setFlag] = useState(false);
  const [staff, setStaff] = useState("");
  const [month, setMonth] = useState(0);
  const [staffs, setStaffs] = useState("");

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/HR/ViewStaffs`,
        data: {},
        headers: { token: token },
      });

      const staffs = response.data.map((staff) => {
        return (
          <Dropdown.Item>
            <Button
              onClick={() => {
                setStaff(staff);
                setFlag(!flag);
              }}
            >
              {staff.email}
            </Button>
          </Dropdown.Item>
        );
      });

      setStaffs(staffs);
      if (staff != "") {
        console.log(month);
        if (month != 0) {
          await axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/HR/ViewStaffAttendance/:month`,
            params: {
              month: month,
            },
            data: { staffID: staff.ID },
            headers: {
              token: token,
            },
          }).then((res) => {
            console.log(res.data);
            setTable(
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
                  {res.data.map((ea) => {
                    console.log(ea);
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
                          signoutsecounds={
                            ea.signout ? ea.signout.secounds : null
                          }
                        />
                      </tbody>
                    );
                  })}
                </Table>
              </div>
            );
          });
        } else {
          console.log(staff.ID);
          await axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/HR/ViewStaffAttendance`,
            data: { staffID: staff.ID },
            headers: {
              token: token,
            },
          }).then((res) => {
            console.log(res.data);

            setTable(
              <div className="ViewStaffAttendanceCard">
                <>
                  {res.data.map((eachrecord) => {
                    if (eachrecord.attendance.length > 0)
                      return <Listview eachrecord={eachrecord.attendance} />;
                  })}
                </>
              </div>
            );
          });
        }
      }
    }
    fetchData();
  }, [flag]);

  return (
    <div class="Hr-Buttons">
      <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          id="dropdown-basic"
          class="Hr-Button"
        >
          All Staff
        </Dropdown.Toggle>

        <Dropdown.Menu>{staffs}</Dropdown.Menu>
      </Dropdown>
      <div className="ViewStaffAttendanceDiv">
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="ViewStaffAttenndanceDropDownStyle"
          >
            Choose Month
          </Dropdown.Toggle>

          <Dropdown.Menu className="lala">
            <Dropdown.Item
              as="button"
              onClick={() => {
                setMonth(1);
                setFlag(!flag);
              }}
              variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
              className="viewStaffAttendancemenuitem"
            >
              January
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setMonth(2);
                setFlag(!flag);
              }}
              variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
              className="viewStaffAttendancemenuitem"
            >
              Febuary
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setMonth(3);
                setFlag(!flag);
              }}
              variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
              className="viewStaffAttendancemenuitem"
            >
              March
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setMonth(4);
                setFlag(!flag);
              }}
              variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
              className="viewStaffAttendancemenuitem"
            >
              April
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setMonth(5);
                setFlag(!flag);
              }}
              variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
              className="viewStaffAttendancemenuitem"
            >
              May
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setMonth(6);
                setFlag(!flag);
              }}
              variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
              className="viewStaffAttendancemenuitem"
            >
              June
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setMonth(7);
                setFlag(!flag);
              }}
              variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
              className="viewStaffAttendancemenuitem"
            >
              July
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setMonth(8);
                setFlag(!flag);
              }}
              variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
              className="viewStaffAttendancemenuitem"
            >
              August
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setMonth(9);
                setFlag(!flag);
              }}
              variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
              className="viewStaffAttendancemenuitem"
            >
              September
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setMonth(10);
                setFlag(!flag);
              }}
              variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
              className="viewStaffAttendancemenuitem"
            >
              October
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setMonth(11);
                setFlag(!flag);
              }}
              variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
              className="viewStaffAttendancemenuitem"
            >
              November
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setMonth(12);
                setFlag(!flag);
              }}
              variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
              className="viewStaffAttendancemenuitem"
            >
              December
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <>{table}</>
      </div>
    </div>
  );
}
