import axios from "axios";
import { useState } from "react";
import { FaExclamation } from "react-icons/fa";

interface ModalDeleteProps {
    isShowBox: boolean;
    onClose: () => void;
    colorId: number | string | undefined;
    onDelete: (id: number | string | undefined) => void;
  }
  
export const ModalDelete: React.FC<ModalDeleteProps> = ({ isShowBox, onClose, colorId, onDelete }) => {
    const [errorMsg,setErrorMsg] = useState<string>("")
    const handleDelete = async () => {
      if (colorId) {
        try {
          const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/colors/${colorId}`);
          if (response.status === 200) {
            onDelete(colorId);
            onClose();
          }
        } catch (err:any) {
            if(err.response.status === 404 || err.response.status === 500){
                setErrorMsg(err?.response?.data?.message)
            }
        }
      }
    };
    return (
      <article className={`fixed inset-0 z-50 flex items-center justify-center transition-transform ${isShowBox ? "translate-y-0" : "translate-y-full"} bg-black bg-opacity-50`}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <div className="flex items-center">
            <FaExclamation className="text-red-600 text-2xl mr-3" />
            <div>
              <h2 className="text-lg font-semibold">Confirm Deletion</h2>
              <p className="text-sm font-normal">{errorMsg === '' ? "Are you sure you want to delete this color? This action cannot be undone.": errorMsg}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </article>
    );
  };