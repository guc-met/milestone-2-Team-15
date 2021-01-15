import {
  DatePicker,
  Select,
  Space,
  Radio,
  Form,
  TimePicker,
  Button,
} from "antd";
import { Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment";

import * as Icon from "react-bootstrap-icons";

import { Plus } from "react-bootstrap-icons";

function AddSign(props) {
  const [salary, setSalary] = useState();
  const [staff, setStaff] = useState();
  const [staffArray, setStaffArray] = useState([]);
  const [response, setResponse] = useState();
  const [validated, setValidated] = useState(true);
  const [form] = Form.useForm();
  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    async function fetchData() {
      console.log("hiiii");
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/HR/ViewStaffs`,
        data: {},
        headers: { token: token },
      });

      console.log(response.data);

      const staff = response.data.map((staff) => {
        return <Select.Option value={staff.ID}>{staff.email}</Select.Option>;
      });

      setStaffArray(staff);
    }
    fetchData();
  }, []);

  function handleClick(staff) {
    setStaff(staff);
    console.log(staff);
  }

  const onFinish = async (values) => {
    var check = moment(values.Date, "YYYY/MM/DD");

    var month = check.format("M");
    var day = check.format("D");
    var year = check.format("YYYY");
    var minute = moment(values.Time).get("minutes");
    var second = moment(values.Time).get("seconds");
    var hour = moment(values.Time).get("hours");
    console.log(month, day, year, minute, second, hour);
    if (values.Sign == "a") {
      const token = localStorage.getItem("token");
      try {
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/HR/AddSignin`,
          data: {
            id: values.Staff,

            Date: {
              year: year,
              month: month - 1,
              realday: day,
              minute: minute,
              secound: second,
              hour: hour,
            },
          },
          headers: { token: token },
        });
        setResponse(<Alert variant="success">{response.data} </Alert>);
      } catch (err) {
        setResponse(<Alert variant="danger">{err.message} </Alert>);
      }
    } else {
      const token = localStorage.getItem("token");
      try {
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/HR/AddSignOut`,
          data: {
            id: values.Staff,

            Date: {
              year: year,
              month: month - 1,
              date: day,
              minute: minute,
              secound: second,
              hour: hour,
            },
          },
          headers: { token: token },
        });
        setResponse(<Alert variant="success">{response.data} </Alert>);
      } catch (err) {
        setResponse(<Alert variant="danger">{err.message} </Alert>);
      }
    }
  };
  return (
    <div class="Hr-Buttons">
      <Form form={form} name="time_related_controls" onFinish={onFinish}>
        <Form.Item required name="Staff" label="Select">
          <Select>{staffArray}</Select>
        </Form.Item>
        <Form.Item required name="Date" label="Date :">
          <DatePicker />
        </Form.Item>
        <Form.Item required name="Time" label="Time :">
          <TimePicker />
        </Form.Item>
        <Form.Item required name="Sign" label="Sign in/out">
          <Radio.Group>
            <Radio value="a">Signin</Radio>
            <Radio value="b">Signout</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button variant="primary" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {response}
    </div>
  );
}
export default AddSign;
