import React from 'react'
import SelectDateFilterProps from './types/SelectDateFilter'

const SelectDateFilter: React.FC<SelectDateFilterProps> = ({ filterValue, onChange }) => {
    return (
        <input
            type="date"
            value={filterValue}
            onChange={onChange}
            className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
        />
    )
}

export default SelectDateFilter