import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyAccount from "./MyAccount";
import { getProfile, updProfile } from "../../config/MyService";

import "../../App.css";
import Navbar from "../Navbar";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

toast.configure();
export default function Profile() {
  let [user, setUser] = useState([]);
  // const [file, setFile] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [lname, setLname] = useState("");
  let [mobile, setMobile] = useState("");
  let [email, setEmail] = useState("");

  const success = (data) =>
    toast.success(data, { position: toast.POSITION.TOP_CENTER });
  const failure = (data) =>
    toast.error(data, { position: toast.POSITION.TOP_CENTER });
  const warning = (data) =>
    toast.warn(data, { position: toast.POSITION.TOP_CENTER });
  useEffect(() => {
    getProfile(localStorage.getItem("user")).then((res) => {
      if (res.data.user) {
        console.log(res.data.user);
        let data = res.data.user;
        setUser(data);
        setEmail(data.email);
        setName(data.name);
        setLname(data.lname);
        setMobile(data.mobile);
      }
    });
  }, []);

  const updateProfile = (id) => {
    let data = {
      name: name,
      lname: lname,
      email: email,
      mobile: mobile,
    };
    console.log(data);
    updProfile(id, data).then((res) => {
      if (res.data.err) {
        failure(res.data.err);
      } else {
        success(res.data.msg);
        // setTimeout(() => {
        //     window.location.reload();
        // }, 3000);
      }
    });
  };

  const handleSubmit = (e) => {
    // Prevent page reload on form submit
    e.preventDefault();
  };
  return (
    <div>
      {" "}
      <Navbar />
      <div className="container-fluid card4">
        <h3 className="text-center display-6">My Account</h3>
        <hr />
        <div className="row  ">
          <div className="col-lg-6 col-md-7 col-sm-12">
            <MyAccount />
          </div>
          <div className="col-lg-6 col-md-7 col-sm-12">
            {!showInvoice && (
              <>
                <div className="card1">
                  <Card.Title style={{ fontSize: "32px" }}>Profile</Card.Title>
                  <hr />
                  <Card.Body>
                    <Card.Text style={{ fontSize: "20px" }}>
                      <b>FirstName:</b>&nbsp; <span>{user.name} </span>
                    </Card.Text>
                    <Card.Text style={{ fontSize: "20px" }}>
                      <b>LastName:</b>&nbsp;<span> {user.lname} </span>{" "}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "20px" }}>
                      <b>Email:</b>&nbsp;<span> {user.email}</span>
                    </Card.Text>
                    <Card.Text style={{ fontSize: "20px" }}>
                      <b>Gender:</b>&nbsp;<span> {user.gender}</span>
                    </Card.Text>
                    <Card.Text style={{ fontSize: "20px" }}>
                      <b>Mobile:</b>&nbsp;<span> {user.mobile}</span>
                    </Card.Text>
                    <hr />
                    <Button
                      variant="secondary"
                      onClick={() => setShowInvoice(true)}
                      style={{ width: "150px" }}
                    >
                      Edit profile
                    </Button>
                  </Card.Body>
                </div>
              </>
            )}
            {showInvoice && (
              <div className="m-1">
                <div className="card1">
                  <h2 className="text-center pt-3 p-3">Update Profile </h2>
                  <Form>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        <b>First Name</b>
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          name="name"
                          defaultValue={user.name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                        {name != "" && name.length < 4 && (
                          <span className="text-danger">
                            Enter Name correctly
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        <b>Last Name</b>
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          name="lname"
                          defaultValue={user.lname}
                          onChange={(e) => {
                            setLname(e.target.value);
                          }}
                        />
                        {lname != "" && lname.length < 4 && (
                          <span className="text-danger">
                            Enter Name correctly
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        <b>Email</b>
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="Enter Email"
                          name="email"
                          defaultValue={user.email}
                          readOnly
                        />
                        {email != "" && !regForEmail.test(email) && (
                          <span className="text-danger">
                            Enter email correctly
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        <b> Mobile</b>
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="Enter mobile number"
                          name="mobile"
                          defaultValue={user.mobile}
                          onChange={(e) => {
                            setMobile(e.target.value);
                          }}
                        />
                        {mobile != "" && mobile.length < 10 && (
                          <span className="text-danger">
                            Enter mobile correctly
                          </span>
                        )}
                      </Col>
                    </Form.Group>

                    <Button
                      variant="info"
                      onClick={() => updateProfile(user._id)}
                      className="mt-3"
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => setShowInvoice(false)}
                      className="mt-3 ml-3"
                    >
                      Close
                    </Button>
                  </Form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
