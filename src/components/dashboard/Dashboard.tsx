import axios from "axios";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
const verifyUserLogin = async (token: string): Promise<string | undefined> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
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
  }, [token, navigator])

  return (
    <main className="bg-gray-100 min-h-screen flex">
    {/* Sidebar */}
    <aside
      className={`fixed top-0 left-0 w-60 bg-[#12263f] text-white min-h-screen flex flex-col transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-60'
      } md:relative md:translate-x-0 transition-transform duration-300`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700 md:hidden">
        <h1 className="text-xl font-bold">Admin</h1>
        <button
          className="text-white text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          &times;
        </button>
      </div>
      <nav className="flex-1 mt-6">
        <ul>
          <li className="hover:bg-gray-700 transition-colors">
            <a href="#" className="block p-4 text-sm font-medium">Dashboard</a>
          </li>
          <li className="hover:bg-gray-700 transition-colors">
            <a href="#" className="block p-4 text-sm font-medium">Users</a>
          </li>
          <li className="hover:bg-gray-700 transition-colors">
            <a href="#" className="block p-4 text-sm font-medium">Settings</a>
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

    {/* Main Content */}
    <div className="flex-1 bg-gray-200">
      <header className="bg-white shadow-md px-4 py-3 border-b border-gray-300 flex items-center justify-between md:pl-60">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
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
        {/* Content goes here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Overview</h3>
            <p className="text-gray-600">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <p className="text-gray-600">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Updates</h3>
            <p className="text-gray-600">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        <DashboardTable/>
        <AdminForm/>
        </div>
      </div>
    </div>
  </main>
  );
}


function DashboardTable(){
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Robert Brown', email: 'robert@example.com', status: 'Pending' },
    // Add more data as needed
  ];

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#12263f] text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                    item.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'Inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


function AdminForm(){
  return (
    <div className="bg-white w-full p-6 shadow-md rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User Information</h2>
      <form>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#12263f] focus:border-[#12263f] sm:text-sm"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#12263f] focus:border-[#12263f] sm:text-sm"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#12263f] focus:border-[#12263f] sm:text-sm"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#12263f] focus:border-[#12263f] sm:text-sm"
            required
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* Notifications Checkbox */}
        <div className="mb-4 flex items-center">
          <input
            id="notifications"
            name="notifications"
            type="checkbox"
            className="h-4 w-4 text-[#12263f] focus:ring-[#12263f] border-gray-300 rounded"
          />
          <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">
            Enable notifications
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-[#12263f] hover:bg-[#0d1a29] text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#12263f]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};