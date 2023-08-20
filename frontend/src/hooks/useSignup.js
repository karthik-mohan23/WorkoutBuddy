import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    // token and email
    const json = await response.json();

    // if there is a problem
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    // if successful
    if (response.ok) {
      // save the token and email to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //   update  AuthContext
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
