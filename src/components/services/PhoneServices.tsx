import axios from "axios";
import { useEffect, useState } from "react";
import { FaCog, FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import { LoadingSkeleton } from "../skeleton/TableLoading";
type UserRoleType = {
    roleId: string | number;
    roleName: string;
}
export const PhoneServices: React.FC = () => {
 
    return (
        <section className="overflow-x-auto bg-white shadow-md rounded-lg">
            <div className="w-full p-2 flex items-center justify-end">
                <button className="flex items-center border px-3 py-1 bg-blue-700 text-white rounded-lg">
                    <FaPlusCircle /> Add New
                </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#12263f] text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment Status Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider flex items-center">
                            <FaCog />&nbsp; Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                   
                </tbody>
            </table>
        </section>
    );
};




