import { FaEye, FaPlus } from "react-icons/fa"

interface ViewAndUpdateHeaderProps {
    handleAddMoreRow: () => void
}
export const ViewAndUpdateHeader: React.FC<ViewAndUpdateHeaderProps> = ({ handleAddMoreRow }) => {
    return <>
        <header className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
            <h3 className="text-2xl font-semibold text-gray-900">View & Update</h3>
            <button className="text-gray-600 hover:text-gray-900 p-2 rounded-full">
                <FaEye className="text-[#12263f]" size={20} />
            </button>
        </header>
        <div className="flex justify-between items-center mb-2">
            <p></p>
            <button

                className="bg-blue-700 flex items-center text-white px-4 py-1.5 rounded-lg hover:bg-blue-800 transition"
                onClick={handleAddMoreRow}
            >
                <FaPlus />Add More
            </button>
        </div>
    </>
}