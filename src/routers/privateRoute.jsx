import React from "react";
import { useAuth } from "../context/authContex";
import { Navigate } from "react-router-dom";

const privateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return (
      <div className="space-y-4 p-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="p-4 border rounded-lg shadow-sm">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default privateRoute;
