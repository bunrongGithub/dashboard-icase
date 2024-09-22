import React, { ChangeEvent, useEffect, useState } from "react"
import { PhoneServicesItemProps } from "./definition"
import { PhoneModelType } from "../settings/phone_model/definition"
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { ColorsProps } from "../settings/colors/definition";
import TeachnicianProps from "../teachnician/types/definition";
import StatusProps from "../settings/status/definition";
import { PaymentStatusProps } from "../settings/payment_status/definition";
interface TablePhoneItemBodyProps {
  dataItems: PhoneServicesItemProps,
  index: number;
  handlePhoneItemChange?: (itemIndex: number | string, key: keyof PhoneServicesItemProps) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  removeRow?: (index: number) => void;
}
export const TablePhoneItemBody: React.FC<TablePhoneItemBodyProps> = ({
  dataItems, index, handlePhoneItemChange, removeRow
}) => {
  const [models, setModels] = useState<PhoneModelType[]>([]);
  const [colors, setColors] = useState<ColorsProps[]>([]);
  const [teachnician, setTeachnician] = useState<TeachnicianProps[]>([]);
  const [status, setStatus] = useState<StatusProps[]>([])
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusProps[]>([]);
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
    const getStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/status`);
        setStatus(response.data);
      } catch (error) {
        console.error(error);
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
    getPaymentStatus();
    getStatus();
    fetchTeachnician();
    getColors();
    getPhoneModels();
  }, []);
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <select
            onChange={handlePhoneItemChange ? (event) => handlePhoneItemChange(index, 'moId')(event) : undefined}
            value={dataItems.moId || ''} name="" id="" className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}>
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
            onChange={handlePhoneItemChange ? (event) => handlePhoneItemChange(index, 'colorId')(event) : undefined}
            value={dataItems.colorId || ''}
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
            onChange={handlePhoneItemChange ? event => handlePhoneItemChange(index, 'password')(event) : undefined}
            value={dataItems.password || ''}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <input
            type="text"
            onChange={handlePhoneItemChange ? event => handlePhoneItemChange(index, 'problem')(event) : undefined}
            value={dataItems.problem || ''}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <select
            onChange={handlePhoneItemChange ? event => handlePhoneItemChange(index, 'techId')(event) : undefined}
            value={dataItems?.techId || ''}
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
            onChange={handlePhoneItemChange ? e => handlePhoneItemChange(index, 'price')(e) : undefined}
            value={dataItems.price || ''}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <select
            onChange={handlePhoneItemChange ? e => handlePhoneItemChange(index, 'stausId')(e) : undefined}
            value={dataItems?.stausId || ''}
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
          <select name="" value={dataItems.psId || ''}
            className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}
            onChange={handlePhoneItemChange ? e => handlePhoneItemChange(index, 'psId')(e) : undefined}
            id=""
          >
            <option value="">
              ---Select one---
            </option>
            {paymentStatus?.map((ps, index) => (
              <option key={index} value={ps.psId}>
                {ps.psName}
              </option>
            ))}
          </select>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <button 
            type="button" 
            onClick={
              () => {
                if(confirm(`Are you sure delete?`) === true){
                  removeRow && removeRow(index)
                }
              }
              }  
              className="text-red-600">
                <FaTrash className="size-5" />
              </button>
        </td>
      </tr>
    </>
  )
}
