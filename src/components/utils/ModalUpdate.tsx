import { useState } from "react";

interface ModalUpdateProps{
    onClose?: () => void;
    selectedId?: number | undefined;
    isShowBox?:boolean;
    apiURL?: string;
    onUpdate?: (id: number | undefined) => void;
    modalHeading?: string
    modalTitle?: string;
}
const ModalUpdate:React.FC<ModalUpdateProps> = ({
    onClose,selectedId,isShowBox,apiURL,onUpdate,modalHeading,modalTitle
}) => {
    const [value,setValue] = useState<string>('');
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    }
    const handleSave = async () => {}
    return <>
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
        <div className="bg-[#12263f] rounded-lg shadow-lg p-4 w-96 sm:w-96 lg:w-1/2 xl:w-1/3"
        >
            <h2 className="text-lg text-white font-semibold mb-4">{modalHeading}</h2>
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                placeholder={modalTitle}
                className="w-full mb-3 px-4 py-2 bg-[#12263f] border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker text-white"
            />
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
                >
                    Save
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>

</>
}
export default ModalUpdate;