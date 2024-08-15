import axios from "axios";
import { useEffect, useState } from "react";
import { FaCog, FaEdit, FaTrash } from "react-icons/fa";
import { LoadingSkeleton } from "../../skeleton/TableLoading";
interface StatusProps {
    statusName: string;
    statusId: string | number;
}
export const Status: React.FC = () => {
    const [status, setStatus] = useState<StatusProps[]>([]);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/status`);
                setStatus(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);
    return (
        <section className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#12263f] text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider flex items-center">
                            <FaCog />&nbsp; Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {error && <tr><td colSpan={3} className="text-red-700 text-center">{error.message}</td></tr>}
                    {loading ? (
                        <LoadingSkeleton number={5} />
                    ) : (
                        status.map(status => (
                            <tr key={status.statusId} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{status.statusId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{status.statusName}</td>
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




