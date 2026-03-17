// import React from 'react';

// const Loader = () => (
//     <div className="animate-pulse space-y-4 p-6 w-full max-w-4xl mx-auto">
//         <div className="h-8 bg-gray-700 rounded w-3/4"></div>
//         <div className="h-4 bg-gray-700 rounded w-1/4"></div>
//         <div className="h-4 bg-gray-700 rounded w-1/2"></div>
//         <div className="space-y-2">
//             <div className="h-4 bg-gray-700 rounded w-full"></div>
//             <div className="h-4 bg-gray-700 rounded w-11/12"></div>
//             <div className="h-4 bg-gray-700 rounded w-full"></div>
//             <div className="h-4 bg-gray-700 rounded w-5/6"></div>
//         </div>
//         <div className="h-24 bg-gray-700 rounded"></div>
//         <div className="h-24 bg-gray-700 rounded"></div>
//     </div>
// );

// export default Loader;


import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white">
      
      {/* Logo / Title */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold tracking-wide">
          <span className="text-green-400">&lt;</span>
          Code
          <span className="text-blue-400">Master</span>
          <span className="text-green-400">/&gt;</span>
        </h1>
        <p className="text-gray-400 mt-2">Compiling your skills...</p>
      </div>

      {/* Terminal Box */}
      <div className="w-full max-w-xl bg-black rounded-xl shadow-lg p-6 font-mono">
        <div className="flex space-x-2 mb-4">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

        {/* Animated Lines */}
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>

        {/* Typing Cursor */}
        <div className="mt-4 flex items-center text-green-400">
          <span>$ loading problems</span>
          <span className="ml-1 w-2 h-5 bg-green-400 animate-pulse"></span>
        </div>
      </div>

      {/* Spinner */}
      <div className="mt-8">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

    </div>
  );
};

export default Loader;
