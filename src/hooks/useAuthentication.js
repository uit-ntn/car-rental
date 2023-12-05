import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    try {
      const savedIsLoggedIn = Cookies.get("isLoggedIn");
      const savedUsername = Cookies.get("username");

      if (savedIsLoggedIn === "true" && savedUsername) {
        setIsLoggedIn(true);
        setUsername(savedUsername);
      } else {
        setIsLoggedIn(false);
        setUsername("");
      }
    } catch (error) {
      console.error("Error in useAuthentication:", error);
    }
  }, []);

  const login = (userData) => {
    try {
      setIsLoggedIn(true);
      setUsername(userData.username);
      Cookies.set("isLoggedIn", "true", { expires: 1 });
      Cookies.set("username", userData.username, { expires: 1 });
      Cookies.set("userId", userData, { expires: 1 });
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  const logout = () => {
    try {
      setIsLoggedIn(false);
      setUsername("");
      setUserId("");
      Cookies.remove("isLoggedIn");
      Cookies.remove("username");
      Cookies.remove("userId");
    } catch (error) {
      console.error("Error in logout:", error);
    }
  };

  return { isLoggedIn, username, login, logout };
};

export default useAuthentication;
