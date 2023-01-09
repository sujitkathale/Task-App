const router = require("express").Router();
const usercontroller = require("../controller/usercontroller");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const { check, validationResult } = require("express-validator");
router.post(
  "/adduser",
  [
    check("name")
      .isLength({ min: 3 })
      .isAlpha()
      .withMessage("Must be at least 3 chars long"),
    check("lname")
      .isLength({ min: 3 })
      .isAlpha()
      .withMessage("Must be at least 3 chars long"),
    check("email").isEmail().withMessage("Enter Valid Email"),
    check("password").isAlphanumeric().withMessage("Enter Valid Password"),
    check("mobile").isMobilePhone().withMessage("Phone no must be 9 Number"),
  ],
  usercontroller.register
);

router.post(
  "/contact",
  [
    check("name")
      .isLength({ min: 4 })
      .withMessage("Must be at least 5 chars long"),
    check("message")
      .isLength({ min: 4 })
      .withMessage("Must be at least 4 chars long"),
    check("email").isEmail().withMessage("Enter Valid Email"),
    check("mobile").isMobilePhone().withMessage("Phone no must be 9 Number"),
  ],
  usercontroller.contact
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter Valid Email"),
    check("password").isAlphanumeric().withMessage("Enter Valid Password"),
  ],
  usercontroller.login
);

router.put("/changepassword", usercontroller.changepass);
router.post("/captcha", usercontroller.captcha);
router.post("/forgetemail", usercontroller.forgotemail);

module.exports = router;
