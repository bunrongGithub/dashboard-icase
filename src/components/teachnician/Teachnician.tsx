import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { LoadingSkeleton } from "../skeleton/TableLoading";
import TeachnicianProps from "./types/definition"
const widths = [50, 150, 150];
import AddBtn from "../utils/assets/atoms/AddBtn";
import { utils } from "../utils";
import { NavLink } from "react-router-dom";

export const Teachnicain: React.FC = () => {
    const [teachnician, setTeachnician] = useState<TeachnicianProps[]>([]);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [skeletonRow,setSkeletonRow] = useState<number | undefined>(undefined);
    const [showDeleteBox,setShowDeleteBox] = useState<boolean>(false);
    const [selectedId,setSelectedId] = useState<number | undefined>(undefined)
    useEffect(() => {
        const fetchTeachnician = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/teachnician`);
                setTeachnician(response.data);
                setSkeletonRow(response.data.length);
                
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeachnician();
    }, []);
    const handleDelete = (id: number | undefined): void => {
        if(id){
            setTeachnician(prev => prev.filter((item) => item.techId !== id));
            
            setSelectedId(undefined)
        }
    }
    return (
        <section className="overflow-x-auto bg-white shadow-md rounded-lg">
            <div className="w-full p-2 flex items-center justify-end">
            <AddBtn link_to_page="../teachnician/create"/>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <TableHeading/>
                <tbody className="bg-white divide-y divide-gray-200">
                    {error && <tr><td colSpan={3} className="text-red-700 text-center">{error.message}</td></tr>}
                    {loading ? (
                        <LoadingSkeleton number={skeletonRow as number} widths={widths} />
                    ) : (
                        teachnician.map((teach,index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teach.techName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teach.skills}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teach.responsible}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teach.roleName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teach.salary}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">{teach.contact}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                    <button onClick={() => {setSelectedId(teach.techId),setShowDeleteBox(!showDeleteBox)}}><utils.Trash/></button>
                                    &nbsp;&nbsp;
                                    <NavLink to={'../teachnician/update/'+ teach.techId} className="flex items-center"><utils.EditeIcon/></NavLink>
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
                onClose={() => setShowDeleteBox(!showDeleteBox)}
                apiURL={`${import.meta.env.VITE_API_URL}/api/teachnician/${selectedId}`}
                />
            }
        </section>
    );
};




const TableHeading:React.FC = () => {
    const tableHeader = [
        {cssClass:'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',name:'No'},
        {cssClass:'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',name:'Teachnicain Name'},
        {cssClass:'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',name:'Skill'},
        {cssClass:'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',name:'Responsibility'},
        {cssClass:'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',name:'Permission'},
        {cssClass:'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',name:'Salary'},
        {cssClass:'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',name:'Contact'},
        {cssClass:'px-6 py-3 text-left text-xs font-medium uppercase flex items-center tracking-wider',name:'Action', svg:<FaCog />},
    ]
    return <thead className="bg-[#12263f] text-white">
        <tr>
            {
                tableHeader.map((item,index) => (
                    <td key={index} className={item.cssClass}>
                      {item.svg}  {item.name}
                    </td>
                ))
            }
        </tr>
    </thead>

}