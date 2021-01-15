import React, { useState, useEffect } from "react"
import StaffViewAttendance from "../components/StaffViewAttendance"
import StaffViewAttendancebymonth from "../components/StaffViewAttendancebymonth"
import Header from "../components/header"
import Sidebarhodhome from "../components/sidebarhodhome"

import {  Dropdown } from "react-bootstrap"
import "../stylesheets/staffViewAttendance.css"
export default function StaffViewAttendancePage(props) {
  const [table, setTable] = useState()
  const [flag, setFlag] = useState(false)
  useEffect(() => {
        async function fetchData() {
          month != 0 ? (
            setTable(
            <StaffViewAttendancebymonth  month={month} />)
          ) : (
            setTable (<StaffViewAttendance  />)
          )

        }fetchData();
      }, [flag]);


  const [month, setMonth] = useState(0)
  function handlemenu(number) {
    return
  }
  useEffect(() => {})
  return (<div>
    
 
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
    </div>
  )
}
