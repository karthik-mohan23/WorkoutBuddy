import { createContext, useReducer } from "react";

// context
export const WorkoutsContext = createContext();

// reducer function
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUTS":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    default:
      return state;
  }
};

// provider
export const WorkoutsContextProvider = ({ children }) => {
  // useReducer
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
