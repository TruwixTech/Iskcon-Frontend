import React from "react";

const UnderProgress = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#FDE3B6]">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          This Page is Under Progress 🚧
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          We're working hard to bring this page to life. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default UnderProgress;
