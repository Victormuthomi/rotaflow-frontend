import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // or "user"
    setIsLoggedIn(!!token);
  }, []);

  return { isLoggedIn };
};

export default useAuth;
