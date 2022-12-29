import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Button, Container } from "react-bootstrap";
import { BsArrowLeftRight } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdAccountBox, MdLibraryBooks } from "react-icons/md";

import {
  getProfile,
  getMulter,
  getImage,
  updProfile,
} from "../../config/MyService";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";
import Navbar from "../Navbar";
import "../../App.css";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function MyAccount() {
  let [user, setUser] = useState([]);
  // const [file, setFile] = useState("");
  // const [showInvoice, setShowInvoice] = useState(false);
  // let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [lname, setLname] = useState("");
  let [mobile, setMobile] = useState("");

  let [email, setEmail] = useState("");
  const History = useHistory();
  const [mainimage, setMainImage] = useState("");
  const [profileImg, setprofileImg] = useState("");

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode);
      // setUid(decode.uid)
      getProfile(localStorage.getItem("user")).then((res) => {
        if (res.data.user) {
          console.log(res.data.user);
          let data = res.data.user;
          setUser(data);
          setEmail(data.email);
          setName(data.name);
          setMobile(data.mobile);
          getImage1();
        }
      });
    } else {
      History.push("/");
    }
  }, []);
  const onSubmit1 = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    getMulter(formData, localStorage.getItem("user")).then((res) => {
      if (res) {
        console.log(res);
        getImage1();
      }
    });
  };
  const getImage1 = () => {
    let user = localStorage.getItem("user");
    getImage(user).then((res) => {
      if (res.data.err == 0) {
        setMainImage(res.data.data.profileImg);
      } else {
        setMainImage("images/pro.jpg");
      }
    });
  };
  const onFileChange = (e) => {
    setprofileImg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      {/* <Navbar /> */}
      <div className="container-fluid">
        <br />
        <Button variant="secondary">
          <Link to="/Addtask" className="nav-link text-light text-uppercase">
            Back
          </Link>
        </Button>
        <div className=" text-left  mt-5">
          {/* <img
            src={mainimage}
            height="200px"
            width="200px"
            className="card10"
          ></img> */}
          {/* <div>
            <div className="row">
              <form onSubmit={onSubmit1}>
                <div className="container text-center">
                  <div className="form-group   text-center">
                    <input
                      type="file"
                      onChange={onFileChange}
                      className="form-control sha "
                    />
                  </div>
                  <br />
                  <div className="form-group text-center">
                    <button className="btn  sha" type="submit">
                      <AiOutlineCloudUpload
                        size="30px"
                        className="text-danger"
                      />
                    </button>
                  </div>
                </div>
                <br />
                <br></br>
              </form>
            </div>
          </div> */}
          <h3 className="text-danger text-left mt-1">
            {user.name}&nbsp;{user.lname}
          </h3>
          <br />
          <div>
            <Button variant="secondary">
              <Link
                className="btn sha text-light text-center"
                style={{ width: "200px" }}
                to="/Profile"
              >
                <MdAccountBox size="30px" />
                Profile
              </Link>
            </Button>

            <br />
            <br />
            <Button variant="secondary">
              <Link
                className="btn text-light sha text-center"
                style={{ width: "200px" }}
                to="/ChangePasssword"
              >
                <BsArrowLeftRight size="30px" />
                ChangePasssword
              </Link>
            </Button>

            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
