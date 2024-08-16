
// src/pages/Dashboard.tsx
import axios from "axios";
import { useAuth } from "../../AuthProvider";
import { FaHome } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AsideMenu from "./AsideMenu";
// import DashboardTable from "./DashboardTable";
// import AdminForm from "./AdminForm";

const verifyUserLogin = async (token: string): Promise<string | undefined> => {
  try {
     await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
      headers: {
        "x-access-token": token
      }
    });
    return undefined;
  } catch (error: any) {
    if (error.response.status === 401 || error.response.data.redirectUrl === '/') {
      return error.response.data.redirectUrl;
    } else if (error.response.data.redirectUrl) {
      return error.response.data.redirectUrl;
    }
  }
  return '/';
}

export default function Dashboard() {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  }

  const { role, username } = useAuth();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        const redirectUrl = await verifyUserLogin(token);
        if (redirectUrl) {
          navigator(redirectUrl);
        }
      } else {
        navigator("/");
      }
      setLoading(false);
    }
    checkUser();
  }, [token, navigator]);
if(loading) return <p>Loading...</p>
  return (
    <main className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <AsideMenu
        username={username}
        role={role}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        toggleSettings={toggleSettings}
        isSettingsOpen={isSettingsOpen}
      />

      {/* Main Content */}
      <div className="flex-1 bg-gray-200">
        <header className="bg-white shadow-md px-4 py-3 border-b border-gray-300 flex items-center justify-between md:pl-60">
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

        <div className="p-6">
            <Outlet/>
        </div>
      </div>
    </main>
  );
}