// src/pages/Dashboard.tsx
import axios from 'axios';
import { useAuth } from '../../AuthProvider';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AsideMenu from './AsideMenu';
import DashboardHeader from './DashboardHeader';

// Axios instance with interceptors for handling token and refresh logic
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/refresh-token`, {}, { withCredentials: true });
          const newToken = response.data.token;
          console.log(response.data);

          apiClient.defaults.headers['x-access-token'] = newToken;

          // Retry original request
          originalRequest.headers['x-access-token'] = newToken;
          return apiClient(originalRequest);
        }
      } catch (err) {
        console.error('Refresh token error:', err);
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

const verifyUserLogin = async (): Promise<string | undefined> => {
  try {
    await apiClient.get('/api/dashboard');
    return undefined;
  } catch (error: any) {
    if (error.response.status === 401 || error.response.data.redirectUrl === '/') {
      return error.response.data.redirectUrl;
    }
  }
  return '/';
};

export default function Dashboard() {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const { role, username } = useAuth();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        const redirectUrl = await verifyUserLogin();
        if (redirectUrl) {
          navigator(redirectUrl);
        }
      } else {
        navigator('/');
      }
      setLoading(false);
    };
    checkUser();
  }, [token, navigator]);

  if (loading) return <p>Loading...</p>;

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
        <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
