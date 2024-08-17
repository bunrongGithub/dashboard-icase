import React, { ChangeEvent, useEffect, useState } from "react";
import { FaEye, FaRegSave, FaUndoAlt } from "react-icons/fa";
import { PhoneServicesItemProps, PhoneServicesProps, ViewPhoneServiceProps } from "./definition";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { PaymentMethodProps } from "../settings/payment_method/definition";
import { PaymentStatusProps } from "../settings/payment_status/definition";
import { ColorsProps } from "../settings/colors/definition";

export const PhoneServiceUpdate: React.FC = () => {
    const [itemDetails, setItemDetails] = useState<ViewPhoneServiceProps>();
    const [phoneItems, setPhoneItems] = useState<PhoneServicesItemProps[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodProps[]>([]);
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatusProps[]>([]);
    const [colors, setColors] = useState<ColorsProps[]>([]);
    const { id } = useParams();
    useEffect(() => {
        const getItemsDetailById = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/service/${id}`)
                if (response.status === 200)
                    setPhoneItems(response.data?.repaireItem)
                setItemDetails(response.data)
            } catch (error) {
                console.error(error)
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
        getItemsDetailById();
        getColors();
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
    type ItemId = number | string | undefined | null
    const handlePhoneItemChange = (itemId: ItemId, keyprop: keyof PhoneServicesItemProps) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = event.target;
        setPhoneItems((prev) => (
            prev.map((phone) => (
                itemId === phone.itemId ? {
                    ...phone, [keyprop]: value
                } : phone
            ))
        ))
    }
    const handleSaveChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }
    return (
        <main className=" flex items-center justify-center">
            <article className="bg-white rounded-lg shadow-lg w-full p-6">
                <header className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">View & Update</h3>
                    <button className="text-gray-600 hover:text-gray-900 p-2 rounded-full">
                        <FaEye className="text-[#12263f]" size={20} />
                    </button>
                </header>
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
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">{itemDetails?.repair?.deviceNumbers} Number of Phones Details</h4>
                        <table className="min-w-full divide-y divide-gray-200">
                            <TablePhoneItemHead />
                            <tbody className="bg-slate-50 shadow-sm">
                                {phoneItems.map((phone, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <input
                                                type="text"
                                                onChange={handlePhoneItemChange(phone.itemId, 'moName')}
                                                value={phone.moName}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <select
                                                onChange={handlePhoneItemChange(phone.itemId ,'colorName')}
                                                value={phone.colorName || ''}
                                                className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}
                                            >
                                                <optgroup label="---Select one---">
                                                    {colors?.map((color, index) => (
                                                        phone?.colorId === color.colorId ?
                                                            <option key={index} value={color.colorName}>{color.colorName}</option> : <option key={index} value={color.colorName}>{color.colorName}</option>
                                                    ))}
                                                </optgroup>
                                            </select>
                                            {/* <input
                                                type="text"
                                                onChange={handlePhoneItemChange(phone.itemId , 'colorName')}
                                                value={phone.colorName}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            /> */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <input
                                                type="text"
                                                onChange={handlePhoneItemChange(phone.itemId, 'password')}
                                                value={phone.password}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <input
                                                type="text"
                                                onChange={handlePhoneItemChange(phone.itemId, 'problem')}
                                                value={phone.problem}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <input
                                                type="text"
                                                onChange={handlePhoneItemChange(phone.itemId, 'techName')}
                                                value={phone.techName}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <input
                                                type="text"
                                                onChange={handlePhoneItemChange(phone.itemId, 'price')}
                                                value={phone.price}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <input
                                                type="text"
                                                onChange={handlePhoneItemChange(phone.itemId, 'statusName')}
                                                value={phone.statusName}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <input
                                                type="text"
                                                onChange={handlePhoneItemChange(phone.itemId, 'psName')}
                                                value={phone.psName}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </article>
                    <div className="flex justify-end mt-6 pt-4">
                        <NavLink to="../services" className="mx-5 bg-red-600 flex items-center hover:bg-red-700 text-white px-4 py-2 rounded-md">
                            <FaUndoAlt /> Back
                        </NavLink>
                        <button type="submit" className="bg-blue-700 flex items-center text-white px-4 py-1.5 rounded-lg hover:bg-blue-800 transition">
                            <FaRegSave />&nbsp; Save Change
                        </button>
                    </div>
                </form>

            </article>
        </main>
    );
}


const TablePhoneItemHead: React.FC = () => {
    const tableHead = [
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Model" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Phone Color" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Password" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Problem" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Responsible" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Price" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Status Paid" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Status Fixed" }
    ]
    return <>
        <thead className="bg-[#12263f] text-slate-100">
            <tr>
                {tableHead.map((th, index) => (
                    <th key={index} className={th.cssClass}>
                        {th.name}
                    </th>
                ))}
            </tr>
        </thead>
    </>
}