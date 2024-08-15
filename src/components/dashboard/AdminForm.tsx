// src/components/AdminForm.tsx
const AdminForm = () => {
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
  }
  
  export default AdminForm;
  