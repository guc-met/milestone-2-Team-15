import React, { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import "../stylesheets/extrahours.css"
export default function ExtraHours(props) {
  const [Missing, setMissing] = useState(props.missing)
  useEffect(async () => {
    // await axios({
    //   method: "post",
    //   url: "http://localhost:3000/missinghours",
    //   // headers:{
    //   //   token :token
    //   // }
    // }).then((res) => {
    //   console.log(res)
    //   setMissing(res.data)
    // })
  })
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
            <td style={{ fontSize:"1.3888888888888888vw"}}>{Missing} </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
