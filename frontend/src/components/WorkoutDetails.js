import { RiDeleteBin6Fill } from "react-icons/ri";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = (props) => {
  const { title, load, reps, createdAt, _id } = props;

  const { dispatch } = useWorkoutsContext();

  const handleDelete = async () => {
    const response = await fetch("/api/workouts/" + _id, {
      method: "DELETE",
    });
    const json = await response.json();
    console.log(json);
    // to delete workout from global context
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="py-6 px-4 bg-blue-50 opacity-70 shadow-xl flex items-center justify-between">
      <div>
        <h4 className="text-2xl font-semibold mb-3 text-blue-600 ">{title}</h4>
        <p className="text-xl">
          <span className=" font-medium">Load (kg):</span>
          {load}
        </p>
        <p className="text-xl mb-3">
          <span className=" font-medium ">Reps:</span>
          {reps}
        </p>
        <p>{createdAt}</p>
      </div>
      <div>
        <RiDeleteBin6Fill
          onClick={handleDelete}
          size={20}
          className="text-red-500 hover:cursor-pointer hover:text-red-800"
        />
      </div>
    </div>
  );
};
export default WorkoutDetails;
