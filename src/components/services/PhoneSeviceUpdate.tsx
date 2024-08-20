import React, { ChangeEvent, useEffect, useState } from "react";
import { PhoneServicesItemProps, PhoneServicesProps, ViewPhoneServiceProps } from "./definition";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PaymentMethodProps } from "../settings/payment_method/definition";
import { PaymentStatusProps } from "../settings/payment_status/definition";
import { TablePhoneItemHead } from "./TablePhoneItemHead";
import AlertBox from "./AlertBox";
import { ViewAndUpdateHeader } from "./ViewAndUpdateHeader";
import ViewAndUpdateFooter from "./ViewAndUpdateFooter";
import { TablePhoneItemBody } from "./TablePhoneItemBody";
export const PhoneServiceUpdate: React.FC = () => {
   const [itemDetails, setItemDetails] = useState<ViewPhoneServiceProps>();
   const [phoneItems, setPhoneItems] = useState<PhoneServicesItemProps[]>([]);
   const [paymentMethod, setPaymentMethod] = useState<PaymentMethodProps[]>([]);
   const [paymentStatus, setPaymentStatus] = useState<PaymentStatusProps[]>([]);
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
      getPaymentStatus()
      getItemsDetailById();
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
   const removeRow = async (index: number): Promise<void | HTMLButtonElement> => {
      const itemId = phoneItems[index].itemId;
      if (itemId) {
         const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/repaire_item/${itemId}`)
         if (response.status === 200) {
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
                           onChange={handleItemDetailChange('psId')}
                           value={itemDetails?.repair?.psId || ''}
                           className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}
                        >
                           <option value="">---select one---</option>
                           {paymentStatus?.map((method, index) => (
                              <option key={index} value={method.psId}>{method.psName}</option>
                           ))}
                        </select>
                     </div>
                     <div className="flex flex-col">
                        <label htmlFor="payment_method" className="font-medium text-gray-800">Payment Method:</label>
                        <select
                           id="payment_method"
                           onChange={handleItemDetailChange('payment_method_id')}
                           value={itemDetails?.repair?.payment_method_id || ''}
                           className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}
                        >
                           <option value="">---select one---</option>
                           {paymentMethod?.map((method, index) => (
                              <option key={index} value={method.payment_method_id}>{method.payment_method_name}</option>
                           ))}
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
                           <TablePhoneItemBody
                              key={index}
                              dataItems={phone}
                              index={index}
                              handlePhoneItemChange={handlePhoneItemChange}
                              removeRow={removeRow}
                           />
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

