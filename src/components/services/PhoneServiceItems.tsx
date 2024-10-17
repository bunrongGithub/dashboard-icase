import React from 'react'
import { utils } from '../utils'
import { NavLink } from 'react-router-dom'
import { PhoneServicesProps } from './definition'
import { FaCog } from 'react-icons/fa'
const PhoneServiceItems: React.FC<PhoneServicesProps> = ({ phoneNumber
    , accept_date, description,
    repId,
    duration,
    warrantyperoid,
    psName,
    deviceNumbers,
    amount, created_at, updated_at }) => {
    const date_formart = created_at?.split("-");
    const accept_dateFormat = accept_date?.split("-");
    const updateDateFormat = updated_at?.split("-");
    let acc_date = ''; let acc_mm = ''; let acc_yy = '';
    let upp_date = ''; let upp_mm = ''; let upp_yy = '';
    let date; let mm; let yy;
    if (updateDateFormat !== undefined) {
        upp_yy = updateDateFormat[0];
        upp_mm = updateDateFormat[1];
        upp_date = updateDateFormat[2];
    }
    if (date_formart !== undefined) {
        yy = date_formart[0];
        mm = date_formart[1];
        date = date_formart[2];
    } else {
        date = ''
        mm = ''
        yy = ''
    }
    if (accept_dateFormat !== undefined) {
        acc_date = accept_dateFormat[2];
        acc_mm = accept_dateFormat[1];
        acc_yy = accept_dateFormat[0];
    }
    return (
        <>
            <tr className='hover:bg-slate-100'>
                <td className="px-6 py-4 whitespace-nowrap flex items-center text-sm font-medium text-gray-900"> <FaCog style={{ animation: 'spin 2s linear infinite' }} className='animate-spin mr-2 duration-1000 text-gray-400 text-[20px] ' /> 00{repId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{acc_date && acc_mm && acc_yy ? acc_date + '-' + acc_mm + '-' + acc_yy : ''}</td>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{amount}$</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {date && mm && yy ? date + '-' + mm + '-' + yy : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{upp_date && upp_mm && upp_yy ? upp_date + '-' + upp_mm + '-' + upp_yy : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center space-x-2">
                    <NavLink to={`../services/update/${repId}`}><utils.EditeIcon size='size-5' /></NavLink>
                    <NavLink to={`../services/view/${repId}`}><utils.Eye size='size-5' /></NavLink>

                    <button className="text-red-700"><utils.Trash /></button>
                    <NavLink to={`../services/print/${repId}`}><utils.Print /></NavLink>
                </td>
            </tr>
        </>

    )
}

export default PhoneServiceItems