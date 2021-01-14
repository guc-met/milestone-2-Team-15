import React, { useEffect, useState } from "react"
import InstructorProfile from "../../components/profile/InstructorProfile"
import Sidebar from "../../components/sideBar"
import Header from "../../components/header"
import axios from "axios"
export default function InstructorProfilePage(props) {
  const [data, setData] = useState()
  const limittime = 2 + 59 / 60
  const [ID, setID] = useState()
  const [Name, setName] = useState()

  const [Salary, setSalary] = useState()

  const [DayOff, setDayOff] = useState()
  const [Email, setEmail] = useState()
  const [Faculty, setFaculty] = useState()
  const [Department, setDepartment] = useState()
  const token = localStorage.getItem("token")
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  useEffect(async () => {
    await axios({
      method: "get",
      url: "http://localhost:3000/profile",
      headers: {
        token: token,
      },
    }).then(async (res) => {
      console.log(res.data.staff)
      setData(res.data)
      setID(res.data.staff.ID)
      setEmail(res.data.staff.email)
      setName(res.data.staffreally.name)
      setDayOff(res.data.staffreally.dayOff)
      setFaculty(res.data.staffreally.faculty)
      setDepartment(res.data.staffreally.department)
     // setSalary(res.data.staffreally.salary.$numberDecimal)
      let ss = res.data.staffreally.salary.$numberDecimal
      let nn = ss
      console.log("ss"+ss)

      await axios({
        method: "post",
        url: "http://localhost:3000/missinghours",
        headers: {
          token: token,
        },
      }).then((res) => {
        console.log("missing hours" + res.data)
        if (res.data > limittime) {
          let minutes = res.data
          let hours = 0
          let x = res.data % 10
          console.log("X : " + (8.4 % 10.0))
          while (minutes > 0) {
            minutes -= 1
            hours += 1
          }
          minutes = minutes * 60
          console.log("min" + minutes)
          let deductedSalaryHours = hours * (nn / 180)
          let deductedSalaryminute = minutes * (nn / (180 * 60))
          console.log("h " + deductedSalaryHours)
          console.log("m " + deductedSalaryminute)

          nn = nn - deductedSalaryHours - deductedSalaryminute
        }
      })
      await axios({
        method: "post",
        url: "http://localhost:3000/missingdays",
        headers: {
          token: token,
        },
      }).then((res) => {
        console.log("miss" + res.data)
        let deducted = 0
        res.data.map((eeachday) => {
          deducted = deducted + nn / 60
        })
        console.log("d " + deducted)

        nn = nn - deducted
      })
      console.log("nnn"+nn)
      setSalary(nn)
    })
  })

  return (
    <div>
     
      <InstructorProfile
        ID={ID}
        Name={Name}
        Email={Email}
        Salary={Salary}
        DayOff={days[DayOff]}
        Faculty={Faculty}
        Department={Department}
      />
  
    </div>
  )
}
