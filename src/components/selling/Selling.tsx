import React, { ChangeEvent, useState } from 'react'
import SearchField from '../utils/assets/atoms/SearchField'
import SelectDateFilter from '../utils/assets/atoms/SelectDateFilter';
import ButtonFilter from '../utils/assets/atoms/ButtonFilter';

export const Selling:React.FC = () => {
    const [search,setSearch] = useState<string>('');
    const [filterDateFrom,setFilterDateFrom] = useState<string>('');
    const [filterDateTo,setFilterDateTo] = useState<string>('');
    const [filterLoading,setFilterLoading] = useState<boolean>(false);
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const liveSearch:string= event.target.value 
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
                <SearchField search={search} onChange={handleSearchChange}/>
                <SelectDateFilter filterValue={filterDateFrom} onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterDateFrom(e.target.value)}/>
                <span className="text-gray-600">to</span>
                <SelectDateFilter filterValue={filterDateTo} onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterDateTo(e.target.value)}/>
                <ButtonFilter onClick={handleFilter} buttonDisable={filterLoading}/>
            </div>
        </div>
    </main>
  )
}
