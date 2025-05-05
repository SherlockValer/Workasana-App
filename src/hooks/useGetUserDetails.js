import { useEffect, useState } from "react";
import { userDetails } from "../services/auth";

const useGetUserDetails = () => {
  const [user, setUser] = useState(null);
  const [authError, setError] = useState(null);

  const getUserDetails = async () => {
    try {
      const response = await userDetails();
      if (response.status === 200) {
        const details = response.data.data.user;
        setUser(details);
      }
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return { user, authError };
};

export default useGetUserDetails;
