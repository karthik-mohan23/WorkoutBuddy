import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  //show error if we try to access this value in components that are not wrapped by Provider
  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};
