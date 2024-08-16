import { useEffect, useState } from "react";
import { FaCog, FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import axios from "axios";
import { LoadingSkeleton } from "../../skeleton/TableLoading";
import { Modal } from "./ModalAdd";
import { ModalDelete } from "./ModalDelete";
import { ModalEdite } from "./ModalEdite";
interface ColorsProps {
  colorId?: number | string | any;
  colorName?: string;
}
const Colors: React.FC = () => {
  const [data, setData] = useState<ColorsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<true | false >(false);
  const [selectedColorId, setSelectedColorId] = useState<number | string | undefined>(undefined);
  const [isShowModalEdite,setIsShowModalEdite] = useState<true | false>(false)
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/colors`);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchColors();
  }, []);

  const handleModalToggle = () => {
    setShowModal(prev => !prev);
  };
  const handleSave = async (valueColor: string) => {
    if (valueColor.trim() !== '') {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/colors`, {
          colorName: valueColor
        });

        if (response.status === 200) {
          const newColor = response.data.color;
          console.log(newColor);

          setData(prev => [...prev, newColor]);
        }
      } catch (err) {
        console.error('Error saving color:', err);
      }
    } else {
      console.warn('Color name cannot be empty');
    }
  };
  const handleDelete = (colorId: number | string | undefined) => {
    if (colorId) {
      setData(prev => prev.filter(color => color.colorId !== colorId));
      setSelectedColorId(undefined);
    }
  };
  return (
    <section className="overflow-x-auto bg-white shadow-md rounded-lg">
      {showModal && (
        <Modal isOpen={showModal}
          onClose={handleModalToggle}
          onSave={handleSave} />
      )}
      <div className="w-full p-2 flex items-center justify-end">
        <button onClick={handleModalToggle} className="flex items-center border px-3 py-1 bg-blue-700 text-white rounded-lg">
          <FaPlusCircle /> Add New
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#12263f] text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">No</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Color Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider flex items-center">
              <FaCog />&nbsp; Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <LoadingSkeleton number={10} />
          ) : (
            data.map((color, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{color.colorName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                <button onClick={() => {
                    setSelectedColorId(color.colorId);
                    setShowDeleteModal(true);
                  }}>
                    <FaTrash className="text-red-700 size-4" />
                  </button> &nbsp;&nbsp;
                  <button onClick={() => {
                    setSelectedColorId(color.colorId)
                    setIsShowModalEdite(!isShowModalEdite)
                  }} className="flex items-center"><FaEdit className="text-blue-600 size-4" /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showDeleteModal && (
        <ModalDelete
          isShowBox={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          colorId={selectedColorId}
          onDelete={handleDelete}
        />
      )}
      {
        isShowModalEdite && (
          <ModalEdite 
            selectedaId={selectedColorId}
            onClose={() => setIsShowModalEdite(false)}
          />
        )
      }
    </section>
  );
};
export default Colors;

