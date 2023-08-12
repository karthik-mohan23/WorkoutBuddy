//mongoose allows us to create these models and schemas for our data in the db
// MongoDB alone is schema-less
const mongoose = require("mongoose");

// function to create new schema
const Schema = mongoose.Schema;

//Define how our workout documents should look
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// export model
// creates Workoutes collection automatically
// creates model - Workout
// model is used to interact with the Workout collection bcoz it automatically creates a collection for us based on this name. It pluralizes this and build that collection in the db for us
module.exports = mongoose.model("Workout", workoutSchema);
