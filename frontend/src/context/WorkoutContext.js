import { Children, createContext } from "react";

export const workoutsContext = createContext();

export const workoutsContextProvider = () => {
  return <workoutsContext.Provider>{Children}</workoutsContext.Provider>;
};
