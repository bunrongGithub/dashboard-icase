import axios from "axios";
import { useEffect, useState } from "react";
import { FaCog, FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import { LoadingSkeleton } from "../skeleton/TableLoading";
// import {appErrors, AppErrorsType} from "../utils/constant/AppErrors"
const widths = [50, 150, 150,150,50];

type UserType = {
    id: string | number;
    username: string;
    email:string;
    roleId:number;
    roleName:string;
}
export const Users: React.FC = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [error, _setError] = useState<any>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`);
                setUsers(response.data);
            } catch (error: unknown) {
                //appErrors(error.response.status!,error.response.data.message)
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);
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
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider flex items-center">
                            <FaCog />&nbsp; Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {error && <tr><td colSpan={3} className="text-red-700 text-center">{error.message}</td></tr>}
                    {loading ? (
                        <LoadingSkeleton number={10} widths={widths} />
                    ) : (
                        users.map((user ,index)=> (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.roleName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                    <button><FaTrash className="text-red-700 size-4" /></button>
                                    &nbsp;&nbsp;
                                    <button className="flex items-center"><FaEdit className="text-blue-600 size-4" /></button>
                                </td>
                            </tr>
                        )))
                    }
                </tbody>
            </table>
        </section>
    );
};




