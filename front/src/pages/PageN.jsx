import React from 'react';
import { Link } from 'react-router-dom';
import img from './image.png'; // Ensure the correct path to your image

const PageNotFound = () => {
  return (
    <div className="flex  items-center justify-center h-screen w-screen text-center bg-black">
      <img src={img} alt="Not Found" className="w-90 h-60 mb-4" />
      <div>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="text-blue-50">
        Go Home
      </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
