import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
// components
import WorkoutDetails from "../components/WorkoutDetails";
import AddWorkout from "../components/AddWorkout";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    async function fetchWorkouts() {
      // check proxy script in package.json
      // to bypass cors error
      const response = await fetch("/api/workouts");
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <section className="w-[90%] max-w-5xl mx-auto py-10 ">
      <AddWorkout />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutDetails key={workout.id} {...workout} />;
          })}
      </div>
    </section>
  );
};
export default Home;
