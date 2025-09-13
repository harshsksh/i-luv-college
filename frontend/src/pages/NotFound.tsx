// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-primary to-secondary text-primary-content px-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-8">404</h1>
        <h2 className="text-3xl md:text-4xl font-medium mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg md:text-xl mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <button className="btn  btn-lg">Go Back Home</button>
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
};

export default NotFound;
