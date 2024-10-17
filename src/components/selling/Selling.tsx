import React, { ChangeEvent, useState } from 'react'
import SearchField from '../utils/assets/atoms/SearchField'
import SelectDateFilter from '../utils/assets/atoms/SelectDateFilter';
import ButtonFilter from '../utils/assets/atoms/ButtonFilter';
import AddBtn from '../utils/assets/atoms/AddBtn';
import { FaFileAlt } from 'react-icons/fa';
import TableHeading from './TableHeading';

export const Selling: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [filterDateFrom, setFilterDateFrom] = useState<string>('');
    const [filterDateTo, setFilterDateTo] = useState<string>('');
    const [filterLoading, setFilterLoading] = useState<boolean>(false);
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const liveSearch: string = event.target.value
        setSearch(liveSearch)
    }
    const handleFilter = async () => {
        setFilterLoading(true);
        try {

        } catch (error) {

        }
    }
    return (
        <main className='overflow-x-auto bg-white shadow-md rounded-lg p-4'>
            <div className='flex items-center justify-between border-b border-gray-200 mb-4'>
                <div className='flex items-center space-x-4 justify-center p-2'>
                    <SearchField search={search} onChange={handleSearchChange} />
                    <SelectDateFilter filterValue={filterDateFrom} onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterDateFrom(e.target.value)} />
                    <span className="text-gray-600">to</span>
                    <SelectDateFilter filterValue={filterDateTo} onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterDateTo(e.target.value)} />
                    <ButtonFilter onClick={handleFilter} buttonDisable={filterLoading} />
                </div>
                <div className="flex items-center space-x-4">
                    <AddBtn target={false} link_to_page="../services/create" title='Add new Invoice' />
                    <button className="flex items-center border px-3 py-1 bg-gray-600 text-white rounded-lg">
                        <FaFileAlt className="mr-1" /> Report
                    </button>
                </div>
            </div>
            <div className=' w-full '>
                <table className="w-full divide-y divide-gray-200" >
                    <TableHeading />
                    <tbody className='bg-white divide-y divide-gray-200'>
                        <tr className='hover:bg-slate-100 transition ease-out duration-300'>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">00001</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5849845</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">date</td>
                        </tr>
                        <tr className='hover:bg-slate-100 transition ease-out duration-300'>
                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-gray-900">00001</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5849845</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">date</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}
