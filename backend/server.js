//method to attach environment variables to the process object
require("dotenv").config();

const express = require("express");
//workout route
const workoutRoutes = require("./routes/workouts");

const app = express();

// middleware
// any req that comes in it looks if it has some body if it does it parses it and attaches it to the req object
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// listen for requests
app.listen(process.env.PORT, () => console.log("listening on port 4000"));
