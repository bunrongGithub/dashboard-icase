import axios from "axios";
import { useEffect, useState } from "react";
import { FaCog, FaEdit } from "react-icons/fa";
import { LoadingSkeleton } from "../../skeleton/TableLoading";
import StatusProps from "./definition";
import AddBtn from "../../utils/assets/atoms/AddBtn";
const widths = [50, 150, 150];
import { utils } from "../../utils";

export const Status: React.FC = () => {
    const [status, setStatus] = useState<StatusProps[]>([]);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [showAddBox,setShowAddBox] = useState<boolean>(false);
    const [selectedId,setSelectedId] = useState<number | undefined>(undefined);
    const [showDeleteBox,setShowDeleteBox] = useState<boolean>(false);
    
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
    const handleToggleModal = () => {
        setShowAddBox(prev => !prev)
    }
    const handleSave = async (statusName: string)=> {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/status`,{
                statusName: statusName
            });
            if(response.status === 201){
                const data = response.data?.statusName
                return setStatus(prev => [...prev , data])
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }
    const handleDelete = (id: number | undefined):void => {
        if(id){
            setStatus(prev => prev.filter(item => item.statusId!== id));
            setSelectedId(undefined)
        }
    }
    return (
        <section className="overflow-x-auto bg-white shadow-md rounded-lg">
            {
                showAddBox && <utils.ModalAdd 
                isOpen={showAddBox}
                onSave={handleSave}
                onClose={handleToggleModal}
                modalHeading="Add New Status"
                modalTitle="Enter status"
                />
            }
            <div className="w-full p-2 flex items-center justify-end">
                <AddBtn onModalShow={handleToggleModal} target={false}/>
            </div>
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
                        <LoadingSkeleton number={10} widths={widths} />
                    ) : (
                        status.map((status,index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{status.statusName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                <button onClick={
                                        () => {
                                            setSelectedId(status.statusId);
                                            setShowDeleteBox(!showDeleteBox);
                                            }
                                        }>
                                        <utils.Trash/>
                                    </button>
                                    &nbsp;&nbsp;
                                    <button className="flex items-center"><FaEdit className="text-blue-600 size-4" /></button>
                                </td>
                            </tr>
                        )))
                    }
                </tbody>
            </table>
            {
                showDeleteBox && <utils.ModalDelete
                    isShowBox={showDeleteBox}
                    selectedId={selectedId}
                    onDelete={handleDelete}
                    onClose={()=>setShowDeleteBox(!showDeleteBox)}
                    apiURL={`${import.meta.env.VITE_API_URL}/api/status/${selectedId}`}
                />
            }
        </section>
    );
};




