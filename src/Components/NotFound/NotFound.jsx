// Example of NotFound component
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  function goHome() {
    navigate("/");
  }

  return (
    <div className="d-flex align-items-center justify-content-center flex-column py-5">
      <h1 className="text-danger">Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button className="btn btn-outline-dark py-2 px-4" onClick={goHome}>
        Go to Home
      </button>
    </div>
  );
}

export default NotFound;
