import axios from 'axios';
import React, { useState } from 'react'
import { FaExclamation } from 'react-icons/fa';
import { utils } from './index';
import Loading from './Loading';
interface ModalDeleteProps {
  isShowBox: boolean;
  onClose: () => void;
  selectedId: number | undefined;
  apiURL: string | any;
  onDelete: (id: number | undefined) => void;
}


const ModalDelete: React.FC<ModalDeleteProps> = (
  {
    isShowBox, selectedId, onClose,
    apiURL, onDelete
  }
) => {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  async function handleDelete(uri: string): Promise<void> {
    setLoading(true);
    try {
      const response = await axios.delete(`${uri}`);
      if (response.status === 204) {
        onDelete(selectedId)
        setErrorMsg("has been delete success!");
        onClose();
        setLoading(false)
      }
    } catch (error: any) {
      setLoading(false)
      const statusCode = error.response.status as number;
      const errMessage = error?.response?.data?.message as string;
      if (statusCode === 403 || statusCode === 500 || statusCode === 409) {
        setErrorMsg(errMessage);
      }
    }
  }
  return (
    <article className={`fixed inset-0 z-50 flex items-center justify-center transition-transform ${isShowBox ? "translate-y-0" : "translate-y-full"} bg-black bg-opacity-50`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex items-center">
          <FaExclamation className="text-red-600 text-2xl mr-3" />
          <div>
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="text-sm font-normal">{errorMsg === '' ? "Are you sure you want to delete this item? This action cannot be undone." : <span className='text-red-600 tracking-wider text-[15px]'>{errorMsg}</span>}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={() => handleDelete(apiURL)}
            className={` ${loading ? 'bg-red-400' : 'bg-red-600'}  text-white px-4 py-2 rounded-lg flex items-center`}
            disabled={loading}
          >
          {loading ? <Loading/> :<utils.Trash color='text-white'/>}  Delete
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
  )
}
export default ModalDelete;