import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { PhoneServicesItemProps , ViewPhoneServiceProps } from "./definition";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const PhoneServiceView: React.FC = () => {
    const [itemDetails, setItemDetails] = useState<ViewPhoneServiceProps>();
    const [phoneItems, setPhoneItems] = useState<PhoneServicesItemProps[]>([]);
    const { id } = useParams();
    useEffect(() => {
        const getItemsDetailById = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/service/${id}`)
                if (response.status === 200)
                    setPhoneItems(response.data?.repaireItem)
                setItemDetails(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        getItemsDetailById();
    }, [])
    console.log(itemDetails)
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
                            <strong>Phone Number:</strong> {itemDetails?.repair?.phoneNumber}
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Received Date:</strong> {itemDetails?.repair?.accept_date}
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Service Duration:</strong> {itemDetails?.repair?.duration}
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Warranty Period:</strong> {itemDetails?.repair?.warrantyperoid}
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Payment Status:</strong>

                            <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${itemDetails?.repair?.psName === 'done'
                                ? 'bg-green-100 text-green-800'
                                : itemDetails?.repair?.psName?.toLowerCase() === 'pending'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                            >
                                {itemDetails?.repair?.psName}
                            </span>
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Payment Method:</strong> <span style={{ letterSpacing: "1.5px" }} className="text-green-800 font-medium">{itemDetails?.repair?.payment_method_name}</span>
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Service Status:</strong>
                            <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${itemDetails?.statusFixed === 'done'
                                ? 'bg-green-100 text-green-800'
                                : itemDetails?.statusFixed?.toLowerCase() === 'pending'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                            >
                                {itemDetails?.statusFixed}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="font-medium text-gray-800">
                            <strong>Number of Phones:</strong> <span style={{ letterSpacing: "1.5px" }} className="text-green-800"> {itemDetails?.repair?.deviceNumbers} devices</span>
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Total Price:</strong> <span style={{ letterSpacing: "1.5px" }} className="text-green-800 font-medium">{itemDetails?.total} $</span>
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Description:</strong> <span style={{ letterSpacing: "1.5px" }} className="text-green-800">{itemDetails?.repair?.description}</span>
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Creation Date:</strong>{itemDetails?.repair?.created_at}
                        </div>
                        <div className="font-medium text-gray-800">
                            <strong>Update Date:</strong> {itemDetails?.repair?.updated_at}
                        </div>
                    </div>
                </div>
                {/* Sub-Table for additional data */}
                <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">{itemDetails?.repair?.deviceNumbers} Number of Phones Details</h4>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#12263f] text-slate-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Model</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone Color</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Password</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Problem</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Responsible</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status Paid</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status Fixed</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {phoneItems.map((phone, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{phone.moName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{phone.colorName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{phone.password}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{phone.problem}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{phone.techName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{phone.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${phone?.statusName?.toLocaleLowerCase() === 'done'
                                            ? 'bg-green-100 text-green-800'
                                            : phone.statusName?.toLowerCase() === 'pending'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >

                                            {phone.statusName}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${phone?.psName?.toLocaleLowerCase() === 'done' ? 
                                            'bg-green-100 text-green-800':phone?.psName?.toLocaleLowerCase() === "pending" || phone?.psName?.toLocaleLowerCase() === "non" ? 
                                            "bg-red-100 text-red-800":"bg-yellow-100 text-yellow-800"
                                        }`}>

                                        {phone.psName}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-6 border-t border-gray-200 pt-4">
                    <NavLink to="../services" className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
                        Back
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default PhoneServiceView;
