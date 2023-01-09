import React, { useEffect, useState } from "react";
import { fetchtoptask, fetchtask } from "../config/MyService";
import ReactHtmlParser from "react-html-parser";
import { useHistory } from "react-router";
import Navbar from "./Navbar";
import jwt_decode from "jwt-decode";
import { Table, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { Fetch_Task } from "../store/taskSlice";
import { defaults, Bar } from "react-chartjs-2";

defaults.global.tooltips.enabled = true;
defaults.global.legend.position = "bottom";

toast.configure();

function Dashboard(props) {
  const dispatch = useDispatch();
  const tasklist = useSelector((state) => state.task.tasks);
  console.log(tasklist);

  const [uid, setUid] = useState("");
  const [len, setlen] = useState("");
  const [complete, setcomplete] = useState(0);
  const [pending, setpending] = useState(0);
  const [countStages, setCountStages] = useState("");
  const History = useHistory();

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode);
      setUid(decode.uid);
      var temp = localStorage.getItem("user");
      fetchtoptask(temp, token).then((res) => {
        console.log(res.data);
        console.log("Hi");
        dispatch(Fetch_Task(res.data.data1));
        // setPostdata1(res.data.data1);
        console.log(res.data.data1);
      });

      fetchtask(temp, token).then((res) => {
        console.log(res.data);
        let p2 = 0;
        let p1 = 0;
        dispatch(Fetch_Task(res.data.data));
        // setPostdata(res.data.data);
        console.log(res.data);
        res.data.data !== null ? setlen(res.data.data.length) : setlen(0);
        var data2 = {
          backlog: 0,
          todo: 0,
          ongoing: 0,
          done: 0,
        };
        res.data.data.map((data) => {
          if (data.stages == 0) {
            data2.backlog = data2.backlog + 1;
          } else if (data.stages == 1) {
            data2.todo = data2.todo + 1;
          } else if (data.stages == 2) {
            data2.ongoing = data2.ongoing + 1;
          } else if (data.stages == 3) {
            data2.done = data2.done + 1;
          }
        });
        setCountStages(data2);
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].stages == 3) {
            p1 = p1 + 1;
          } else if (
            res.data.data[i].stages == 0 ||
            res.data.data[i].stages == 1 ||
            res.data.data[i].stages == 2
          ) {
            p2 = p2 + 1;
          }
        }
        setcomplete(p1);
        setpending(p2);
      });
    } else {
      History.push("/");
    }
  }, []);
  console.log(countStages);
  return (
    <div>
      <Navbar />
      <br />
      <h5 className="">Welcome User: {localStorage.getItem("user")}</h5>
      <br />
      <Row>
        <Col className="container graph" lg={4} md={7} sm={7}>
          <Bar
            data={{
              labels: ["BackLog", "Todo", "Ongoing", "Done"],
              datasets: [
                {
                  label: "Tasks",

                  data: [
                    countStages.backlog,
                    countStages.todo,
                    countStages.ongoing,
                    countStages.done,
                  ],
                  backgroundColor: ["#ADA2FF", "#FF8E9E", "#C0DEFF", "#E6CBA8"],
                  borderColor: [
                    "rgb(0, 8, 193)",
                    "rgb(33, 70, 199)",
                    "rgb(230, 203, 168)",
                    "rgb(253, 240, 224)",
                  ],
                  borderWidth: 0.5,
                },
              ],
            }}
            height={300}
            width={300}
            options={{
              maintainAspectRatio: false,
              indexAxis: "y",
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      stepSize: 1,
                    },
                  },
                ],
              },
              legend: {
                labels: {
                  fontSize: 20,
                },
              },
            }}
          />
        </Col>
        <Col className="container-fluid" lg={8} md={9} sm={9}>
          <Col>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 cardl">
                  <h4 className="text-center text-dark">TOTAL TASK</h4>
                  <h4 className="text-center text-dark">{len}</h4>
                </div>
                <div className="col-lg-3 cardl">
                  <h4 className="text-center text-dark">COMPLETED</h4>
                  <h4 className="text-center text-dark">{complete}</h4>
                </div>
                <div className="col-lg-3  cardl">
                  <h4 className="text-center text-dark"> PENDING</h4>
                  <h4 className="text-center text-dark">{pending}</h4>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <Table
              responsive="md sm lg"
              borderless
              className="table-hover text-center card10 dashtable col-lg-12 col-md-12 col-sm-12"
            >
              <thead className="bg-primary text-white">
                <tr>
                  <th className="col-2">TITLE</th>
                  <th className="col-3">DESCRIPTION</th>
                  <th className="col-1">PRIORITY</th>
                  <th className="col-2">CREATEDDATE</th>
                  <th className="col-3">DUEDATE</th>
                  <th className="col-1">STAGES</th>
                </tr>
              </thead>

              {tasklist.map((pro, index) => (
                <tr key={index} className="bg-white">
                  <td>{ReactHtmlParser(pro.task)}</td>
                  <td>{ReactHtmlParser(pro.des)}</td>
                  <td className="col-3">{pro.priority}</td>
                  <td>{pro.date.substring(0, 10)}</td>
                  <td>{pro.duedate.substring(0, 10)}</td>
                  <td>{pro.stages}</td>
                </tr>
              ))}
            </Table>
          </Col>
        </Col>
      </Row>
      <br />
    </div>
  );
}

export default Dashboard;
