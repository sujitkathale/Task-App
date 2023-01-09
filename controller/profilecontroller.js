const registermodel = require("../db/RegisterSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //  console.log(token)
  if (token == null) {
    res.json({ err: 1, msg: "Token not match" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        //console.log("Match")
        next();
      }
    });
  }
}

const profilecontroller = {
  userprofile: (req, res, next) => {
    console.log(req.file.filename);
    const url = "http://192.168.2.12:8080/public/" + req.file.filename;

    registermodel.updateOne(
      { email: req.params.user },
      { $set: { profileImg: url } },
      (err, data) => {
        if (err) throw err;
        if (data.matchedCount == 1) {
          res
            .status(200)
            .json({ status: 200, err: 0, msg: "Profile Picture Uploaded" });
        } else {
          res.status(200).json({
            status: 401,
            err: 1,
            msg: "Email is not Matching with Database",
          });
        }
      }
    );
  },

  getmulter: (req, res) => {
    let email = req.params.email;
    registermodel.findOne({ email: email }, (err, data) => {
      if (data.profileImg == "") {
        res.status(200).json({ status: 401, err: 1, msg: "No Image Found" });
      } else {
        res
          .status(200)
          .json({ status: 200, err: 0, msg: "Profile Pic found", data: data });
      }
    });
  },

  changepass: async (req, res) => {
    let id = req.params.id;
    let password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(password, salt);

    registermodel.updateOne(
      { _id: id },
      { $set: { password: hashpassword } },
      (err) => {
        if (err) res.json({ err: err });
        res
          .status(200)
          .json({ status: 200, msg: "Password Updated Succesfully" });
      }
    );
  },
  updprofile: (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let lname = req.body.lname;
    let email = req.body.email;
    let mobile = req.body.mobile;
    console.log(name);
    console.log(mobile);
    registermodel.updateOne(
      { _id: id },
      { $set: { name: name, lname: lname, email: email, mobile: mobile } },
      (err) => {
        if (err) res.json({ err: err });
        res
          .status(200)
          .json({ status: 200, msg: "Userprofile has Updated Succesfully" });
      }
    );
  },
  profile:
    (autenticateToken,
    (req, res) => {
      let email = req.params.email;
      registermodel.findOne({ email: email }, (err, data) => {
        if (err) res.json({ err: err });
        res.status(200).json({ status: 200, user: data });
      });
    }),
};
module.exports = profilecontroller;
