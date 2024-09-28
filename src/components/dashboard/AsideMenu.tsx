import { useLocation, NavLink } from 'react-router-dom';
import {
  FaCogs,
  FaClock,
  FaArrowCircleRight,
  FaArrowCircleDown,
  FaHome,
  FaUserCog,
  FaUserClock,
  FaPalette,
  FaMobile,
  FaUser,
  FaMoneyBill,
} from 'react-icons/fa';
import {
  FaBoxArchive,
  FaMobileScreenButton,
  FaScrewdriverWrench,
} from 'react-icons/fa6';

interface AsideMenuProps {
  role: string;
  username: string;
  sidebarOpen: boolean;
  setSidebarOpen: (toggle: boolean) => void;
  toggleSettings: () => void;
  isSettingsOpen: boolean;
}

interface MenuItem {
  path: string;
  label: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  { path: '#', label: 'Dashboard', icon: <FaHome /> },
  { path: 'users', label: 'Users', icon: <FaUserCog /> },
  { path: 'services', label: 'Phone Services', icon: <FaMobileScreenButton /> },
  { path: 'selling', label: 'Selling', icon: <FaBoxArchive /> },
  { path: 'teachnician', label: 'Teachnician', icon: <FaScrewdriverWrench /> },
];

const settingsItems: MenuItem[] = [
  { path: 'users-role', label: 'User Permission', icon: <FaUser /> },
  { path: 'status', label: 'Service Status', icon: <FaClock /> },
  { path: 'payment-status', label: 'Payment Status', icon: <FaUserClock /> },
  { path: 'payment-method', label: 'Payment Method', icon: <FaMoneyBill /> },
  { path: 'colors', label: 'Phone Colors', icon: <FaPalette /> },
  { path: 'phone-model', label: 'Phone Models', icon: <FaMobile /> },
];

const AsideMenu: React.FC<AsideMenuProps> = ({
  sidebarOpen,
  setSidebarOpen,
  toggleSettings,
  isSettingsOpen,
  username,
  role,
}) => {
  const location = useLocation();
  const endUrl = location.pathname.split('/').pop() || ''; // Get last part of the URL
  console.log(endUrl);
  
  const active = 'bg-[#01182b]';
  const activeSetting = 'bg-[#b7b7b7]';
  return (
    <aside
      id='aside_hidden'
      className={`fixed top-0 left-0 w-60 bg-[#12263f] text-white min-h-screen flex flex-col transform ${sidebarOpen ? 'translate-x-0 p-2' : '-translate-x-60'
        } md:relative md:translate-x-0 transition-transform duration-300`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700 md:hidden">
        <h1 className="text-xl font-bold">Hello {username}</h1>
        <button
          className="text-white text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          &times;
        </button>
      </div>
      <nav className="flex-1 mt-6">
        <ul>
          <h1 className="font-semibold m-auto p-4">
            {role.toUpperCase()}{' '}
            <span className="font-light"> {username.toUpperCase()}</span>
          </h1>
          {menuItems.map((item, index) => (
            <li key={index} className={`${item.path === endUrl ? active : ""} hover:bg-[#01182b] transition-colors`}>
              <NavLink
                to={item.path}
                className="flex items-center p-4 text-sm font-medium"
              >
                {item.icon}&nbsp;{item.label}
              </NavLink>
            </li>
          ))}
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
              className={`w-full mt-1 bg-[#0d1f36] transition-transform duration-400 overflow-hidden ${isSettingsOpen ? 'max-h-96 p-3' : 'max-h-0'
                }`}
            >
              {isSettingsOpen &&
                settingsItems.map((item,index) => (
                  <li
                    key={index}
                    className={` ${item.path === endUrl ? activeSetting :"bg-[#FFfFFF] "} hover:bg-[#e8e9e9] rounded-md m-1 transition-colors duration-400`}
                  >
                    <NavLink
                      to={item.path}
                      className="flex items-center p-4 text-sm text-gray-900 font-medium"
                    >
                      {item.icon} &nbsp;{item.label}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </li>
          <li className="hover:bg-gray-700 transition-colors">
            <a href="#" className="block p-4 text-sm font-medium">
              Reports
            </a>
          </li>
        </ul>
      </nav>
      <div className="py-4 border-t border-gray-700 text-center">
        <a href='/' className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
          Logout
        </a>
      </div>
    </aside>
  );
};

export default AsideMenu;
