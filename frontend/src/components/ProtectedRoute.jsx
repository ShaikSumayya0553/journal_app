import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("journal_token");

  if (!token) {
    // Redirect to login if token doesn't exist
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
