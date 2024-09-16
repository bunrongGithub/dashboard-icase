import React from 'react'
import { utils } from '../utils'
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
                    <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${psName === 'paid'
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
                    <NavLink to={`../services/update/${repId}`}><utils.EditeIcon size='size-5' /></NavLink>
                    <NavLink to={`../services/view/${repId}`}><utils.Eye size='size-5' /></NavLink>
                    
                    <button className="text-red-700"><utils.Trash/></button>
                    <NavLink  to={`../services/print/${repId}`}><utils.Print/></NavLink>
                </td>
            </tr>
        </>

    )
}

export default PhoneServiceItems