import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Modal,
  Row,
  Col,
  ModalFooter,
} from "react-bootstrap";
import { contactUS } from "../config/MyService";
import { useHistory } from "react-router";
import Map from "google-map-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
toast.configure();
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const Contact = () => {
  let [fname, setFname] = useState("");
  let [message, setMessage] = useState("");
  let [mobile, setMobile] = useState("");
  let [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
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
  const locate = () => {
    setShow(true);
  };
  return (
    <div className="contantfooter">
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
            <btn
              className="btn btn-warning btn-lg btn-block btnlog"
              onClick={contact}
            >
              Submit
            </btn>
          </div>
        </Form>
      </Container>
      {/* <div className="w-100">
        <div
          className="col text-center"
          style={{ width: "100%", height: "550px" }}
        > */}
      {/* <Map
            bootstrapURLKeys="AIzaSyDFFMMeWktU5Xf1_AKgBonlWhBZ8_YZUko"
            defaultZoom={10}
            defaultCenter={{
              lat: 24.4539,
              lng: 54.3773,
            }}
          /> */}

      {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d795.0454100650722!2d73.7397470911433!3d18.57878845682324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc1aaaaaaab%3A0x316090d140dfd0b3!2sNeoSOFT!5e0!3m2!1sen!2sin!4v1673268641488!5m2!1sen!2sin"
            width="100%"
            height="600"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
      </div> */}
      <Modal Col={9} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.8916022415315!2d73.73784691460506!3d18.57892508737504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc1aaaaaaab%3A0x316090d140dfd0b3!2sNeoSOFT!5e0!3m2!1sen!2sin!4v1673267156851!5m2!1sen!2sin"
            width="100%"
            height="600"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </Modal.Body>
      </Modal>
      <div className="d-flex justify-content-end cardfooter">
        <button
          onClick={locate}
          className=" text-light text-uppercase btn btn-sm btn-primary mr-2"
        >
          Locate US
        </button>
      </div>
    </div>
  );
};

export default Contact;
