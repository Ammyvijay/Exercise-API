const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get(async (req, res) => {
  await User.find({})
    .then((user) => res.send(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get(async (req, res) => {
  await User.findOne({ username: req.params.id })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete(async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });
  await newUser
    .save()
    .then(() => res.send("User added successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
