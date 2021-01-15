import React, { useEffect, useState } from "react"
import InstructorProfile from "../../components/profile/InstructorProfile"
import Sidebar from "../../components/sideBar"
import Header from "../../components/header"
import axios from "axios"
export default function InstructorProfilePage(props) {
  const [data, setData] = useState()
  const limittime = 2 + 59 / 60
  const [ID, setID] = useState("")
  const [Name, setName] = useState("")

  const [Salary, setSalary] = useState("")
  const [Gender,setGender]=useState("")
  const [DayOff, setDayOff] = useState("")
  const [Email, setEmail] = useState("")
  const [Faculty, setFaculty] = useState("")
  const [Department, setDepartment] = useState("")
  const [Location,setLocation]=useState("")
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
      url: `${process.env.REACT_APP_URL}/profile`,
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
     // setFaculty(res.data.staffreally.faculty)
     // setDepartment(res.data.staffreally.department)
      setGender(res.data.staffreally.gender)
      //setLocation(res.data.staffreally.locationID)

     // setSalary(res.data.staffreally.salary.$numberDecimal)
      let ss = res.data.staffreally.salary.$numberDecimal
      let nn = ss
      // console.log("res"+res.data.staffreally)
      // console.log("resfac"+res.data.staffreally.faculty)
      //console.log("ss"+ss)
      const response2 = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/ViewLocations`,
        data: {},
        headers: { token: token },
      });
     
     response2.data.map((location)=>{
       if(location.locationId==res.data.staffreally.locationID)
       setLocation(location.BuildingCharachter+location.FloorNumber+"." + location.roomNumber)
     })
      await axios({
        method:"get",
        url: `${process.env.REACT_APP_URL}/ViewFaculties`,
        headers: {
          token: token,
        },
      })
      .then((ress)=>{
        console.log(res.data.staffreally.faculty)
        ress.data.map((faculty) => {
          if (faculty._id == res.data.staffreally.faculty) {
            setFaculty(faculty.name);
            faculty.departments.map((department) => {
              if (department._id == res.data.staffreally.department) {
                setDepartment(department.name);
              }
            });
          }
        });
      })
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/missinghours`,
        headers: {
          token: token,
        },
      }).then((res) => {
       // console.log("missing hours" + res.data)
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
       //   console.log("min" + minutes)
          let deductedSalaryHours = hours * (nn / 180)
          let deductedSalaryminute = minutes * (nn / (180 * 60))
      //    console.log("h " + deductedSalaryHours)
       //   console.log("m " + deductedSalaryminute)

          nn = nn - deductedSalaryHours - deductedSalaryminute
        }
      })
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/missingdays`,
        headers: {
          token: token,
        },
      }).then((res) => {
        console.log("miss" + res.data)
        let deducted = 0
        res.data.map((eeachday) => {
          deducted = deducted + nn / 60
        })
       // console.log("d " + deducted)

        nn = nn - deducted
      })
     // console.log("nnn"+nn)
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
        Gender={Gender}
        Location={Location}
      />
  
    </div>
  )
}
