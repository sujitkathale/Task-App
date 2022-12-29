import React, { useState, useEffect } from "react";
import { login } from "../config/MyService";

import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
toast.configure();
export default function Login() {
  const [state, setState] = useState({ email: "", password: "" });

  const History = useHistory();
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const success = (data) =>
    toast.success(data, { position: toast.POSITION.TOP_CENTER });
  const failure = (data) =>
    toast.error(data, { position: toast.POSITION.TOP_CENTER });
  const warning = (data) =>
    toast.warn(data, { position: toast.POSITION.TOP_CENTER });

  useEffect(() => {
    // if (localStorage.getItem("_token") != undefined) {
    //   localStorage.removeItem("_token");
    // }
    if (localStorage.getItem("_token") !== null) {
      History.push("/Dash");
    }
  }, []);

  const postRegis = (event) => {
    event.preventDefault();
    let data = { email: state.email, password: state.password };
    console.log(data);
    login(data)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.msg);

        if (res.data.err) {
          failure(res.data.err);
          console.log(res.data);
        } else {
          // localStorage.setItem("_token", res.data.token);
          localStorage.setItem("_token", res.data.token);
          localStorage.setItem("user", data.email);
          console.log(state.email);
          console.log(res.data);
          History.push("/Dash");

          success(res.data.msg);
        }
      })
      .catch((err) => {
        if (err) {
          failure("Oops! :-( There is some issue at our Server!");
        }
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-4">
          <img src="images/13.jpg" width={"550px"} height={"730px"} />
        </div>

        <div className=" col-md-12  col-lg-8 col-sm-12 block">
          <br />
          <br />
          <div className=" cardLogin border cardll ">
            <h3 className="text-uppercase text-center">
              Login to <strong className="text-danger">TASKMANAGER</strong>
            </h3>
            <br />
            <br />
            <form method="post" onSubmit={postRegis}>
              <div className="form-group">
                <h6>EMAIL</h6>
                <input
                  type="email"
                  name="email"
                  className="form-control block "
                  onChange={handler}
                  placeholder="your-email@gmail.com"
                  required
                />
                {state.email != "" && !regForEmail.test(state.email) && (
                  <span className="text-primary">Enter email correctly</span>
                )}
              </div>
              <br />

              <div className="form-group">
                <h6>PASSWORD</h6>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  className="form-control block"
                  onChange={handler}
                />
                {state.password != "" && state.password.length < 8 && (
                  <span className="text-primary">Enter password correctly</span>
                )}
              </div>
              <br />
              <br />
              <div className="text-center btnlog">
                <input
                  type="submit"
                  value="LOGIN"
                  className="btn text-center"
                />
              </div>
            </form>
            <br />

            <div className="container text-center">
              <Link to="/Reg">
                <span className="text-dark">Register </span>
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link to="/forgot">
                <span className="text-dark"> Forgot Password?</span>
              </Link>
            </div>
          </div>
          <div />
        </div>
      </div>
      <br />
    </div>
  );
}
