import React from "react"
import { FaHome } from "react-icons/fa"
interface DashboardHeaderProps{
    setSidebarOpen: (event: any) => void;  
    sidebarOpen: boolean;
}
const DashboardHeader:React.FC<DashboardHeaderProps> = ({setSidebarOpen,sidebarOpen}) => {
  return (
    <header id="dashboard_header" className="bg-white shadow-md px-4 py-3 border-b border-gray-300 flex items-center justify-between md:pl-60">
    <h2 className="text-xl flex items-center font-semibold text-gray-800">
      <FaHome />&nbsp;Dashboard
    </h2>
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
      />
    </div>
    <button
      className="md:hidden text-gray-800 text-2xl"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      &#9776;
    </button>
  </header>
  )
}

export default DashboardHeader