import React from "react"
import Logo from "../utils/assets/images/Logo";
interface DashboardHeaderProps {
  setSidebarOpen: (event: any) => void;
  sidebarOpen: boolean;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ setSidebarOpen, sidebarOpen }) => {
  return (
    <div className="flex justify-between px-6 py-4 bg-white">
      <div className="text-xl flex items-center font-semibold text-gray-800">
        <Logo/>&nbsp;ICASE MOBILE SERVICE
      </div>
      <div className="">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
        />
      </div>

      <button
        className=" md:hidden text-gray-800 text-2xl"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        &#9776;
      </button>
    </div>
  )
}

export default DashboardHeader