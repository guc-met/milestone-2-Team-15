import React, { useState, useEffect } from "react"
import StaffViewAttendance from "../components/StaffViewAttendance"
import StaffViewAttendancebymonth from "../components/StaffViewAttendancebymonth"
import {  Dropdown } from "react-bootstrap"
import "../stylesheets/staffViewAttendance.css"
export default function StaffViewAttendancePage(props) {
  const [table, setTable] = useState()
  const [flag, setFlag] = useState(false)
  useEffect(() => {
        async function fetchData() {
          month != 0 ? (
            setTable(
            <StaffViewAttendancebymonth data={Arr} month={month} />)
          ) : (
            setTable (<StaffViewAttendance data={Arr} />)
          )

        }fetchData();
      }, [flag]);

  const [Arr, setArr] = useState([
    {
      _id: "5fe4acd3f5db7f66e3d761be",
      attendance: [],
    },
    {
      _id: "5fe4acd3f5db7f66e3d761bf",
      attendance: [],
    },
    {
      _id: "5fe4acd3f5db7f66e3d761c0",
      attendance: [],
    },
    {
      _id: "5fe4acd3f5db7f66e3d761c1",
      attendance: [],
    },
    {
      _id: "5fe4acd3f5db7f66e3d761c2",
      attendance: [],
    },
    {
      _id: "5fe4acd3f5db7f66e3d761c3",
      attendance: [],
    },
    {
      _id: "5fe4acd3f5db7f66e3d761c4",
      attendance: [],
    },
    {
      _id: "5fe4acd3f5db7f66e3d761c5",
      attendance: [],
    },
    {
      _id: "5fe4acd3f5db7f66e3d761c6",
      attendance: [],
    },
    {
      _id: "5fe4acd3f5db7f66e3d761c7",
      attendance: [],
    },
    {
      _id: "5fe4acd3f5db7f66e3d761c8",
      attendance: [],
    },
    {
      _id: "5fe4acd3f5db7f66e3d761c9",
      attendance: [],
    },
    {
      _id: "5fe4acd3f5db7f66e3d761ca",
      attendance: [
        {
          day: 4,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-24",
          realday: 24,
          _id: "5fe4ad9efeef8e22e4c76506",
          signin: {
            hours: 17,
            minutes: 2,
            secounds: 54,
            _id: "5fe4ad9efeef8e22e4c76507",
          },
          signout: {
            hours: 17,
            minutes: 39,
            secounds: 24,
            _id: "5fe4b62c368c3118c8d46075",
          },
        },
        {
          day: 4,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-24",
          realday: 24,
          _id: "5fe4b6ea368c3118c8d46089",
          signin: {
            hours: 17,
            minutes: 42,
            secounds: 34,
            _id: "5fe4b6ea368c3118c8d4608a",
          },
          signout: null,
        },
        {
          day: 5,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-25",
          realday: 25,
          _id: "5fe5d97b2e4d9412241196e0",
          signin: {
            hours: 14,
            minutes: 22,
            secounds: 19,
            _id: "5fe5d97b2e4d9412241196e1",
          },
          signout: {
            hours: 15,
            minutes: 25,
            secounds: 52,
            _id: "5fe5e860aa767d115896018e",
          },
        },
        {
          day: 6,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-25",
          realday: 25,
          _id: "5fe5dcb7f79197033831935e",
          signin: {
            hours: 14,
            minutes: 36,
            secounds: 7,
            _id: "5fe5dcb7f79197033831935f",
          },
          signout: {
            hours: 15,
            minutes: 32,
            secounds: 0,
            _id: "5fe5e9d0e76ebd37002cc24f",
          },
        },
        {
          day: 6,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-25",
          realday: 25,
          _id: "5fe5dcb7f79197033831935e",
          signin: {
            hours: 14,
            minutes: 36,
            secounds: 7,
            _id: "5fe5dcb7f79197033831935f",
          },
          signout: {
            hours: 15,
            minutes: 32,
            secounds: 0,
            _id: "5fe5e9d0e76ebd37002cc24f",
          },
        },
        {
          day: 6,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-25",
          realday: 25,
          _id: "5fe5dcb7f79197033831935e",
          signin: {
            hours: 14,
            minutes: 36,
            secounds: 7,
            _id: "5fe5dcb7f79197033831935f",
          },
          signout: {
            hours: 15,
            minutes: 32,
            secounds: 0,
            _id: "5fe5e9d0e76ebd37002cc24f",
          },
        },
        {
          day: 6,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-25",
          realday: 25,
          _id: "5fe5dcb7f79197033831935e",
          signin: {
            hours: 14,
            minutes: 36,
            secounds: 7,
            _id: "5fe5dcb7f79197033831935f",
          },
          signout: {
            hours: 15,
            minutes: 32,
            secounds: 0,
            _id: "5fe5e9d0e76ebd37002cc24f",
          },
        },
        {
          day: 6,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-25",
          realday: 25,
          _id: "5fe5dcb7f79197033831935e",
          signin: {
            hours: 14,
            minutes: 36,
            secounds: 7,
            _id: "5fe5dcb7f79197033831935f",
          },
          signout: {
            hours: 15,
            minutes: 32,
            secounds: 0,
            _id: "5fe5e9d0e76ebd37002cc24f",
          },
        },
        {
          day: 6,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-25",
          realday: 25,
          _id: "5fe5dcb7f79197033831935e",
          signin: {
            hours: 14,
            minutes: 36,
            secounds: 7,
            _id: "5fe5dcb7f79197033831935f",
          },
          signout: {
            hours: 15,
            minutes: 32,
            secounds: 0,
            _id: "5fe5e9d0e76ebd37002cc24f",
          },
        },
        {
          day: 6,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-25",
          realday: 25,
          _id: "5fe5dcb7f79197033831935e",
          signin: {
            hours: 14,
            minutes: 36,
            secounds: 7,
            _id: "5fe5dcb7f79197033831935f",
          },
          signout: {
            hours: 15,
            minutes: 32,
            secounds: 0,
            _id: "5fe5e9d0e76ebd37002cc24f",
          },
        },
        {
          day: 6,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-25",
          realday: 25,
          _id: "5fe5dcb7f79197033831935e",
          signin: {
            hours: 14,
            minutes: 36,
            secounds: 7,
            _id: "5fe5dcb7f79197033831935f",
          },
          signout: {
            hours: 15,
            minutes: 32,
            secounds: 0,
            _id: "5fe5e9d0e76ebd37002cc24f",
          },
        },
        {
          day: 6,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-25",
          realday: 25,
          _id: "5fe5dcbdf791970338319381",
          signin: {
            hours: 14,
            minutes: 36,
            secounds: 13,
            _id: "5fe5dcbdf791970338319382",
          },
          signout: {
            hours: 15,
            minutes: 24,
            secounds: 41,
            _id: "5fe5e8198b18341bdc48589e",
          },
        },
        {
          day: 5,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-25",
          realday: 25,
          _id: "5fe5ec3ef8180c3570d7cad5",
          signout: {
            hours: 15,
            minutes: 42,
            secounds: 21,
            _id: "5fe5ec3ef8180c3570d7cad6",
          },
          signin: null,
        },
        {
          day: 5,
          attnded: false,
          month: 12,
          year: 2020,
          date: "2020-12-25",
          realday: 25,
          _id: "5fe5f7336b15673c2cb6692c",
          signin: {
            hours: 16,
            minutes: 29,
            secounds: 7,
            _id: "5fe5f7336b15673c2cb6692d",
          },
          signout: {
            hours: 16,
            minutes: 56,
            secounds: 8,
            _id: "5fe5fd884476f8354c732601",
          },
        },
      ],
    },
  ])
  const [month, setMonth] = useState(0)
  function handlemenu(number) {
    return
  }
  useEffect(() => {})
  return (
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
              setMonth(1)
              setFlag(!flag)
            }}
            variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
            className="viewStaffAttendancemenuitem"
          >
            January
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setMonth(2)
              setFlag(!flag)
            }}
            variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
            className="viewStaffAttendancemenuitem"
          >
            Febuary
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setMonth(3)
              setFlag(!flag)
            }}
            variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
            className="viewStaffAttendancemenuitem"
          >
            March
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setMonth(4)
              setFlag(!flag)
            }}
            variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
            className="viewStaffAttendancemenuitem"
          >
            April
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setMonth(5)
              setFlag(!flag)
            }}
            variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
            className="viewStaffAttendancemenuitem"
          >
            May
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setMonth(6)
              setFlag(!flag)
            }}
            variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
            className="viewStaffAttendancemenuitem"
          >
            June
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setMonth(7)
              setFlag(!flag)
            }}
            variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
            className="viewStaffAttendancemenuitem"
          >
            July
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setMonth(8)
              setFlag(!flag)
            }}
            variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
            className="viewStaffAttendancemenuitem"
          >
            August
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setMonth(9)
              setFlag(!flag)
            }}
            variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
            className="viewStaffAttendancemenuitem"
          >
            September
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setMonth(10)
              setFlag(!flag)
            }}
            variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
            className="viewStaffAttendancemenuitem"
          >
            October
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setMonth(11)
              setFlag(!flag)
            }}
            variant="viewStaffAttendancemenubutton viewStaffAttendancemenuitem"
            className="viewStaffAttendancemenuitem"
          >
            November
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setMonth(12)
              setFlag(!flag)
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
  )
}
