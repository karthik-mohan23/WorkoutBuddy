import { useState } from "react";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const AddWorkout = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("new workout added");
      dispatch({ type: "CREATE_WORKOUTS", payload: data });
    }
  };

  return (
    <div className="w-80 mx-auto mb-10">
      <form onSubmit={handleSubmit} className="px-2">
        <h3 className="text-2xl text-green-700 font-medium text-center mb-4">
          Add A New Workout
        </h3>
        <div className="flex justify-between mb-4">
          <label htmlFor="">Exercise Title:</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="outline-none border border-green-300 px-2 h-8"
          />
        </div>
        <div className="flex justify-between mb-4">
          <label htmlFor="">Load (in Kg):</label>
          <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className="outline-none border border-green-300 px-2 h-8"
          />
        </div>
        <div className="flex justify-between mb-7">
          <label htmlFor="">Reps:</label>
          <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className="outline-none border border-green-300 px-2 h-8"
          />
        </div>

        <button className="w-full text-center block bg-green-500 py-1 rounded hover:bg-green-700 hover:text-white duration-300">
          Add Workout
        </button>
      </form>
    </div>
  );
};
export default AddWorkout;
