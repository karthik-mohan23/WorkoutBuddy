const Workout = require("../models/workoutModel");
// need to check if the id is mongoose type of id
const mongoose = require("mongoose");

// get ALL workouts
const getAllWorkouts = async (req, res) => {
  // to get all documents keep it {}
  //   also sort them in descending order so newest one will come on top
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// get a SINGLE workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  //  bcoz for other id's that mongoDB hasn't created it will throw an error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout found" });
  }

  res.status(200).json(workout);
};

// create NEW workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  //   add doc to db
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  //  bcoz for other id's that mongoDB hasn't created it will throw an error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findByIdAndDelete(id);

  if (!workout) {
    return res.status(400).json({ error: "No such workout " });
  }
  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  //  bcoz for other id's that mongoDB hasn't created it will throw an error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findByIdAndUpdate(id, {
    ...req.body,
  });
  if (!workout) {
    return res.status(400).json({ error: "No such workout " });
  }
  res.status(200).json(workout);
};

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
