import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Go Home</Link>
    </div>
  );
};

export default PageNotFound;
