import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const savedUsername = localStorage.getItem("username");
    const savedUserId = localStorage.getItem("userId");

    if (savedIsLoggedIn === "true" && savedUsername && savedUserId) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
      setUserId(savedUserId);
      setUserData({
        username: savedUsername,
        userId: savedUserId,
      });
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setUserId(userData.userId);
    setUserData(userData);

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", userData.username);
    localStorage.setItem("userId", userData.userId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setUserId("");
    setUserData(null);

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  };

  const contextValue = {
    isLoggedIn,
    username,
    userId,
    userData,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
