const Workout = require("../models/workoutModel");

// need to check if the id is mongodb type of id
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

  //   This checks if the provided id is a valid ObjectId format.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);
  //   The subsequent check if (!workout) after attempting to get the workout is there to handle the scenario where the provided id is indeed in the valid format, but there's no document with that id in the database. This can happen if the user provides an id that matches the format but doesn't correspond to any existing document.
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

  //   This checks if the provided id is a valid ObjectId format.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findByIdAndDelete(id);

  //   This checks if a document with the provided id exists in the database. If it doesn't, it returns an error response.
  if (!workout) {
    return res.status(400).json({ error: "No such workout " });
  }
  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  //   This checks if the provided id is a valid ObjectId format.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findByIdAndUpdate(id, {
    ...req.body,
  });

  //   This checks if a document with the provided id exists in the database. If it doesn't, it returns an error response.
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
