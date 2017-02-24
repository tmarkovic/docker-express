// Import dependencies
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = "mongodb://localhost:27017/example";

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  birthday: Date,
  sex: Number,
  phone: String
});

// create mongoose model
const User = mongoose.model("User", userSchema);

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});

/* GET all users. */
router.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(error);

    res.status(200).json(users);
  });
});

/* GET one users. */
router.get("/users/:id", (req, res) => {
  User.findById(req.param.id, (err, users) => {
    if (err) res.status(500).send(error);

    res.status(200).json(users);
  });
});

/* Create a user. */
router.post("/users", (req, res) => {
  let user = new User({
    name: req.body.name,
    age: req.body.age,
    birthday: req.body.birthday,
    sex: req.body.sex,
    phone: req.body.phone
  });

  user.save(error => {
    console.dir(req.body);
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: "User created successfully"
    });
  });
});

/* Delete a user. */
router.delete("/users", (req, res) => {
  let user = new User({
    _id: req.body._id
  });

  user.remove(error => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: "User deleted successfully"
    });
  });
});

module.exports = router;
