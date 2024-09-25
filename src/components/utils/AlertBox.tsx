import React from "react";

interface AlertBoxProps {
  message?: string;
  setMessage?: () => void;
  type?: "success" | "warning" | "error" | "info"; // Define different alert types
}

const AlertBox: React.FC<AlertBoxProps> = ({ message, setMessage, type = "info" }) => {
  // Define colors and icons based on the alert type
  const alertStyles = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  const alertIcons = {
    success: (
      <svg
        className="h-6 w-6 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.707a1 1 0 00-1.414-1.414L9 10.586 5.707 7.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg
        className="h-6 w-6 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.034 10.735C18.554 15.22 17.76 17 16.032 17H3.968c-1.728 0-2.522-1.78-1.745-3.166L8.257 3.1zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-4a1 1 0 00-.993.883L9 10v2a1 1 0 001.993.117L11 12v-2a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg
        className="h-6 w-6 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M6.293 9.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 01-1.414 1.414L10 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: (
      <svg
        className="h-6 w-6 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 2a8 8 0 00-8 8v2a8 8 0 0016 0V10a8 8 0 00-8-8zm-1 11a1 1 0 112 0 1 1 0 01-2 0zm1-4a1 1 0 00-.867.5L9 10.382V11a1 1 0 002 0v-1.382l-.133-.382A1 1 0 0010 9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 md:right-8 p-4 rounded-lg shadow-lg max-w-xs w-full text-white z-50 flex items-center space-x-4 ${alertStyles[type]}`}
    >
      {alertIcons[type]}
      <div className="flex-1">
        <p className="font-medium text-white ">{message}</p>
      </div>
      <button
        type="button"
        className="text-white hover:text-gray-300"
        onClick={setMessage}
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 01-1.414 1.414L10 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default AlertBox;
