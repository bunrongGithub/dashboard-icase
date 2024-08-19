import React, { ChangeEvent, useEffect, useState } from "react";
import { FaEye, FaPlus, FaRegSave, FaTrash, FaUndoAlt } from "react-icons/fa";
import { PhoneServicesItemProps, PhoneServicesProps, ViewPhoneServiceProps } from "./definition";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { PaymentMethodProps } from "../settings/payment_method/definition";
import { PaymentStatusProps } from "../settings/payment_status/definition";
import { ColorsProps } from "../settings/colors/definition";
import { PhoneModelType } from "../settings/phone_model/definition";
import StatusProps from "../settings/status/definition";
import TeachnicianProps from "../teachnician/definition";
import { TablePhoneItemHead } from "./TablePhoneItemHead";
import AlertBox from "./AlertBox";
import { ViewAndUpdateHeader } from "./ViewAndUpdateHeader";
import ViewAndUpdateFooter from "./ViewAndUpdateFooter";
export const PhoneServiceUpdate: React.FC = () => {
    const [itemDetails, setItemDetails] = useState<ViewPhoneServiceProps>();
    const [phoneItems, setPhoneItems] = useState<PhoneServicesItemProps[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodProps[]>([]);
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatusProps[]>([]);
    const [status, setStatus] = useState<StatusProps[]>([])
    const [models, setModels] = useState<PhoneModelType[]>([]);
    const [colors, setColors] = useState<ColorsProps[]>([]);
    const [teachnician, setTeachnician] = useState<TeachnicianProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [repsonseMessage, setResponseMessage] = useState<string>('')
    const { id } = useParams();
    useEffect(() => {
        const getItemsDetailById = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/service/${id}`)
                if (response.status === 200) {
                    setItemDetails(response.data)
                    setPhoneItems(response.data?.repaireItem)
                }
            } catch (error) {
                console.error(error)
            }
        }
        const getPhoneModels = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/models`);
                setModels(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        const getColors = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/colors`);
                if (response.status === 200) {
                    setColors(response.data);
                }
            } catch (error: any) {
                console.error(error);
            }
        }
        const getPaymentMethod = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/payment_method`);
                setPaymentMethod(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        const getPaymentStatus = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/payment_status`);
                setPaymentStatus(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        const getStatus = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/status`);
                setStatus(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        const fetchTeachnician = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/teachnician`);
                setTeachnician(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTeachnician();
        getStatus();
        getItemsDetailById();
        getColors();
        getPhoneModels();
        getPaymentStatus();
        getPaymentMethod();
    }, [])

    const handleItemDetailChange = (keyprop: keyof PhoneServicesProps) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = event.target;
        console.log(event.target);

        setItemDetails(prev => ({
            ...prev, repair: {
                ...prev?.repair, [keyprop]: value
            }
        }))
    }
    const handleItemDetailChangell = (keyprops: keyof ViewPhoneServiceProps) => (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        console.log(event.target);

        setItemDetails(prev => ({
            ...prev
            , [keyprops]: value
        }))
    }
    type ItemId = number | string;
    const handlePhoneItemChange = (itemIndex: ItemId, keyprop: keyof PhoneServicesItemProps) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = event.target;
        setPhoneItems((prev) => (
            prev.map((phone, index) => (
                itemIndex === index ? {
                    ...phone, [keyprop]: value
                } : phone
            ))
        ))
    }
    const handleAddMoreRow = (): void => {
        const newItems: PhoneServicesItemProps = {
            moId: null,
            colorId: null,
            password: '',
            problem: '',
            techId: null,
            price: '',
            stausId: null,
            psId: null,
            repId: id
        }
        setPhoneItems([...phoneItems, newItems])
    };

    const handleSaveChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/service/${id}`, {
                itemDetails, phoneItems
            });
            if (response.status === 200) {
                setResponseMessage(response.data?.message)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    const removeRow = async (index:number):Promise<void> => {
        const itemId = phoneItems[index].itemId;
        if(itemId){
            const response  = await axios.delete(`${import.meta.env.VITE_API_URL}/api/repaire_item/${itemId}`)
            if(response.status === 200){
                setPhoneItems((prevItems) => 
                    prevItems.filter((item) => item.itemId !== itemId)
                );
            }
        }
    }
    return (
        <main className=" flex items-center justify-center">
            <article className="bg-white rounded-lg shadow-lg w-full p-6">
                <ViewAndUpdateHeader handleAddMoreRow={handleAddMoreRow} />
                {
                    repsonseMessage && (
                        <AlertBox 
                            message={repsonseMessage} 
                            setMessage={() => setResponseMessage('')}
                        />
                    )
                }
                <form onSubmit={handleSaveChange}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 border border-gray-200 rounded-lg">
                        <section className="flex flex-col space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="phoneNumber" className="font-medium text-gray-800">Phone Number:</label>
                                <input
                                    id="phoneNumber"
                                    type="text"
                                    onChange={handleItemDetailChange('phoneNumber')}
                                    value={itemDetails?.repair?.phoneNumber || ''}
                                    className="mt-1 p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="receivedDate" className="font-medium text-gray-800">Received Date:</label>
                                <input
                                    id="receivedDate"
                                    type="date"
                                    onChange={handleItemDetailChange('accept_date')}
                                    value={itemDetails?.repair?.accept_date || ''}
                                    className="mt-1 p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="serviceDuration" className="font-medium text-gray-800">Service Duration:</label>
                                <input
                                    id="serviceDuration"
                                    type="text"
                                    onChange={handleItemDetailChange('duration')}
                                    value={itemDetails?.repair?.duration || ''}
                                    className="mt-1 p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </section>
                        <section className="flex flex-col space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="warrantyPeriod" className="font-medium text-gray-800">Warranty Period:</label>
                                <input
                                    id="warrantyPeriod"
                                    type="text"
                                    onChange={handleItemDetailChange("warrantyperoid")}
                                    value={itemDetails?.repair?.warrantyperoid || ''}
                                    className="mt-1 p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="paymentStatus" className="font-medium text-gray-800">Payment Status:</label>
                                <select
                                    id="paymentStatus"
                                    onChange={handleItemDetailChange('psName')}
                                    value={itemDetails?.repair?.psName || ''}
                                    className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}
                                >
                                    <optgroup label="---Select one---">
                                        {paymentStatus?.map((method, index) => (
                                            itemDetails?.repair?.psId === method.psId ?
                                                <option key={index} value={method.psId}>{method.psName}</option> : <option key={index} value={method.psId}>{method.psName}</option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="payment_method" className="font-medium text-gray-800">Payment Method:</label>
                                <select
                                    id="payment_method"

                                    onChange={handleItemDetailChange('payment_method_name')}
                                    value={itemDetails?.repair?.payment_method_name || ''}
                                    className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}
                                >
                                    <optgroup label="---Select one---">
                                        {paymentMethod?.map((method, index) => (
                                            itemDetails?.repair?.payment_method_id === method.payment_method_id ?
                                                <option key={index} value={method.payment_method_id}>{method.payment_method_name}</option> : <option key={index} value={method.payment_method_id}>{method.payment_method_name}</option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>
                        </section>
                        <section className="flex flex-col space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="serviceStatus" className="font-medium text-gray-800">Service Status:</label>
                                <input
                                    id="serviceStatus"
                                    readOnly
                                    type="text"
                                    onChange={handleItemDetailChangell('statusFixed')}
                                    value={itemDetails?.statusFixed || ''}
                                    className={`mt-1 p-2 border border-gray-300 rounded-md ${itemDetails?.statusFixed === 'done'
                                        ? 'bg-green-100 text-green-800'
                                        : itemDetails?.statusFixed?.toLowerCase() === 'pending'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="deviceNumbers" className="font-medium text-gray-800">Number of Phones:</label>
                                <input
                                    id="deviceNumbers"
                                    type="text"
                                    onChange={handleItemDetailChange('deviceNumbers')}
                                    value={`${itemDetails?.repair?.deviceNumbers || ''}`}
                                    className="mt-1 p-2 border border-gray-300 rounded-md text-green-800"
                                    style={{ letterSpacing: "1.5px" }}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="totalPrice" className="font-medium text-gray-800">Total Price:</label>
                                <input
                                    id="totalPrice"
                                    type="text"
                                    onChange={handleItemDetailChangell('total')}
                                    value={`${itemDetails?.total || ''}`}
                                    className="mt-1 p-2 border border-gray-300 rounded-md text-green-800 font-medium"
                                    style={{ letterSpacing: "1.5px" }}
                                />
                            </div>
                        </section>
                    </div>
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 border border-gray-200 rounded-lg">
                        <div className="flex flex-col">
                            <label htmlFor="description" className="font-medium text-gray-800">Description:</label>
                            <input
                                id="description"
                                type="text"
                                onChange={handleItemDetailChange('description')}
                                value={itemDetails?.repair?.description || ''}
                                className="mt-1 p-2 border border-gray-300 rounded-md text-green-800"
                                style={{ letterSpacing: "1.5px" }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="creationDate" className="font-medium text-gray-800">Creation Date:</label>
                            <input
                                id="creationDate"
                                type="date"
                                onChange={handleItemDetailChange('created_at')}
                                value={itemDetails?.repair?.created_at || ''}
                                className="mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="updateDate" className="font-medium text-gray-800">Update Date:</label>
                            <input
                                id="updateDate"
                                type="date"
                                onChange={handleItemDetailChange('updated_at')}
                                value={itemDetails?.repair?.updated_at || ''}
                                className="mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </section>
                    {/* Sub-Table for additional data */}
                    <article className="mb-6">
                        <div className="flex items-center justify-between ">
                            <h4 className="text-xl font-semibold text-gray-900 mb-4">{itemDetails?.repair?.deviceNumbers} Number of Phones Details</h4>

                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <TablePhoneItemHead />
                            <tbody className="bg-slate-50 shadow-sm">
                                {phoneItems.map((phone, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <select
                                                onChange={handlePhoneItemChange(index, 'moId')}
                                                value={phone.moId || ''} name="" id="" className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}>
                                                <option value="">---select one---</option>
                                                {
                                                    models?.map((model, modelIndex) => (
                                                        <option key={modelIndex} value={model.moId}>{model.moName}</option>
                                                    ))
                                                }
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <select
                                                onChange={handlePhoneItemChange(index, 'colorId')}
                                                value={phone.colorId || ''}
                                                className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}
                                            >
                                                <option value="">--select one---</option>
                                                {colors?.map((color, colorIndex) => (
                                                    <option key={colorIndex} value={color.colorId}>{color.colorName}</option>
                                                ))}

                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <input
                                                type="text"
                                                onChange={handlePhoneItemChange(index, 'password')}
                                                value={phone.password || ''}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <input
                                                type="text"
                                                onChange={handlePhoneItemChange(index, 'problem')}
                                                value={phone.problem || ''}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <select
                                                onChange={handlePhoneItemChange(index, 'techId')}
                                                value={phone?.techId || ''}
                                                className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}
                                            >
                                                <option value="" >
                                                    ---Select one---
                                                </option>
                                                {teachnician?.map((tech, techIndex) => (
                                                    <option key={techIndex} value={tech.techId}>
                                                        {tech.techName}
                                                    </option>
                                                ))}

                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <input
                                                type="text"
                                                onChange={handlePhoneItemChange(index, 'price')}
                                                value={phone.price || ''}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <select
                                                onChange={handlePhoneItemChange(index, 'stausId')}
                                                value={phone?.stausId || ''}
                                                className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}
                                            >
                                                <option value="" disabled>
                                                    ---Select one---
                                                </option>
                                                {status?.map((statusItem, statusIndex) => (
                                                    <option key={statusIndex} value={statusItem.statusId}>
                                                        {statusItem.statusName}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <select name="" value={phone.psId || ''}
                                                className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}
                                                onChange={handlePhoneItemChange(index, 'psId')}
                                                id=""
                                            >
                                                <option value="">
                                                    ---Select one---
                                                </option>
                                                {paymentStatus?.map((ps, index) => (
                                                    phone?.psId === ps.psId ?
                                                        <option key={index} value={ps.psId}>{ps.psName}</option>
                                                        :
                                                        <option key={index} value={ps.psId}>{ps.psName}</option>
                                                ))}

                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <button type="button" onClick={() => removeRow(index)} className="text-red-600"><FaTrash className="size-5" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </article>
                   <ViewAndUpdateFooter loading={loading} />
                </form>
            </article>
        </main>
    );
}

