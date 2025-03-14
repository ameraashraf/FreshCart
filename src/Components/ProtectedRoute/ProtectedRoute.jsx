import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  if (!localStorage.getItem("tkn")) {
    // Navigate component mn router dom
    return <Navigate to={"/Login"} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
