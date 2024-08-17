import React from "react";
import { FaEye } from "react-icons/fa";

const PhoneServiceView: React.FC = () => {
    // Mock data for sub-table
    const subTableData = [
        { detail: 'Part Replacement', cost: '$50', date: '2024-08-01' },
        { detail: 'Labor Charge', cost: '$30', date: '2024-08-02' },
        // Add more rows as needed
    ];

    return (
        <div className=" flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full p-6">
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">View Details</h3>
                    <button className="text-gray-600 hover:text-gray-900 p-2 rounded-full">
                        <FaEye className="text-[#12263f]" size={20} />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col space-y-2">
                        <div className="font-medium text-gray-800">
                            <strong>Phone Number:</strong> 123-456-7890
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Received Date:</strong> 2024-08-01
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Service Duration:</strong> 2 hours
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Warranty Period:</strong> 6 months
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Payment Status:</strong>
                            <span className={`inline-flex px-3 py-1.5 text-sm font-medium rounded-full ${
                                'bg-green-100 text-green-800'
                            }`}>
                                Paid
                            </span>
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Service Status:</strong> Completed
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="font-medium text-gray-800">
                            <strong>Number of Phones:</strong> 1
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Total Price:</strong> $80
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Creation Date:</strong> 2024-08-01
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Update Date:</strong> 2024-08-02
                        </div>
                    </div>
                </div>
                {/* Sub-Table for additional data */}
                <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Additional Details</h4>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#12263f] text-slate-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Detail</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cost</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {subTableData.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.detail}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.cost}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-6 border-t border-gray-200 pt-4">
                    <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PhoneServiceView;
