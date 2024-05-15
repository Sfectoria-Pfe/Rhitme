import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Authorization = ({ children, authorizedRole }) => {
  const role = JSON.parse(localStorage.getItem("employee")).role.role_name;
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== authorizedRole) {
      navigate("/notfound");
    }
  }, [navigate, role]);

  return children;
};

export default Authorization;
