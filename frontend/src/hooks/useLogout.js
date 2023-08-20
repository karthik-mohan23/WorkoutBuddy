import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const logout = () => {
    // to logout delete token from local storage and update global state

    const { dispatch } = useAuthContext();

    // remove token from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
