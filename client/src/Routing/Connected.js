import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Connected = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, isLoggedIn]);

  return children;
};

export default Connected;
