import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// context
import { workoutsContextProvider } from "./context/WorkoutContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <workoutsContextProvider>
    <App />
  </workoutsContextProvider>

  // { </React.StrictMode> }
);
