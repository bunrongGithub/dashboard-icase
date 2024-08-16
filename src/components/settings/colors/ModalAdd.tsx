import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (input: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = async () => {
    await onSave(inputValue);
    setInputValue("");
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div className="bg-[#12263f] rounded-lg shadow-lg p-4 w-96 sm:w-96 lg:w-1/2 xl:w-1/3"
      >
        <h2 className="text-lg text-white font-semibold mb-4">Add New Color</h2>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter color name"
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
  );
};

export default Modal;
