const Taskmodel = require("../db/TaskSchema");

const { check, validationResult } = require("express-validator");
function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token)
  if (token == null) {
    res.json({ err: 1, msg: "Token not match" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        // console.log("Match")
        next();
      }
    });
  }
}

const taskcontroller = {
  fetchtask: (req, res) => {
    Taskmodel.find({ email: req.params.email }, (err, data) => {
      if (err) {
        res.status(200).json({ status: 401, err: "Something went Wrong" });
      } else {
        res.status(200).json({ status: 200, data: data });
      }
    });
  },
  task: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(200)
        .json({ status: 401, err: "Something went Wrong Enter Valid Task!!" });
      console.log(errors.array());
    } else {
      console.log("hiee");
      console.log(req.body);
      let email = req.body.email;
      let task = req.body.task;
      let des = req.body.des;
      let priority = req.body.priority;
      let duedate = req.body.duedate;
      let stages = 0;
      let ins = new Taskmodel({
        email: email,
        task: task,
        des: des,
        priority: priority,
        duedate: duedate,
        stages: stages,
      });
      ins.save((err) => {
        if (err) {
          console.log(err);
          res.status(200).json({ status: 401, err: "Something went wrong" });
        } else {
          Taskmodel.find({ email: req.body.email }, (err, data) => {
            res.status(200).json({
              status: 200,
              msg: "Task Added sucessfully !!",
              data: data,
            });
          });
        }
      });
    }
  },

  deleteadd: (req, res) => {
    let id = req.params.id;
    console.log(id);
    Taskmodel.deleteOne({ _id: id }, (err) => {
      if (err) {
        res.status(200).json({ status: 401, err: "Something went Wrong" });
      } else {
        res.status(200).json({ status: 200, msg: "Deleted Successfully" });
      }
    });
  },
  updatetask: async (req, res) => {
    console.log(req.body);
    try {
      console.log(req.params.id);
      let data = await Taskmodel.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      console.log(data);
      res.status(200).json({ msg: "Task has Updated Succesfully", data: data });
    } catch (error) {
      res.status(500).json("ERROR IN UPDATE");
    }
  },
  editstages: (req, res) => {
    let variable = parseInt(req.body.data);
    let id = req.body.id;

    Taskmodel.findOne({ _id: id }, (err, data) => {
      if (err) throw err;
      let stages = data.stages + variable;
      if (stages < 4 && stages >= 0) {
        Taskmodel.updateOne(
          { _id: id },
          { $set: { stages: stages } },
          (err, data) => {
            if (err) throw err;
            if (data.matchedCount == 1) {
              res.json({ err: 0, msg: "Stage Updated" });
            } else {
              res.json({ err: 1, msg: "Something went Wrong" });
            }
          }
        );
      } else {
        res.json({ err: 1, msg: "Stages must be in between 0 and 4 " });
      }
    });
  },
  editstagesdrag: (req, res) => {
    let stages = req.body.stage;
    let id = req.body.id;
    // console.log(variable)

    Taskmodel.updateOne(
      { _id: id },
      { $set: { stages: stages } },
      (err, data) => {
        if (err) {
          console.log(err);
          res.json({ err: 0, msg: "Stage not Updated" });
        } else {
          res.json({ msg: "updated sucessfully" });
        }
      }
    );
  },

  fetchtoptask: (req, res) => {
    Taskmodel.find(
      { email: req.params.email },
      { task: 1, des: 1, priority: 1, duedate: 1, stages: 1, date: 1 },
      (err, data) => {
        if (err) throw err;
        //   res.send(data)
        //console.log(data)
        let final = [];
        if (data.length > 5) {
          console.log("true");
          for (let i = 0; i < 5; i++) {
            final.push(data[i]);
          }
        } else {
          console.log("false");
          for (let i = 0; i < data.length; i++) {
            final.push(data[i]);
          }
        }

        console.log(final);
        res.status(200).json({ status: 200, data1: final });
      }
    ).sort({ duedate: 1 });
  },
};
module.exports = taskcontroller;
