import { ChangeEvent, useEffect, useState } from "react";
import { FaCog, FaFileAlt, FaFilter } from "react-icons/fa";
import { PhoneServicesProps } from "./definition";
import { fetchData } from "./data";
import PhoneServiceItems from "./PhoneServiceItems";
import { LoadingSkeleton } from "../skeleton/TableLoading"
import AddBtn from "../utils/assets/atoms/AddBtn";
import Pagination from "./Paginations";
import AlertBox from "../utils/AlertBox";
import Loading from "../utils/Loading";
/** for skeleton effect */
const widths = [50, 150, 150, 150, 150, 150, 150, 150, 150, 40];
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const PhoneServices: React.FC = () => {
    /** All data from api about phone services */
    const [data, setData] = useState<PhoneServicesProps[]>([]);
    /** search state */
    const [search, setSearch] = useState<string>('');
    /** filtering data for search */
    const [filtering, setFiltering] = useState<PhoneServicesProps[]>([]);
    /** this function have not yet api, this for pagination filter */
    const [startDate, setStartDate] = useState<string | [] | any>('');
    const [endDate, setEndDate] = useState<string | [] | any>('');
    /** for skeleton loading if the network slow */
    const [loading, setIsLoading] = useState(true);
    const [filterLoading,setFilterLoading] = useState<boolean>(false);
    /** pagination table */
    const [currentPage,setCurrentPage] = useState(1);
    const itemsPerpage = 10;
    const startIndex = (currentPage - 1) * itemsPerpage;
    const endIndex = startIndex + itemsPerpage;
    const paginatedData: PhoneServicesProps[] = filtering?.slice(startIndex , endIndex);
    const totalPages: number = Math.ceil((filtering?.length || 0) / itemsPerpage);

    const [message,setMessage] = useState<string>('');
    const navigate = useNavigate();
    const handlePageChange = ( page: number) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        const fetchDataFormService = async () => {
            try {
                setIsLoading(true);
                await fetchData().then(res => res).then(res => {
                    setData(res);
                    setFiltering(res)
                    setIsLoading(false)
                }).catch(er => {
                    if(er.response.status === 404){
                        setIsLoading(false);
                    }else{
                        navigate("../_500")
                    }
                });
            } catch (error: any) {
                setIsLoading(true);
            }
        }
        fetchDataFormService();
    }, []);

    const handleFilter = async () => {
        setFilterLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/service?start=${startDate}&end=${endDate}`);
            if(response.status === 200){
                setData(response.data);
                setFiltering(response.data)
                setFilterLoading(false)
            }
        } catch (error: any) {
            if(error.response.status === 400){
                setMessage(error.response.data.message);
                setFilterLoading(false);
            }
            console.log(error)
        }
        // Your filtering logic here
    };
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const liveSearch: string = e.target.value;
        const filterLiveItems: PhoneServicesProps[] = data.filter(item => item.phoneNumber?.includes(liveSearch))
        setFiltering(filterLiveItems)
        setSearch(liveSearch)
    }
    return (
        <section className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between border-b border-gray-200 mb-4">
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
                        disabled={filterLoading}
                        className={` ${filterLoading ? 'bg-blue-500':'bg-blue-700'}  flex items-center text-white px-3 py-1.5 rounded-lg`}
                    >
                       { filterLoading ? (<><Loading/>&nbsp;</> ) : <FaFilter className="mr-1" />} Filter
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <AddBtn link_to_page="../services/create"/>
                    <button className="flex items-center border px-3 py-1 bg-gray-600 text-white rounded-lg">
                        <FaFileAlt className="mr-1" /> Report
                    </button>
                </div>
            </div>
            <div className="w-full">
                <table className="w-full divide-y divide-gray-200">
                    {message && <AlertBox message={message} setMessage={() => setMessage('')} type="warning" />}
                    <PhoneServiceTableHead />
                    {
                        loading ? (
                            <tbody>
                                <LoadingSkeleton number={10} widths={widths} />
                            </tbody>
                        ) : (
                            <tbody className="bg-white divide-y divide-gray-200">
                                
                                {
                                
                                data.length > 0 ? 
                                paginatedData?.map((item, index) => (
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
                                )): <span className="text-red-700 font-medium text-[18px] my-10">Data not found</span>}
                            </tbody>
                        )
                    }
                </table>
                <Pagination onPageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
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