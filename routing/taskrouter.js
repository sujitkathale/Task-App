const router = require("express").Router();
const taskcontroller = require("../controller/taskcontroller");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    res.json({ err: 1, msg: "Token not match" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        console.log("Match");
        next();
      }
    });
  }
}

router.post(
  "/addTask",
  [
    check("task")
      .isLength({ min: 4 })
      .withMessage("Must be at least 5 chars long"),
    check("des")
      .isLength({ min: 4 })
      .withMessage("Must be at least 4 chars long"),
    check("email").isEmail().withMessage("Enter Valid Email"),
    check("duedate").notEmpty().withMessage("Enter Valid Date"),
    check("stages").isNumeric().withMessage("Stages must be a NO"),
  ],
  taskcontroller.task
);

router.get("/fetchtask/:email", autenticateToken, taskcontroller.fetchtask);

router.get(
  "/fetchtoptask/:email",
  autenticateToken,
  taskcontroller.fetchtoptask
);

router.delete("/deleteadd/:id", taskcontroller.deleteadd);
router.post("/updatetask/:id", taskcontroller.updatetask);
router.post("/editstages", taskcontroller.editstages);
router.post("/editstagesdrag", taskcontroller.editstagesdrag);
router.delete("/deletedrag/:id", taskcontroller.deletedrag);
module.exports = router;
