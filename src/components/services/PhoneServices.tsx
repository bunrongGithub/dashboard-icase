import { ChangeEvent, useEffect, useState } from "react";
import { FaCog, FaPlusCircle, FaFileAlt, FaFilter } from "react-icons/fa";
import { PhoneServicesProps } from "./definition";
import { fetchData } from "./data";
import PhoneServiceItems from "./PhoneServiceItems";
import { LoadingSkeleton } from "../skeleton/TableLoading"
import { NavLink } from "react-router-dom";
const widths = [50, 150, 150, 150, 150, 150, 150, 150, 150, 40];

export const PhoneServices: React.FC = () => {
    const [data, setData] = useState<PhoneServicesProps[]>([]);
    const [search,setSearch] = useState<string>('');
    const [filtering,setFiltering] = useState<PhoneServicesProps[]>([])
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchDataFormService = async () => {
            try {
                setIsLoading(true);
                await fetchData().then(res => res).then(res => {
                    setData(res);
                    setFiltering(res)
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
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const liveSearch:string = e.target.value;
        const filterLiveItems:PhoneServicesProps[] = data.filter(item => item.phoneNumber?.includes(liveSearch))
        setFiltering(filterLiveItems)
        setSearch(liveSearch)
    }
    // console.log(data)
    return (
        <section className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 mb-4">
                <div className="flex items-center space-x-4 justify-center p-2">
                    <input
                        type="search"
                        placeholder="Search... 09997..."
                        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                        value={search}
                        onChange={handleSearch}
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
                    <NavLink to="../services/create" className="flex items-center border px-3 py-1 bg-blue-700 text-white rounded-lg">
                        <FaPlusCircle className="mr-1" /> Add New
                    </NavLink>
                    <button className="flex items-center border px-3 py-1 bg-gray-600 text-white rounded-lg">
                        <FaFileAlt className="mr-1" /> Report
                    </button>
                </div>
            </div>
            <div className="w-full">
                <table className="w-full divide-y divide-gray-200">
                    <PhoneServiceTableHead />
                    {
                        loading ? (
                            <tbody>
                                <LoadingSkeleton number={10} widths={widths} />
                            </tbody>
                        ) : (
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filtering?.slice(0,10).map((item, index) => (
                                    <PhoneServiceItems key={index}
                                        deviceNumbers={item.deviceNumbers}
                                        phoneNumber={item.phoneNumber}
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
    const heads = [
        { name: "Phone Number", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
        { name: "Received Date", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
        { name: "Service Duration", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
        { name: "Warranty Period", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
        { name: "Payment Status", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
        { name: "Number of Phones", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
        { name: "Total Price", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
        { name: "Description", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
        { name: "Creation Date", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
        { name: "Update Date", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
        { name: "Action", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider", svg: <FaCog className="inline" /> },
    ]
    return <>
        <thead className="bg-[#12263f] text-white">
            <tr>
                {
                    heads.map((item, index) => (
                        <th key={index} className={item.css}>
                            {item.svg}{item.name}
                        </th>
                    ))
                }
            </tr>
        </thead>
    </>
}