import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BsList } from "react-icons/bs";

import { FaRegUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import DarkMode from "./DarkMode";

export default function Navbar() {
  let History = useHistory();
  const [temp, setTemp] = useState(1);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    // localStorage.removeItem("user");
    History.push("/");
    setTemp(0);
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg cardnav"
        // style={{ backgroundColor: "white" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <h3>
              <span className="text-danger fw-bold">TASK</span>
            </h3>
          </a>
          <button
            className="navbar-toggler"
            type="button btn-dark"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <BsList />
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul
              className="navbar-nav  mb-2 mb-lg-0 mx-auto"
              style={{ marginTop: "10px" }}
            >
              <li class="nav-item">
                <a className="nav-link active" aria-current="page">
                  <Link to="/Dash" className="nav-link text-uppercase">
                    Dashboard
                  </Link>
                </a>
              </li>
              <li class="nav-item">
                <a className="nav-link active" aria-current="page">
                  <Link to="/Addtask" className="nav-link text-uppercase">
                    Add Task
                  </Link>
                </a>
              </li>
              <li class="nav-item">
                <a className="nav-link active" aria-current="page">
                  <Link to="/contact" className="nav-link text-uppercase">
                    Contact Us
                  </Link>
                </a>
              </li>

              <li className="nav-item dropdown" style={{ width: "100px" }}>
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaRegUser size="25px" style={{ marginTop: "10px" }} />
                </a>
                <ul
                  className="dropdown-menu  mx-auto"
                  aria-labelledby="navbarDropdown"
                >
                  {localStorage.getItem("user") == undefined ? (
                    <li>
                      {" "}
                      <a className="dropdown-item">
                        <Link
                          to="/Reg"
                          className="nav-link text-dark text-uppercase"
                        >
                          Register
                        </Link>
                      </a>
                    </li>
                  ) : (
                    " "
                  )}
                  {localStorage.getItem("user") == undefined ? (
                    <li>
                      <a className="dropdown-item">
                        <Link
                          to="/"
                          className="nav-link text-dark text-uppercase"
                        >
                          Login
                        </Link>
                      </a>
                    </li>
                  ) : (
                    " "
                  )}
                  {localStorage.getItem("user") ? (
                    <li className="dropdown-item">
                      <a className="nav-link text-dark" onClick={logout}>
                        LOGOUT
                      </a>
                    </li>
                  ) : (
                    " "
                  )}
                  {localStorage.getItem("user") ? (
                    <li className="dropdown-item">
                      <a className="nav-link">
                        <Link to="/Profile" className="nav-link text-dark ">
                          <CgProfile size="25px" className="text-info" />
                          &nbsp;Profile
                        </Link>
                      </a>
                    </li>
                  ) : (
                    " "
                  )}
                </ul>
              </li>
              <DarkMode />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
