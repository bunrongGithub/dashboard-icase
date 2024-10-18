import React from 'react';

const SalesBox:React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 w-[350px]">
      <div className="flex items-center">
        <div className="bg-blue-100 p-2 rounded-full">
          <svg
            className="w-6 h-6 text-[#007BFF]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L4 5H3m4 8l1.1 5.5a1 1 0 001 .9h7.8a1 1 0 001-.9L17 13M5 21h14"
            ></path>
          </svg>
        </div>
        <div className="ml-auto bg-teal-100 text-teal-800 text-sm rounded-full px-2 py-1">
          12% &#8593;
        </div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold">8807</div>
        <div className="text-gray-500">Items Sales</div>
      </div>
    </div>
  );
};

export default SalesBox;
