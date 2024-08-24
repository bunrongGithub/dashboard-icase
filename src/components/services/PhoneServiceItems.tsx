import React from 'react'
import { FaEdit, FaEye, FaPrint, FaTrash } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { PhoneServicesProps } from './definition'
const PhoneServiceItems: React.FC<PhoneServicesProps> = ({ phoneNumber
    , accept_date,description,
    repId,
    duration,
    warrantyperoid,
    psName,
    deviceNumbers,
    amount, created_at, updated_at }) => {
    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{accept_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{warrantyperoid}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${psName === 'done'
                        ? 'bg-green-100 text-green-800'
                        : psName?.toLowerCase() === 'pending'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                        {psName}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{deviceNumbers}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{created_at}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{updated_at}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center space-x-2">
                    <NavLink to={`../services/update/${repId}`} className="text-blue-600"><FaEdit /></NavLink>
                    <NavLink to={`../services/view/${repId}`} className="text-blue-600"><FaEye /></NavLink>
                    
                    <button className="text-red-700"><FaTrash /></button>
                    <NavLink  to={`../services/print/${repId}`} className="text-green-600"><FaPrint /></NavLink>
                </td>
            </tr>
        </>

    )
}

export default PhoneServiceItems