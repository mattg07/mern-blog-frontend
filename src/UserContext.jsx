import { createContext, useState, useEffect } from "react";
import backendURL from "./apiConfig"; // Adjust the import path as needed

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  const fetchProfile = async () => {
    const response = await fetch(`${backendURL}/profile`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setUserInfo(data);
    } else {
      setUserInfo(null); // Clear user info on error
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, fetchProfile }}>
      {children}
    </UserContext.Provider>
  );
}
