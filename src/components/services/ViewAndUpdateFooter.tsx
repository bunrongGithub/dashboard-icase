import React from 'react'
import { FaRegSave, FaUndoAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
interface ViewAndUpdateFooterProps{
    loading?:boolean
}
const ViewAndUpdateFooter: React.FC<ViewAndUpdateFooterProps> = ({loading}) => {
    return (
        <div className="flex justify-end mt-6 pt-4">
            <NavLink to="../services" className="mx-5 bg-red-600 flex items-center hover:bg-red-700 text-white px-4 py-2 rounded-md">
                <FaUndoAlt /> Back
            </NavLink>
            <button type="submit"
                className={`flex items-center text-white px-4 py-1.5 rounded-lg hover:bg-blue-800 transition ${loading ? "bg-blue-400" : "bg-blue-700 "}`}>
                <FaRegSave />&nbsp; {loading ? "Save..." : "Save"}
            </button>
        </div>
    )
}

export default ViewAndUpdateFooter