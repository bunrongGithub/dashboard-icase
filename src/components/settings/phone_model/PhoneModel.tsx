import axios from "axios";
import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { LoadingSkeleton } from "../../skeleton/TableLoading";
import { PhoneModelType } from "./definition";
const widths = [50, 150, 150];

import { utils } from "../../utils";
import AddBtn from "../../utils/assets/atoms/AddBtn";
export const PhoneModel: React.FC = () => {
    const [phoneModel, setPhoneModel] = useState<PhoneModelType[]>([]);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState(true);
    /** Show modal state */
    const [show, setShow] = useState<boolean>(false);
    const [showDeleteBox, setShowDeleteBox] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined)
    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/models`);
                setPhoneModel(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchModels();
    }, []);
    /** handle with modal function */
    const handleToggleModal = (): void => {
        setShow(prev => !prev);
    }
    /** Save data to server function with modal */
    const handleSave = async (value: string) => {
        try {
            if (value.trim() !== '') {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/models`, {
                    moName: value
                });
                if (response.status === 201) {
                    const data = response.data?.moName;
                    setPhoneModel(prev => [...prev, data])
                }
            }
        } catch (error: any) {
            throw Error(error)
        }
    }
    const handleDelete =(id: number | undefined):void => {
        if(id){
            setPhoneModel(prev => prev.filter(item => item.moId !== id));
            setSelectedId(undefined);
        }
    }
    return (
        <section className="overflow-x-auto bg-white shadow-md rounded-lg">
            {
                show && <utils.ModalAdd
                    isOpen={show}
                    onSave={handleSave}
                    onClose={handleToggleModal}
                    modalHeading="Add New Phone Model"
                    modalTitle="Enter phone name"
                />
            }
            <div className="w-full p-2 flex items-center justify-end">
                <AddBtn onModalShow={handleToggleModal} target={false} />
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#12263f] text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Model Name</th>
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
                        phoneModel.map(phone => (
                            <tr key={phone.moId} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{phone.moId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{phone.moName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                    <button onClick={() => { setSelectedId(phone.moId); setShowDeleteBox(!showDeleteBox); }}><utils.Trash/></button>
                                    &nbsp;&nbsp;
                                    <button className="flex items-center"><utils.EditeIcon /></button>
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
                apiURL={`${import.meta.env.VITE_API_URL}/api/models/${selectedId}`}
            />
            }
        </section>
    );
};




