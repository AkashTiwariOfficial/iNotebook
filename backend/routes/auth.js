require('dotenv').config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWL_SUPER_SECRECT;

// Route:-1 create a user using: POST "/api/auth/" wwithout using auth. No login required

router.post(
  "/createuser",
  [
    body("Name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter password with minimum 8 character").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //checking whether a user already exits:-
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, errors: "A user with this email already exits" });
      }

      // adding salt to password:-
      const salt = await bcrypt.genSaltSync(10);
      // converting password into hash to secure it:-
      const secPassword = await bcrypt.hashSync(req.body.password, salt);

      // creating a user:-
      user = await User.create({
        Name: req.body.Name,
        email: req.body.email,
        password: secPassword,
      });

      // passing token to user:-
      const data = {
        user: {
          id: user.id
        }
      }
      success = true;
      const authenticationToken = jwt.sign(data, JWT_SECRET);
      res.json({success,  authenticationToken});

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error.");
    }
  });

// Route:-2 Login a user using: POST "/api/auth/" using authentication. No login required:-

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Getting password and email to login:-
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({success, error: "please login again with correct email or password" });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        res.status(400).json({success,  error: "please login again with correct email or password" });
      }

      // passing token to user:-
      const data = {
        user: {
          id: user.id
        }
      }
      const authenticationToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success,  authenticationToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error.");
    }
  });

// Route:-3 Get user details who has loggedIn using: POST "/api/auth/getuser" wwithout using auth. Login required
router.post(
  "/getuser", fetchuser, async (req, res) => {
    let success = false;
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      success = true;
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error.");
    }
  });

module.exports = router;
