import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [navigate, isLoggedIn]);

  return isLoggedIn ? children : null;
};

export default PrivateRoute;
