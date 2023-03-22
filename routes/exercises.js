const router = require("express").Router();
let Exercise = require("../models/exercise.model");

router.route("/").get(async (req, res) => {
  await Exercise.find()
    .then((exercises) => res.send(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get(async (req, res) => {
  await Exercise.findById(req.params.id)
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete(async (req, res) => {
  await Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put(async (req, res) => {
  await Exercise.findById(req.params.id)
    .then((exercises) => {
      exercises.username = req.body.username;
      exercises.description = req.body.description;
      exercises.duration = Number(req.body.duration);
      exercises.date = Date.parse(req.body.date);

      exercises
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ username, description, duration, date });
  await newExercise
    .save()
    .then(() => res.send("Exercise added successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
