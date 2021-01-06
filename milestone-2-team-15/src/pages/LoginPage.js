import Login from "../components/login"
import LoginSidebar from "../components/LoginSidebar"
import "../stylesheets/Loginpage.css"
import { Form, Row, Col, Card, Button } from "react-bootstrap"

export default function LoginPage(props) {
  return (
    <div className="LoginCol">
      <Login />
    </div>
  )
}
