import React from 'react'
import SearchFieldProps from './types/SearchField'
const SearchField:React.FC<SearchFieldProps> = ({search,onChange}) => {
  return (
    <input type='search' value={search} onChange={onChange} placeholder='search ...' className='bg-gray-100 border rounded-md px-3 py-1.5 text-sm'/>
  )
}

export default SearchField