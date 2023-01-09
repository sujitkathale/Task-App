const registermodel = require("../db/RegisterSchema");
const contactmodel = require("../db/ContactSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const nodemailer = require("nodemailer");
const otpmodel = require("../db/otpSchema");
const { check, validationResult } = require("express-validator");
const axios = require("axios");
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "neosoftdemo1999@gmail.com",
    pass: "",
  },
});

const usercontroller = {
  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(422).json({ errors: errors.array() })
      res
        .status(200)
        .json({ status: 401, err: "Something went Wrong Enter Valid Input!!" });
      console.log(errors.array());
    } else {
      console.log(req.body);

      let name = req.body.name;
      let lname = req.body.lname;
      let email = req.body.email;
      let password = req.body.password;

      let mobile = req.body.mobile;
      let gender = req.body.gender;

      const passwordHash = await bcrypt.hash(password, 10);
      let ins = new registermodel({
        name: name,
        lname: lname,
        email: email,
        password: passwordHash,
        mobile: mobile,
        gender: gender,
      });
      await ins.save((err) => {
        if (err) {
          console.log(err);
          res.status(200).json({ status: 401, err: "Please fill the form" });
        } else {
          res
            .status(200)
            .json({ status: 200, msg: "Details added successfully !!" });
        }
      });
    }
  },
  contact: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(422).json({ errors: errors.array() })
      res
        .status(200)
        .json({ status: 401, err: "Something went Wrong Enter Valid Input!!" });
      console.log(errors.array());
    } else {
      console.log(req.body);

      let name = req.body.name;
      let message = req.body.message;
      let email = req.body.email;
      let mobile = req.body.mobile;

      let ins = new contactmodel({
        name: name,
        message: message,
        email: email,
        mobile: mobile,
      });
      await ins.save((err) => {
        if (err) {
          console.log(err);
          res.status(200).json({ status: 401, err: "Please fill the form" });
        } else {
          res
            .status(200)
            .json({ status: 200, msg: "Message Send successfully !!" });
        }
      });
    }
  },
  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(200)
        .json({ status: 401, err: "Please Enter valid credentials!!!" });
      console.log(errors.array());
    } else {
      console.log(req.body);
      let email = req.body.email;
      let password = req.body.password;
      const user = await registermodel.findOne({ email: email });
      // console.log(user)
      const isMatch = await bcrypt.compare(password, user.password);
      //    console.log(isMatch)

      if (email === user.email && isMatch) {
        let payload = {
          uid: email,
        };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600009 });
        res
          .status(200)
          .json({ status: 200, msg: "Login Successfull", token: token });
      } else if (!email) {
        res
          .status(200)
          .json({ status: 401, err: "You must enter an email address." });
      } else if (!password) {
        res
          .status(200)
          .json({ status: 401, err: "You must enter a password." });
      } else {
        res
          .status(200)
          .json({ status: 401, err: "Please Enter valid credintails" });
      }
    }
  },

  captcha: async (req, res) => {
    if (!req.body.ctoken) {
      return res.status(400).json({ error: "reCaptcha token is missing" });
    }
    console.log("In Captcha backend");
    try {
      console.log("Captcha Token - >", req.body.ctoken);
      const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.reCaptchaSecret}&response=${req.body.ctoken}`;
      const response = await axios.post(googleVerifyUrl);
      // console.log(response);
      const { success } = response.data;
      // console.log(success);
      if (success) {
        //Do sign up and store user in database
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ error: "Invalid Captcha. Try again." });
      }
    } catch (e) {
      return res.status(400).json({ error: "reCaptcha error." });
    }
  },

  forgotemail: async (req, res) => {
    let data = await registermodel.findOne({ email: req.body.email });
    if (data) {
      let otpcode = Math.floor(Math.random() * 10000 + 1);
      let otpdata = new otpmodel({
        email: req.body.email,
        code: otpcode,
        expiresIn: new Date().getTime() + 300 * 1000,
      });
      otpdata.save((e) => {
        if (e) {
          res.status(200).json({
            status: 401,
            err: 1,
            msg: "Something went wrong in adding data",
          });
        } else {
          res.status(200).json({
            status: 200,
            err: 0,
            msg: "OTP sent to your email. Please check it !",
          });
        }
      });
      let mailDetails = {
        from: "neosoftdemo1999@gmail.com",
        to: "neosoftdemo1999@gmail.com",
        subject: "Your OTP for password reset",
        text: "...",
        html: `<!DOCTYPE html>
        <html>
        <head>
        </head>
        <body>
        <h1>Here is your OTP :${otpdata.code} for Password Reset</h1>
        </body>
        </html> `,
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs");
        } else {
          console.log("Email sent successfully");
        }
      });
    } else {
      res
        .status(200)
        .json({ status: 401, err: 1, msg: "Email id doesn't exist" });
    }
  },

  changepass: async (req, res) => {
    let data = await otpmodel.findOne({
      email: req.body.email,
      code: req.body.code,
    });
    if (data) {
      let currentTime = new Date().getTime();
      let diff = data.expiresIn - currentTime;
      if (diff < 0) {
        res.json({ err: 1, msg: " Token Expires" }).status(400);
      } else {
        let user = await registermodel.findOne({ email: req.body.email });
        if (user) {
          user.password = req.body.password;
          const salt = await bcrypt.genSalt(10);
          let hashpassword = await bcrypt.hash(user.password, salt);
          user.password = hashpassword;
          user.save();
          user.save();
          res.status(200).json({
            status: 200,
            err: 0,
            msg: "Password Changed Successfully !",
          });
        } else {
          console.log("Something went wrong :(");
        }
      }
    } else {
      res.send("Enter Correct OTP ");
    }
  },
};
module.exports = usercontroller;
