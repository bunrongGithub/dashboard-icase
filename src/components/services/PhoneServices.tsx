import axios from "axios";
import { useEffect, useState } from "react";
import { FaCog, FaEdit, FaPlusCircle, FaTrash, FaPrint, FaFileAlt } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";

export const PhoneServices: React.FC = () => {
    // States for filter
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Fetch data function
    const fetchData = async () => {
        // Your data fetching logic here
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle filter
    const handleFilter = () => {
        // Your filtering logic here
    };

    return (
        <section className="overflow-x-auto bg-white shadow-md rounded-lg">
            <div className="w-full p-4 flex items-center justify-between bg-gray-50 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    />
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    />
                    <span className="text-gray-600">to</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    />
                    <button 
                        onClick={handleFilter}
                        className="bg-blue-700 flex items-center text-white px-3 py-1.5 rounded-lg">
                        <FaFilter/> Filter
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="flex items-center border px-3 py-1 bg-blue-700 text-white rounded-lg">
                        <FaPlusCircle className="mr-1" /> Add New
                    </button>
                    <button className="flex items-center border px-3 py-1 bg-green-600 text-white rounded-lg">
                        <FaPrint className="mr-1" /> Print
                    </button>
                    <button className="flex items-center border px-3 py-1 bg-gray-600 text-white rounded-lg">
                        <FaFileAlt className="mr-1" /> Report
                    </button>
                </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200 mt-2">
                <thead className="bg-[#12263f] text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider">Phone Number</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider">Received Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Service Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Warranty Period</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Service Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Number of Phones</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Creation Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Update Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            <FaCog className="inline" />
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {/* Table rows will go here */}
                </tbody>
            </table>
        </section>
    );
};
