import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FaPlus, FaPrint, FaRegSave, FaTrash, FaUndoAlt } from 'react-icons/fa'
import { PhoneServicesItemProps, PhoneServicesProps } from './definition';
import { PhoneModelType } from '../settings/phone_model/definition';
import axios from 'axios';
import { ColorsProps } from '../settings/colors/definition';
import TeachnicianProps from '../teachnician/types/definition';
import { NavLink } from 'react-router-dom';
import { PaymentStatusProps } from '../settings/payment_status/definition';
import AlertBox from './AlertBox';
export const PhoneServiceCreate: React.FC = () => {
  const [itemDetail, setItemDetail] = useState<PhoneServicesProps>({
    phoneNumber: '',
    accept_date: '',
    warrantyperoid: '',
    duration: '',
    description: '',
    psId: null
  })
  const [items, setItems] = useState<PhoneServicesItemProps[]>([]);
  const [models, setModels] = useState<PhoneModelType[]>([]);
  const [colors, setColors] = useState<ColorsProps[]>([]);
  const [teachnician, setTeachnician] = useState<TeachnicianProps[]>([]);
  const [validateMessage, setValidateMessage] = useState<string>('');
  const [validateItems, setValidateItems] = useState<string | any>('');
  const [validateItemsLengthMessage, setValidateItemsLengthMessage] = useState<string>('')
  const validateItemLength: number = items?.length;
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusProps[]>([]);
  const [validatePaymentStatus, setValidatePaymentStatus] = useState<string>('');
  const [isResponding, setIsResponding] = useState<boolean>(false);
  const [respondingInsertId, setRespondingInsertId] = useState<number | undefined>();
  const [respondingMessage, setRespondingMessage] = useState<string>('')
  useEffect(() => {
    const getPaymentStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/payment_status`);
        setPaymentStatus(response.data);
      } catch (error: any) {
        console.log(error);
      }
    }
    const getPhoneModels = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/models`);
        setModels(response.data);
      } catch (error: any) {
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
    const fetchTeachnician = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/teachnician`);
        setTeachnician(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };
    getPaymentStatus();
    getColors();
    getPhoneModels();
    fetchTeachnician();
  }, [])
  const handleAddItem = (): void => {
    const newItems: PhoneServicesItemProps = {
      moId: null,
      colorId: null,
      password: '',
      problem: '',
      techId: null,
      price: '',
      stausId: null,
      psId: null,
    }
    setItems([...items, newItems])
  }
  const handleChangeItem = (index: number, key: keyof PhoneServicesItemProps) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = event.target;
    setItems(prev => (
      prev?.map((item, idx) => (
        index === idx ? {
          ...item, [key]: value
        } : item
      ))
    ))
  }

  const handleItemDetailChange = (keyprop: keyof PhoneServicesProps) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = event.target;
    setItemDetail(prev => ({
      ...prev, [keyprop]: value
    }))
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { phoneNumber, accept_date, duration, description, warrantyperoid, psId } = itemDetail;
    if (phoneNumber === '' || accept_date === '') {
      setValidateMessage("Phone number & accept date are require!")
      return;
    }
    if (psId === 0 || psId === null || psId === '') {
      setValidatePaymentStatus("Payment Status are require please select!")
      return;
    }
    setValidatePaymentStatus("")
    setValidateMessage('');
    if (!validateItemLength) {
      setValidateItemsLengthMessage("Item must has a row!")
      return;
    }
    setValidateItemsLengthMessage("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/service`, {
        phoneNumber, accept_date, duration, description, warrantyperoid, psId, items
      })
      if (response.status === 200) {
        setIsResponding(true)
        setValidateItems("")
        setRespondingInsertId(response?.data?.body?.insertId);
        setRespondingMessage(response?.data?.body?.message)
      }
    } catch (error: any) {
      setValidateItems(error?.response?.data?.message)
    }
  }
  return (
    <main className='flex items-center justify-center'>
      <article className='bg-white rounded-lg w-full p-6'>
        {
          respondingMessage &&
          <AlertBox message={respondingMessage} setMessage={() => setRespondingMessage('')} />
        }
        <form onSubmit={handleSubmit} action="">
          {validateMessage && <p style={{ letterSpacing: "1.5px" }} className='text-rose-800 font-medium'>{validateMessage}</p>}
          <section className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 border border-gray-200 rounded-lg'>
            <div className='lex flex-col space-y-4'>
              <div className='flex flex-col'>
                <label htmlFor="phoneNumber" className="font-medium text-gray-800">Phone Number:</label>
                <input
                  autoFocus
                  id="phoneNumber"
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={itemDetail?.phoneNumber || ''}
                  onChange={handleItemDetailChange('phoneNumber')}
                  placeholder='Enter phone'
                />
              </div>
            </div>
            <div className='lex flex-col space-y-4'>
              <div className='flex flex-col'>
                <label htmlFor="accept_date" className="font-medium text-gray-800">Received Date:</label>
                <input
                  id="accept_date"
                  type="date"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  value={itemDetail?.accept_date || ''}
                  onChange={handleItemDetailChange('accept_date')}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="serviceDuration" className="font-medium text-gray-800">Service Duration:</label>
              <input
                id="serviceDuration"
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-md"
                placeholder='Enter duration'

                value={itemDetail?.duration || ''}
                onChange={handleItemDetailChange('duration')}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="warrantyPeriod" className="font-medium text-gray-800">Warranty Period(optional):</label>
              <input
                id="warrantyPeriod"
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-md"
                placeholder='Enter warranty'

                value={itemDetail?.warrantyperoid || ''}
                onChange={handleItemDetailChange('warrantyperoid')}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="font-medium text-gray-800">Description(optional):</label>
              <input
                id="description"
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-md"
                placeholder='Enter desc'

                value={itemDetail?.description || ''}
                onChange={handleItemDetailChange('description')}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="paymentStatus" className="font-medium text-gray-800">Payment Status: <span className='text-red-800'>*</span></label>
              {validatePaymentStatus && <p className='text-red-800 text-[12px]'>{validatePaymentStatus}</p>}
              <select
                className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}
                onChange={handleItemDetailChange('psId')}
                value={itemDetail?.psId || ''}
              >
                <option value="" >
                  ---Select one---
                </option>
                {paymentStatus?.map((ps, psIndex) => (
                  <option key={psIndex} value={ps.psId}>
                    {ps.psName}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <section className='mb-6'>
            <div className="flex items-center justify-between ">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">#Items</h4>
              <button
                type='button'
                className="bg-blue-700 flex items-center text-white px-4 py-1.5 rounded-lg hover:bg-blue-800 transition"
                onClick={handleAddItem}
              >
                <FaPlus />&nbsp;Add
              </button>
            </div>
            {validateItems && <p style={{ letterSpacing: "1.5px" }} className='text-red-800 font-medium mb-2'>{validateItems}</p>}
            {validateItemsLengthMessage && <p className='text-rose-800 tracking-widest text-[20px]'>{validateItemsLengthMessage}</p>}
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeading />
              <tbody className="bg-slate-50 shadow-sm">
                {
                  items?.map((item, index) => (
                    <tr key={index}>
                      <td className="py-4 whitespace-nowrap text-sm text-gray-900">
                        <select
                          onChange={(event) => handleChangeItem(index, 'moId')(event)}
                          value={item.moId || ''} name="" id=""
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
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
                          onChange={(event) => handleChangeItem(index, 'colorId')(event)}
                          value={item.colorId || ''}
                          className="w-full p-2 border border-gray-300 rounded-md"

                        >
                          <option value="">--select one---</option>
                          {colors?.map((color, colorIndex) => (
                            <option
                              key={colorIndex} value={color.colorId}>{color.colorName}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                          type="text"
                          onChange={e => handleChangeItem(index, 'password')(e)}
                          value={item.password || ''}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                          type="text"
                          onChange={e => handleChangeItem(index, 'problem')(e)}
                          value={item.problem || ''}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                          type="number"
                          onChange={e => handleChangeItem(index, 'price')(e)}
                          value={item.price || 0.00}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <select
                          onChange={event => handleChangeItem(index, 'techId')(event)}
                          value={item?.techId || ''}
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
                        <button className='flex items-center' type='button'>
                          <FaTrash className='text-red-700' />
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <FooterAction netWorkResponding={isResponding} selectedId={respondingInsertId} />
          </section>
        </form>
      </article>
    </main>
  )
}
const TableHeading: React.FC = () => {
  const tableHeading = [
    { css: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Model" },
    { css: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Color" },
    { css: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Password" },
    { css: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Problem" },
    { css: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Price" },
    { css: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Responsible" },
    { css: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Action" },
  ]
  return (
    <thead className="bg-[#12263f] text-slate-100">
      <tr>
        {
          tableHeading.map((item, index) => (
            <th key={index} className={item.css}>{item.name}</th>
          ))
        }
      </tr>
    </thead>
  )
}
type FooterActionProps = {
  netWorkResponding: boolean
  selectedId: number | undefined
}
const FooterAction: React.FC<FooterActionProps> = ({ netWorkResponding, selectedId }) => {
  return (
    <div className="flex justify-end items-center">
      <NavLink to="../services" className=" bg-red-600 flex items-center hover:bg-red-700 text-white px-3 py-1 rounded-md m-5">
        <FaUndoAlt /> Back
      </NavLink>
      {
        netWorkResponding ?
          <NavLink to={`../services/print/${selectedId}`} className=" bg-green-700 flex items-center hover:bg-green-800 text-white px-3 py-1 rounded-md m-5">
            <FaPrint /> Print
          </NavLink> : ''
      }
      <button type="submit"
        className=" bg-blue-700 flex items-center hover:bg-blue-800 text-white px-3 py-1 rounded-md"
      >                <FaRegSave />&nbsp;Save
      </button>
    </div>
  )
}