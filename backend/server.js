//method to attach environment variables to the process object
require("dotenv").config();

const express = require("express");
// mongoose
const mongoose = require("mongoose");
//workout route
const workoutRoutes = require("./routes/workouts");
// user routes
const userRoutes = require("./routes/user");

const app = express();

// middleware
// any req that comes in it looks if it has some body if it does it parses it and attaches it to the req object
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/workouts", workoutRoutes);

// object to connect to the database
// returns a promise
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for requests once we've connected to the db
    app.listen(process.env.PORT, () =>
      console.log("connected to db & listening on port", process.env.PORT)
    );
  })
  .catch((error) => console.log(error));
