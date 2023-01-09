import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { contactUS } from "../config/MyService";
import { useHistory } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
toast.configure();
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const Contact = () => {
  let [fname, setFname] = useState("");
  let [message, setMessage] = useState("");
  let [mobile, setMobile] = useState("");
  let [email, setEmail] = useState("");

  const success = (data) =>
    toast.success(data, { position: toast.POSITION.TOP_CENTER });
  const failure = (data) =>
    toast.error(data, { position: toast.POSITION.TOP_CENTER });
  const warning = (data) =>
    toast.warn(data, { position: toast.POSITION.TOP_CENTER });

  const History = useHistory();
  const contact = () => {
    let data = {
      name: fname,
      message: message,
      mobile: mobile,
      email: email,
    };
    contactUS(data).then((res) => {
      if (res.data.err) {
        failure(res.data.err);
      } else {
        success(res.data.msg);
        History.push("/dash");
      }
    });
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <Container className=" border cardll ">
        <h3 className="text-uppercase text-dark text-center">Contact Us</h3>
        <br />

        <Form>
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
              <span className="text-danger">Enter Name correctly</span>
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
              // className="block"
              type="text"
              placeholder="Enter Message"
              name="message"
              id="message"
              style={{ height: "100px" }}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              required
            />
            {message != "" && message.length < 4 && (
              <span className="text-danger">Enter valid Message</span>
            )}
          </Form.Group>

          <br />
          <div className="text-center ">
            <btn className="btn  btnlog" onClick={contact}>
              Submit
            </btn>
          </div>
        </Form>
      </Container>
      <div />
    </div>
  );
};

export default Contact;
