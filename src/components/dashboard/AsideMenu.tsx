import { FaCogs, FaClock, FaArrowCircleRight, FaArrowCircleDown, FaHome, FaUserCog, FaUserClock, FaPalette, FaMobile, FaUser } from "react-icons/fa";
import { FaMobileScreenButton } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

interface AsideMenuProps {
  role: string
  username: string;
  sidebarOpen: boolean;
  setSidebarOpen: (toggle: boolean) => void;
  toggleSettings: () => void;
  isSettingsOpen: boolean;
}

const AsideMenu: React.FC<AsideMenuProps> = ({ sidebarOpen = false, setSidebarOpen, toggleSettings, isSettingsOpen, username, role }) => {
  return (
    <aside
      className={`fixed top-0 left-0 w-60 bg-[#12263f] text-white min-h-screen flex flex-col transform ${sidebarOpen ? 'translate-x-0 p-2' : '-translate-x-60'} md:relative md:translate-x-0 transition-transform duration-300`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700 md:hidden">
        <h1 className="text-xl font-bold">Admin {username}</h1>
        <button
          className="text-white text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          &times;
        </button>
      </div>
      <nav className="flex-1 mt-6">
        <ul>
          <h1 className="font-semibold m-auto p-4">{role.toUpperCase()} <span className="font-light"> {username.toUpperCase()}</span> </h1>

          <li className="hover:bg-gray-700 transition-colors">
            <a href="#" className="p-4 text-sm font-medium flex items-center">
              <FaHome />&nbsp;Dashboard
            </a>
          </li>
          <li className="hover:bg-gray-700 transition-colors">
            <NavLink to="users" className="flex items-center p-4 text-sm font-medium">
              <FaUserCog />&nbsp;Users
            </NavLink>
          </li>
          <li className="hover:bg-gray-700 transition-colors">
            <NavLink to="services" className="flex items-center p-4 text-sm font-medium">
              <FaMobileScreenButton />&nbsp;Phone Services
            </NavLink>
          </li>
          <li className="relative">
            <button
              onClick={toggleSettings}
              className="w-full flex items-center justify-between text-left p-4 text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              <span className="flex items-center">
                <FaCogs />&nbsp;Settings
              </span>
              {isSettingsOpen ? <FaArrowCircleDown /> : <FaArrowCircleRight />}
            </button>
            <ul
              className={`w-full mt-1 bg-[#0d1f36] transition-transform duration-700 overflow-hidden ${isSettingsOpen ? 'max-h-96 p-3' : 'max-h-0'}`}
            >
              {isSettingsOpen ? (
                <>
                  <li className="hover:bg-gray-300 bg-[#FFfFFF] rounded-md m-1 transition-colors duration-500">
                    <NavLink to="users-role" className="flex p-4 text-sm font-medium text-gray-900 items-center">
                      <FaUser />&nbsp;User Permision
                    </NavLink>
                  </li>
                  <li className="hover:bg-gray-300 bg-[#FFfFFF] rounded-md m-1 transition-colors duration-500">
                    <NavLink to="status" className="flex p-4 text-sm font-medium text-gray-900 items-center">
                      <FaClock />&nbsp;Status
                    </NavLink>
                  </li>
                  <li className="hover:bg-gray-300 bg-[#FFfFFF] rounded-md m-1 transition-colors duration-500">
                    <NavLink to="payment-status" className="flex items-center p-4 text-sm text-gray-900 font-medium">
                      <FaUserClock /> &nbsp;Payment Status
                    </NavLink>
                  </li>
                  <li className="hover:bg-gray-300 bg-[#FFfFFF] rounded-md m-1 transition-colors duration-500">
                    <NavLink to="colors" className={`flex items-center p-4 text-sm text-gray-900 font-medium`}>
                      <FaPalette /> &nbsp;Phone Colors
                    </NavLink>
                  </li>
                  <li className="hover:bg-gray-300 bg-[#FFfFFF] rounded-md m-1 transition-colors duration-500">
                    <NavLink to="phone-model" className={`flex items-center p-4 text-sm text-gray-900 font-medium`}>
                      <FaMobile /> &nbsp;Phone Models
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </li>
          <li className="hover:bg-gray-700 transition-colors">
            <a href="#" className="block p-4 text-sm font-medium">Reports</a>
          </li>
        </ul>
      </nav>
      <div className="py-4 border-t border-gray-700 text-center">
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AsideMenu;
