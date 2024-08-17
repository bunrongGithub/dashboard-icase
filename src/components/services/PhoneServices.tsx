import { useEffect, useState } from "react";
import { FaCog, FaPlusCircle, FaPrint, FaFileAlt, FaFilter } from "react-icons/fa";
import { PhoneServicesProps } from "./definition";
import { fetchData } from "./data";
import PhoneServiceItems from "./PhoneServiceItems";
import { LoadingSkeleton } from "../skeleton/TableLoading"
const widths = [50, 150, 150, 150, 150, 150, 150, 150, 150,40];

export const PhoneServices: React.FC = () => {
    const [data, setData] = useState<PhoneServicesProps[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchDataFormService = async () => {
            try {
                setIsLoading(true);
                await fetchData().then(res => res).then(res => {
                    setData(res);
                    setIsLoading(false)
                }).catch(er => console.error(er));
            } catch (error) {
                console.error(error)
                setIsLoading(true)
            }
        }
        fetchDataFormService();
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
                    <PhoneServiceTableHead />
                    {
                        loading ? (
                            <tbody>
                                <LoadingSkeleton number={10} widths={widths} />
                            </tbody>
                        ) : (
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data?.map((item, index) => (
                                    <PhoneServiceItems key={index}
                                        deviceNumbers={item.deviceNumbers}
                                        phoneNumber={item.phoneNumber}
                                        statusFixing={item.statusFixing}
                                        duration={item.duration}
                                        warrantyperoid={item.warrantyperoid}
                                        psId={item.psId}
                                        psName={item.psName}
                                        amount={item.amount}
                                        accept_date={item.accept_date}
                                        created_at={item.created_at}
                                        updated_at={item.updated_at}
                                        repId={item.repId}
                                        payment_method_id={item.payment_method_id}
                                        description={item.description}
                                    />
                                ))}
                            </tbody>
                        )
                    }
                </table>
            </div>
        </section>
    );
};

const PhoneServiceTableHead: React.FC = () => {
    return <>
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
    </>
}