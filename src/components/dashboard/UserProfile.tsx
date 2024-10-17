import { useState } from 'react';
import { FaUser, FaCog, FaBell} from 'react-icons/fa';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleInfoBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Avatar Icon */}
      <div
        className="w-12 h-12 bg-slate-900 rounded-full ml-2 border border-white cursor-pointer"
        onClick={toggleInfoBox}
      >
        <img
          src="/avatar.jpg"
          alt="User Avatar"
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      {/* Dropdown Info Box */}
      {isOpen && (
        <div className={`absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50 transform transition-transform duration-500 ease-in ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ display: isOpen ? 'block' : 'none' }} // Ensures the box is hidden when not open
        >
          <div className="flex items-center p-4 border-b border-gray-200">
            <div className="w-12 h-12 rounded-full bg-pink-200 mr-3">
              <img
                src="/avatar.jpg"
                alt="User Avatar"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">Easin Arafat</p>
              <p className="text-xs text-gray-500">easin@example.com</p>
            </div>
          </div>

          <div className="p-4">
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-blue-600">
                <FaUser className="w-5 h-5" />
                <span>View Profile</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-blue-600">
                <FaCog className="w-5 h-5" />
                <span>Account Settings</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-blue-600">
                <FaBell className="w-5 h-5" />
                <span>Notifications</span>
              </li>
             
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
