import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { addUser } from "../config/MyService";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Register() {
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [mobile, setMobile] = useState("");
  let [email, setEmail] = useState("");
  let [gender, setGender] = useState("");

  let [password, setPassword] = useState("");
  let [confirmpassword, setConfirmpassword] = useState("");
  const success = (data) =>
    toast.success(data, { position: toast.POSITION.TOP_CENTER });
  const failure = (data) =>
    toast.error(data, { position: toast.POSITION.TOP_CENTER });
  const warning = (data) =>
    toast.warn(data, { position: toast.POSITION.TOP_CENTER });

  const History = useHistory();
  const register = () => {
    let data = {
      name: fname,
      lname: lname,
      mobile: mobile,
      email: email,
      password: password,
      gender: gender,
      // confirmpassword: confirmpassword,
    };

    addUser(data).then((res) => {
      if (res.data.err) {
        failure(res.data.err);
      } else {
        success(res.data.msg);
        History.push("/");
      }
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-4">
          <img src="images/13.jpg" width={"550px"} height={"820px"} />
        </div>
        <div className=" col-md-12 col-lg-8 col-sm-12 block">
          <br />

          <div className="  border cardll ">
            <h3 className="text-uppercase text-center">
              Register to <strong className="text-danger">TASKMANAGER</strong>
            </h3>
            <br />

            <Form className="cardll text-uppercase">
              <Form.Group className="mb-3">
                <Form.Control
                  className="block"
                  type="text"
                  placeholder="Enter First Name"
                  name="fname"
                  id="fname"
                  onChange={(event) => {
                    setFname(event.target.value);
                  }}
                  required
                />
                {fname != "" && fname.length < 4 && (
                  <span className="text-danger">Enter firstName correctly</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  className="block"
                  type="text"
                  placeholder="Enter Last Name"
                  name="lname"
                  id="lname"
                  onChange={(event) => {
                    setLname(event.target.value);
                  }}
                  required
                />
                {lname != "" && lname.length < 4 && (
                  <span className="text-danger">Enter lastName correctly</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  className="block"
                  placeholder="Enter Mobile Number"
                  name="mobile"
                  id="mobile"
                  onChange={(event) => {
                    setMobile(event.target.value);
                  }}
                  required
                />
                {mobile != "" && mobile.length < 10 && (
                  <span className="text-danger">Enter mobile correctly</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  className="block"
                  placeholder="Enter Email"
                  name="email"
                  id="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  required
                />
                {email != "" && !regForEmail.test(email) && (
                  <span className="text-danger">Enter email correctly</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  className="block"
                  placeholder="Enter Password"
                  name="password"
                  id="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  required
                />
                {password != "" && password.length < 8 && (
                  <span className="text-danger">Enter password correctly</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  className="block"
                  placeholder="Enter ConfirmPassword"
                  name="confirmpassword"
                  id="confirmpassword"
                  onChange={(event) => {
                    setConfirmpassword(event.target.value);
                  }}
                  required
                />
                {confirmpassword != "" && confirmpassword != password && (
                  <span className="text-danger">Passwords doesn't match</span>
                )}
              </Form.Group>
              <br />

              <div className="mb-3">
                <label className="pr-2">Gender:</label>
                <input
                  type="radio"
                  value="Male"
                  name="gender"
                  // className="mt-1 pl-2"
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                />{" "}
                Male &nbsp;
                <input
                  type="radio"
                  value="Female"
                  name="gender"
                  // className="mt-1 pl-2"
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                />{" "}
                Female
                <br />
              </div>
              <br />

              <div className="text-center ">
                <btn className="btn  btnlog" onClick={register}>
                  Register
                </btn>{" "}
                <span>or</span>&nbsp;
                <a className="btn  btnlog">
                  <Link to="/" className=" text-dark text-uppercase">
                    Login
                  </Link>
                </a>
              </div>
            </Form>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}
