// src/components/DashboardTable.tsx
const DashboardTable = () => {
    const data = [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
      { id: 3, name: 'Robert Brown', email: 'robert@example.com', status: 'Pending' },
      // Add more data as needed
    ];
  
    return (
      <section className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="overflow-x-auto bg-white shadow-md rounded-lg">
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
                    className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${item.status === 'Active'
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
      </section>
    );
  }
  
  export default DashboardTable;
  