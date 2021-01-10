import Reac, { useEffect, useState } from "react"
import HRProfile from "../../components/profile/HRProfile"
import Sidebar from "../../components/sideBar"
import Header from "../../components/header"
import axios from "axios"

export default function HRProfilePage(props) {
  const [data, setData] = useState()
  const [ID, setID] = useState()
  const [Name, setName] = useState()
  const [Salary, setSalary] = useState()
  const [DayOff, setDayOff] = useState()
  const [Email, setEmail] = useState()
  const [Faculty,setFaculty]=useState()
  const [Department,setDepartment]=useState()
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
    }).then((res) => {
      console.log(res.data.staff)
      setData(res.data)
      setID(res.data.staff.ID)
      setEmail(res.data.staff.email)
      setName(res.data.staffreally.name)
      setSalary(res.data.staffreally.salary.$numberDecimal)
      setDayOff(res.data.staffreally.dayOff)
      

    })
  })
  return (
    <div>
      <Header />
      <HRProfile
        ID={ID}
        Name={Name}
        Email={Email}
        Salary={Salary}
        DayOff={days[DayOff]}
       
      />
      <Sidebar />
    </div>
  )
}
