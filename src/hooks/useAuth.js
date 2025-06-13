// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]); // <-- re-check on route change

  return { isLoggedIn };
};

export default useAuth;
