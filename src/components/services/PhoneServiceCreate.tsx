import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FaPlus, FaRegSave, FaTrash, FaUndoAlt } from 'react-icons/fa'
import { PhoneServicesItemProps, PhoneServicesProps } from './definition';
import { PhoneModelType } from '../settings/phone_model/definition';
import axios from 'axios';
import { ColorsProps } from '../settings/colors/definition';
import TeachnicianProps from '../teachnician/definition';
import { NavLink } from 'react-router-dom';

export const PhoneServiceCreate: React.FC = () => {
  const [itemDetail, setItemDetail] = useState<PhoneServicesProps>({
    phoneNumber:'' ,
    accept_date:'',
    warrantyperoid:'',
    duration:'',
    description:''
  })
  const [items, setItems] = useState<PhoneServicesItemProps[]>([]);
  const [models, setModels] = useState<PhoneModelType[]>([]);
  const [colors, setColors] = useState<ColorsProps[]>([]);
  const [teachnician, setTeachnician] = useState<TeachnicianProps[]>([]);

  useEffect(() => {
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
    const fetchTeachnician = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/teachnician`);
        setTeachnician(response.data);
      } catch (error) {
        console.error(error);
      }
    };
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
      ...prev,[keyprop]: value
    }))
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {phoneNumber,accept_date,duration,description,warrantyperoid} = itemDetail;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/service`,{
        phoneNumber,accept_date,duration,description,warrantyperoid,items
      })
      if(response.status === 200){
        console.log(response.data);
      }
    } catch (error: any) {
     console.log(error?.response?.data?.message);
      
    }
  }
  return (
    <main className='flex items-center justify-center'>
      <article className='bg-white rounded-lg w-full p-6'>
        <form onSubmit={handleSubmit} action="">
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#12263f] text-slate-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Model</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Color</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Password</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Problem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Responsible</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
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
                          type="text"
                          onChange={e => handleChangeItem(index, 'price')(e)}
                          value={item.price || ''}
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
            <div className="flex justify-end items-center">
              <NavLink to="../services" className=" bg-red-600 flex items-center hover:bg-red-700 text-white px-3 py-1 rounded-md m-5">
                <FaUndoAlt /> Back
              </NavLink>

              <button type="submit"
              className=" bg-blue-700 flex items-center hover:bg-blue-800 text-white px-3 py-1 rounded-md"
              >                <FaRegSave />&nbsp;Save
              </button>
            </div>
          </section>
        </form>
      </article>
    </main>
  )
}
