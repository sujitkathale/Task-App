import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import Draggable from "react-draggable";
import { fetchtask } from "../config/MyService";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Table,
  Card,
} from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineForward,
  AiOutlineBackward,
} from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import Navbar from "./Navbar";
import jwt_decode from "jwt-decode";
import {
  Add_Task,
  deleteTask,
  Fetch_Task,
  Update_Task,
  Drag_Stage,
  EditAdd_Stage,
  EditMinus_Stage,
} from "../store/taskSlice";
import { useSelector, useDispatch } from "react-redux";

const regExForTask = RegExp(/^[ A-Za-z0-9]*$/);

// toast.configure();
export default function Addtask() {
  const taskref = useRef(null);
  const descriptionref = useRef(null);
  const priorityref = useRef(null);
  const dateref = useRef(null);
  const dispatch = useDispatch();
  const tasklist = useSelector((state) => state.task.tasks);
  console.log(tasklist);

  const History = useHistory();

  const [date, setDate] = useState("");

  let [taskid, settaskid] = useState("");
  let [task, settask] = useState("");
  let [des, setdes] = useState("");
  let [stages, setstages] = useState("");
  let [priority, setpriority] = useState("");
  // const [postdata, setPostdata] = useState([]);

  const [show, setShow] = useState(false);
  const success = (data) =>
    toast.success(data, { position: toast.POSITION.TOP_CENTER });
  const failure = (data) =>
    toast.error(data, { position: toast.POSITION.TOP_CENTER });
  const warning = (data) =>
    toast.warn(data, { position: toast.POSITION.TOP_CENTER });

  const handleClose = () => setShow(false);
  const Addtask = (event) => {
    event.preventDefault();
    if (
      taskref.current.value !== "" &&
      descriptionref.current.value !== "" &&
      priorityref.current.value !== "" &&
      dateref.current.value !== ""
    ) {
      let data = {
        task: task,
        priority: priority,
        des: des,
        duedate: date,
        stages: 0,
        email: localStorage.getItem("user"),
      };
      console.log(data);

      // addTask(data).then((res) => {
      dispatch(Add_Task(data)).then((res) => {
        console.log(res.payload);
        intial();
        taskref.current.value = "";
        descriptionref.current.value = "";
        priorityref.current.value = "";
        dateref.current.value = "";
        settask("");
        setdes("");
        setstages("");
        setpriority("");
        success("Data Added Successfully");
      });
      // intial();
    } else {
      failure("Please enter all data");
    }

    // if (data.err) {
    //   console.log("error");
    //   failure(res.data.err);
    // } else {
    //   console.log("sucess");
    //   success(res.data.msg);
    //   // setTimeout(() => {
    //   //   window.location.reload();
    //   // }, 2000);
    // }
    // });
  };
  const edit = (event, val, val1) => {
    event.preventDefault();
    console.log(val);
    console.log(val1);
    console.log("edit  clicked");
    settaskid(val);
    settask(val1.task);
    setpriority(val1.priority);
    setDate(val1.date);
    setstages(val1.stages);

    setShow(true);
    console.log(show);
  };

  const update = (e) => {
    e.preventDefault();
    let update = true;
    console.log("Update Task");
    let data = {
      task: task,
      des: des,
      priority: priority,
      duedate: date,
      stages: stages,
    };
    console.log(data);
    console.log(taskid);
    var newData = {
      data: data,
      id: taskid,
    };
    dispatch(Update_Task(newData));
    intial();
    // updatetask(data, taskid).then((res) => {
    // console.log(res.data);
    // dispatch(Update_Task(newData));
    // intial();
    // });

    setShow(false);
  };
  const editminus = (id) => {
    var editData = {
      data: -1,
      id: id,
    };
    console.log(editData);
    dispatch(EditMinus_Stage(editData));
    intial();
    // editstages({ data: -1, id: id }).then((res) => {
    //   if (res.data.err == 0) {
    //     intial();
    //   } else {
    //     warning(res.data.msg);
    //   }
    // });
  };
  const editadd = (id) => {
    var editAddData = {
      data: 1,
      id: id,
    };
    console.log(editAddData);
    dispatch(EditAdd_Stage(editAddData));

    // editstages({ data: 1, id: id }).then((res) => {
    //   if (res.data.err == 0) {
    //     intial();
    //   } else {
    //     warning(res.data.msg);
    //   }
    // });
  };

  const deletetask = async (id) => {
    // deleteAdd(id).then((res) => {
    //   //   success(res.data.msg);
    //   //   intial();
    // });
    let res = dispatch(deleteTask(id));
    intial();
    console.log(res);
  };

  const intial = () => {
    var temp = localStorage.getItem("user");
    console.log(temp);
    fetchtask(temp).then((res) => {
      console.log(res.data);
      localStorage.setItem("taskid", res.data._id);
      dispatch(Fetch_Task(res.data.data));
      // setPostdata(res.data.data);
    });
    console.log("Initial fun");
  };

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode);
      //setEmail(localStorage.getItem('user'));
      intial(token);
    } else {
      History.push("/");
    }
  }, []);
  const onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop1 = (ev, stage) => {
    console.log("draged");
    let id = ev.dataTransfer.getData("id");

    let data = { id: id, stage: stage };

    dispatch(Drag_Stage(data));
    intial();
    // editstagesdrag(data).then((res) => {
    //   if (res.data.err) {
    //     failure(res.data.err);
    //   } else {
    //     success(res.data.msg);
    //     intial();
    //   }
    // });
  };
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Container className="container card5 ">
        <Container className="text-center">
          <h3 className="display-4 text-center text-uppercase">Add Task</h3>

          <Row className="card11">
            <Col className="container text-center col-10 mx-auto col-md-8 mt-5">
              <Form>
                <Row>
                  <Col>
                    <input
                      type="text"
                      name="task"
                      id="taskName"
                      className="form-control border-0 block"
                      placeholder="Add Task"
                      ref={taskref}
                      onChange={(event) => {
                        settask(event.target.value);
                      }}
                    />
                    {task != "" && task.length < 8 && (
                      <span className="text-primary">Enter Task correctly</span>
                    )}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <input
                      type="text"
                      name="des"
                      className="form-control border-0 block"
                      placeholder="Add Descripction"
                      ref={descriptionref}
                      onChange={(event) => {
                        setdes(event.target.value);
                      }}
                    />
                    {des != "" && des.length < 10 && (
                      <span className="text-primary">
                        Enter Descripction correctly
                      </span>
                    )}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <select
                      className="form-select  mb-3 form-control block border-0"
                      required
                      name="priority"
                      placeholder="Select Priority"
                      ref={priorityref}
                      aria-label=".form-select-lg example"
                      onChange={(event) => {
                        setpriority(event.target.value);
                      }}
                    >
                      <option selected>Select Priority</option>
                      <option
                        onChange={(event) => {
                          setpriority(event.target.value);
                        }}
                        value="Low"
                      >
                        Low
                      </option>
                      <option
                        onChange={(event) => {
                          setpriority(event.target.value);
                        }}
                        value="Medium"
                      >
                        Medium
                      </option>
                      <option
                        onChange={(event) => {
                          setpriority(event.target.value);
                        }}
                        value="High"
                      >
                        High
                      </option>
                    </select>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <input
                      type="datetime-local"
                      name="date"
                      id="dateTask"
                      required
                      ref={dateref}
                      className="form-control  block border-0"
                      placeholder="date"
                      onChange={(event) => {
                        setDate(event.target.value);
                      }}
                    />
                  </Col>
                </Row>

                <br />
                <button
                  value="ADD"
                  className="btn btn-primary mt-3"
                  onClick={Addtask}
                >
                  ADDTASK
                </button>
              </Form>
            </Col>
          </Row>
        </Container>

        <Container className="mt-5 ">
          <Row>
            <Col className="container" lg={12} md={12} sm={12}>
              <h5>BACKLOG (Stage: 0)</h5>
              <Card
                border="light"
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop1(e, 0)}
              >
                <Table
                  responsive="md sm lg"
                  borderless
                  className="table-hover text-center card10 col-lg-12 col-md-12 col-sm-12 "
                >
                  <thead className="bg-primary text-white">
                    <tr>
                      <td className="col-lg-2 col-md-2 col-sm-2">TITLE</td>
                      {/* <td className="col-3">TITLE</td> */}
                      <td className="col-lg-2 col-md-2 col-sm-2">
                        DESCRIPTION
                      </td>
                      <td className="col-lg-2 col-md-2 col-sm-2">PRIORITY</td>

                      <td className="col-lg-3 col-md-3 col-sm-3">STARTDATE</td>
                      <td className="col-lg-3 col-md-3 col-sm-3">DUEDATE</td>
                      <td className="col-lg-3 col-md-3 col-sm-3">STAGES</td>

                      <td colSpan="3">ACTION</td>
                    </tr>
                  </thead>
                  {/* {postdata.map((pro, index) => */}
                  {tasklist
                    .filter((post) => post.stages == 0)
                    .map((pro, index) => (
                      <tr
                        key={index}
                        draggable
                        onDragStart={(e) => onDragStart(e, pro._id)}
                      >
                        {/* <td className="col-2">{index + 1}</td> */}

                        <td>{ReactHtmlParser(pro.task)}</td>
                        <td>{ReactHtmlParser(pro.des)}</td>
                        <td className="col-3">{pro.priority}</td>

                        <td>{pro.date.substring(0, 10)}</td>
                        <td>{pro.duedate.substring(0, 10)}</td>
                        <td className="text-center">
                          <Row style={{ width: "200px", marginLeft: "40px" }}>
                            <Col lg={2} sm={2} md={2}>
                              <Button variant="none" disabled size="sm">
                                <AiOutlineBackward
                                  size="25px"
                                  onClick={() => editminus(pro._id)}
                                />
                              </Button>
                            </Col>
                            <Col lg={3} sm={3} md={3}>
                              <input
                                type="text"
                                value={pro.stages}
                                disabled
                                style={{ width: "40px" }}
                              />
                            </Col>
                            <Col lg={2} sm={2} md={2}>
                              <a>
                                <AiOutlineForward
                                  size="25px"
                                  onClick={() => editadd(pro._id)}
                                />
                              </a>
                            </Col>
                          </Row>
                        </td>
                        <td>
                          <a
                            className="btn "
                            onClick={() => deletetask(pro._id)}
                          >
                            {" "}
                            <AiFillDelete color="red" />{" "}
                          </a>
                        </td>

                        <td>
                          <a
                            className="btn "
                            onClick={(e) => {
                              edit(e, pro._id, pro);
                            }}
                          >
                            <AiFillEdit color="green" />
                          </a>
                        </td>
                      </tr>
                    ))}
                </Table>
              </Card>
              <br />
              <h5>TODO (Stage: 1)</h5>
              <Card
                border="light"
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop1(e, 1)}
              >
                <Table
                  responsive="md sm lg"
                  borderless
                  className="   table-hover text-center card10  col-lg-12 col-md-12 col-sm-12 "
                >
                  <thead className="bg-primary text-white">
                    <tr>
                      <td className="col-lg-2 col-md-2 col-sm-2">TITLE</td>
                      {/* <td className="col-3">TITLE</td> */}
                      <td className="col-lg-2 col-md-2 col-sm-2">
                        DESCRIPTION
                      </td>
                      <td className="col-lg-2 col-md-2 col-sm-2">PRIORITY</td>

                      <td className="col-lg-3 col-md-3 col-sm-3">STARTDATE</td>
                      <td className="col-lg-3 col-md-3 col-sm-3">DUEDATE</td>
                      <td className="col-lg-3 col-md-3 col-sm-3">STAGES</td>

                      <td colSpan="3">ACTION</td>
                    </tr>
                  </thead>
                  {/* {postdata.map((pro, index) => */}
                  {tasklist
                    .filter((post) => post.stages == 1)
                    .map((pro, index) => (
                      <Draggable>
                        <tr
                          key={index}
                          draggable
                          onDragStart={(e) => onDragStart(e, pro._id)}
                        >
                          {/* <td className="col-2">{index + 1}</td> */}

                          <td>{ReactHtmlParser(pro.task)}</td>
                          <td>{ReactHtmlParser(pro.des)}</td>
                          <td className="col-3">{pro.priority}</td>

                          <td>{pro.date.substring(0, 10)}</td>
                          <td>{pro.duedate.substring(0, 10)}</td>
                          <td className="text-center">
                            <Row style={{ width: "200px", marginLeft: "40px" }}>
                              <Col lg={2} sm={2} md={2}>
                                <a>
                                  <AiOutlineBackward
                                    size="25px"
                                    onClick={() => editminus(pro._id)}
                                  />
                                </a>
                              </Col>
                              <Col lg={3} sm={3} md={3}>
                                <input
                                  type="text"
                                  value={pro.stages}
                                  disabled
                                  style={{ width: "40px" }}
                                />
                              </Col>
                              <Col lg={2} sm={2} md={2}>
                                <a>
                                  <AiOutlineForward
                                    size="25px"
                                    onClick={() => editadd(pro._id)}
                                  />
                                </a>
                              </Col>
                            </Row>
                          </td>
                          <td>
                            <a
                              className="btn "
                              onClick={() => deletetask(pro._id)}
                            >
                              {" "}
                              <AiFillDelete color="red" />{" "}
                            </a>
                          </td>

                          <td>
                            <a
                              className="btn "
                              onClick={(e) => {
                                edit(e, pro._id, pro);
                              }}
                            >
                              <AiFillEdit color="green" />
                            </a>
                          </td>
                        </tr>
                      </Draggable>
                    ))}
                </Table>
              </Card>
              <br />
              <h5>ONGOING (Stage: 2)</h5>
              <Card
                border="light"
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop1(e, 2)}
              >
                <Table
                  responsive="md sm lg"
                  borderless
                  className=" table-hover text-center card10 col-lg-12 col-md-12 col-sm-12 "
                >
                  <thead className="bg-primary text-white">
                    <tr>
                      <td className="col-lg-2 col-md-2 col-sm-2">TITLE</td>
                      {/* <td className="col-3">TITLE</td> */}
                      <td className="col-lg-2 col-md-2 col-sm-2">
                        DESCRIPTION
                      </td>
                      <td className="col-lg-2 col-md-2 col-sm-2">PRIORITY</td>

                      <td className="col-lg-3 col-md-3 col-sm-3">STARTDATE</td>
                      <td className="col-lg-3 col-md-3 col-sm-3">DUEDATE</td>
                      <td className="col-lg-3 col-md-3 col-sm-3">STAGES</td>

                      <td colSpan="3">ACTION</td>
                    </tr>
                  </thead>
                  {/* {postdata.map((pro, index) => */}
                  {tasklist
                    .filter((post) => post.stages == 2)
                    .map((pro, index) => (
                      <Draggable>
                        <tr
                          key={index}
                          draggable
                          onDragStart={(e) => onDragStart(e, pro._id)}
                        >
                          {/* <td className="col-2">{index + 1}</td> */}

                          <td>{ReactHtmlParser(pro.task)}</td>

                          <td>{ReactHtmlParser(pro.des)}</td>
                          <td className="col-3">{pro.priority}</td>

                          <td>{pro.date.substring(0, 10)}</td>
                          <td>{pro.duedate.substring(0, 10)}</td>
                          <td className="text-center">
                            <Row style={{ width: "200px", marginLeft: "40px" }}>
                              <Col lg={2} sm={2} md={2}>
                                <a>
                                  <AiOutlineBackward
                                    size="25px"
                                    onClick={() => editminus(pro._id)}
                                  />
                                </a>
                              </Col>
                              <Col lg={3} sm={3} md={3}>
                                <input
                                  type="text"
                                  value={pro.stages}
                                  disabled
                                  style={{ width: "40px" }}
                                />
                              </Col>
                              <Col lg={2} sm={2} md={2}>
                                <a>
                                  <AiOutlineForward
                                    size="25px"
                                    onClick={() => editadd(pro._id)}
                                  />
                                </a>
                              </Col>
                            </Row>
                          </td>
                          <td>
                            <a
                              className="btn "
                              onClick={() => deletetask(pro._id)}
                            >
                              {" "}
                              <AiFillDelete color="red" />{" "}
                            </a>
                          </td>

                          <td>
                            <a
                              className="btn "
                              onClick={(e) => {
                                edit(e, pro._id, pro);
                              }}
                            >
                              <AiFillEdit color="green" />
                            </a>
                          </td>
                        </tr>
                      </Draggable>
                    ))}
                </Table>
              </Card>
              <br />
              <h5>DONE (Stage: 3)</h5>
              <Card
                border="light"
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop1(e, 3)}
              >
                <Table
                  responsive="md sm lg"
                  borderless
                  className="  table-hover text-center card10 col-lg-12 col-md-12 col-sm-12  "
                >
                  <thead className="bg-primary text-white">
                    <tr>
                      <td className="col-lg-2 col-md-2 col-sm-2">TITLE</td>
                      {/* <td className="col-3">TITLE</td> */}
                      <td className="col-lg-2 col-md-2 col-sm-2">
                        DESCRIPTION
                      </td>
                      <td className="col-lg-2 col-md-2 col-sm-2">PRIORITY</td>

                      <td className="col-lg-3 col-md-3 col-sm-3">STARTDATE</td>
                      <td className="col-lg-3 col-md-3 col-sm-3">DUEDATE</td>
                      <td className="col-lg-3 col-md-3 col-sm-3">STAGES</td>

                      <td colSpan="3">ACTION</td>
                    </tr>
                  </thead>
                  {/* {postdata.map((pro, index) => */}
                  {tasklist
                    .filter((post) => post.stages == 3)
                    .map((pro, index) => (
                      <Draggable>
                        <tr
                          key={index}
                          draggable
                          onDragStart={(e) => onDragStart(e, pro._id)}
                        >
                          {/* <td className="col-2">{index + 1}</td> */}

                          <td>{ReactHtmlParser(pro.task)}</td>
                          <td>{ReactHtmlParser(pro.des)}</td>
                          <td className="col-3">{pro.priority}</td>

                          <td>{pro.date.substring(0, 10)}</td>
                          <td>{pro.duedate.substring(0, 10)}</td>
                          <td className="text-center">
                            <Row style={{ width: "200px", marginLeft: "40px" }}>
                              <Col lg={2} sm={2} md={2}>
                                <a>
                                  <AiOutlineBackward
                                    size="25px"
                                    onClick={() => editminus(pro._id)}
                                  />
                                </a>
                              </Col>
                              <Col lg={3} sm={3} md={3}>
                                <input
                                  type="text"
                                  value={pro.stages}
                                  disabled
                                  style={{ width: "40px" }}
                                />
                              </Col>

                              <Col lg={2} sm={2} md={2}>
                                <Button variant="none" disabled size="sm">
                                  <AiOutlineForward
                                    size="25px"
                                    className="mb-3"
                                    onClick={() => editadd(pro._id)}
                                  />
                                </Button>
                              </Col>
                            </Row>
                          </td>
                          <td>
                            <a
                              className="btn "
                              onClick={() => deletetask(pro._id)}
                            >
                              {" "}
                              <AiFillDelete color="red" />{" "}
                            </a>
                          </td>

                          <td>
                            <a
                              className="btn "
                              onClick={(e) => {
                                edit(e, pro._id, pro);
                              }}
                            >
                              <AiFillEdit color="green" />
                            </a>
                          </td>
                        </tr>
                      </Draggable>
                    ))}
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>EDIT TASK</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form>
                <Form.Group as={Row} className="text-uppercase">
                  <Form.Label column sm="3" className="text-uppercase">
                    <b>Task</b>
                  </Form.Label>
                  <Col sm="8" className="text-uppercase">
                    <Form.Control
                      type="text"
                      placeholder="Add Task"
                      value={task}
                      name="task"
                      onChange={(event) => {
                        settask(event.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row} className="text-uppercase">
                  <Form.Label column sm="3" className="text-uppercase">
                    <b>Descripction</b>
                  </Form.Label>
                  <Col sm="8" className="text-uppercase">
                    <Form.Control
                      type="text"
                      placeholder="Add Descripction"
                      value={des}
                      name="des"
                      onChange={(event) => {
                        setdes(event.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3" className="text-uppercase">
                    <b>priority</b>
                  </Form.Label>
                  <Col sm="8">
                    <select
                      className="form-select  mb-3 form-control  border-0"
                      name="priority"
                      value={priority}
                      aria-label=".form-select-lg example"
                      onChange={(event) => {
                        setpriority(event.target.value);
                      }}
                    >
                      <option selected>Select Priority</option>
                      <option
                        value={priority}
                        onChange={(event) => {
                          setpriority(event.target.value);
                        }}
                        value="Low"
                      >
                        Low
                      </option>
                      <option
                        value={priority}
                        onChange={(event) => {
                          setpriority(event.target.value);
                        }}
                        value="Medium"
                      >
                        Medium
                      </option>
                      <option
                        value={priority}
                        onChange={(event) => {
                          setpriority(event.target.value);
                        }}
                        value="High"
                      >
                        High
                      </option>
                    </select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3" className="text-uppercase">
                    <b>Duedate</b>
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="date"
                      name="date"
                      value={date}
                      onChange={(event) => {
                        setDate(event.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <div className="text-center">
                  <Button
                    variant="dark"
                    className="text-uppercase"
                    onClick={update}
                  >
                    Update
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    variant="dark"
                    className="text-uppercase"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </div>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
