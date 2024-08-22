import React from 'react'
import { FaPrint, FaRegSave, FaUndoAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
interface ViewAndUpdateFooterProps{
    loading?:boolean
    selectedId?:number|string
}
const ViewAndUpdateFooter: React.FC<ViewAndUpdateFooterProps> = ({loading,selectedId}) => {
    return (
        <div className="flex justify-end mt-6 pt-4">
            <NavLink to="../services" className=" bg-red-600 flex items-center hover:bg-red-700 text-white px-4 py-2 rounded-md">
                <FaUndoAlt /> Back
            </NavLink>
            <NavLink to={`../services/print/${selectedId}`} className="mx-3 bg-green-500 flex items-center hover:bg-green-600 text-white px-4 py-2 rounded-md">
                <FaPrint /> print
            </NavLink>
            <button type="submit"
                className={`flex items-center text-white px-4 py-1.5 rounded-lg hover:bg-blue-800 transition ${loading ? "bg-blue-400" : "bg-blue-700 "}`}>
                <FaRegSave />&nbsp; {loading ? "Save..." : "Save"}
            </button>
        </div>
    )
}

export default ViewAndUpdateFooter