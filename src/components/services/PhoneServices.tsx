import { useEffect, useState } from "react";
import { FaCog, FaEdit, FaPlusCircle, FaTrash, FaPrint, FaFileAlt, FaEye, FaFilter } from "react-icons/fa";
import { PhoneServicesProps } from "./definition";
import { fetchData } from "./data";

export const PhoneServices: React.FC = () => {
    const [data, setData] = useState<PhoneServicesProps[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchData().then(res => res).then(res => {
            setData(res);
        }).catch(er => console.error(er));
    }, []);

    const handleFilter = () => {
        // Your filtering logic here
    };

    return (
        <section className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 mb-4">
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
                        className="bg-blue-700 flex items-center text-white px-3 py-1.5 rounded-lg"
                    >
                        <FaFilter className="mr-1" /> Filter
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
            <div className="max-w-xl">
                <table className="min-w-full divide-y divide-gray-200">
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
                                <FaCog className="inline" /> Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data?.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.phoneNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.accept_date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.duration}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.warrantyperoid}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${item?.psName === 'done'
                                        ? 'bg-green-100 text-green-800'
                                        : item?.psName?.toLowerCase() === 'pending'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                        {item.psName}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.statusFixing}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.deviceNumbers}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.created_at}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.updated_at}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center space-x-2">
                                    <button className="text-blue-600"><FaEdit /></button>
                                    <button className="text-blue-600"><FaEye /></button>
                                    <button className="text-red-700"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
