import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {useEffect} from "react";

function ProtectedRoutes({children}: {children: React.ReactNode}) {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return children;
}

export default ProtectedRoutes;
