import { createContext, useContext } from "react";
import useGetUserDetails from "../hooks/useGetUserDetails";

const userLoginContext = createContext();

export const useUserLoginContext = () => useContext(userLoginContext);

export const UserLoginContextProvider = ({ children }) => {
  const { user, authError } = useGetUserDetails();

  return (
    <userLoginContext.Provider value={{ user, authError }}>
      {children}
    </userLoginContext.Provider>
  );
};
