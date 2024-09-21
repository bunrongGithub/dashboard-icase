import { NavLink } from "react-router-dom";

const _500 = () => {
  return (
      <div className="flex flex-col items-center justify-center h-screen text-red-800">
          <h1 className="text-6xl font-bold">500</h1>
          <h2 className="mt-2 text-2xl">Internal Server Error</h2>
          <p className="mt-4">Sorry, something went wrong on our end.</p>
          <NavLink 
              to="/dashboard/" 
              className="mt-6 text-blue-500 hover:text-blue-700 font-semibold"
          >
              Go back to Home
          </NavLink>
      </div>
  );
};

export default _500;
