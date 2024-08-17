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
            <div className="w-full p-2 flex items-center justify-between">
                <div>
                    <input type="search" name="" id="" />
                </div>
                <button className="flex items-center border px-3 py-1 bg-blue-700 text-white rounded-lg">
                    <FaPlusCircle /> Add New
                </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#12263f] text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider">លេខទូរស័ព្ទអតិថិជន</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider">ថ្ងៃទទួល</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">រយ:ពេលធ្វើ</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">រយ:ពេលធានា</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ស្ថានភាពទូទាត់ប្រាក់</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ស្ថានភាពធ្វើ</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ចំនួនទូរស័ព្ទ</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">តម្លៃសរុប</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ថ្ងៃបង្កើត</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ថ្ងៃកែប្រែ</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider flex items-center">
                            <FaCog />&nbsp; 
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                   
                </tbody>
            </table>
        </section>
    );
};




