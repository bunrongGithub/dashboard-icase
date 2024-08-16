import axios from "axios";
import React, { useEffect, useState } from "react";

interface ModalEditeProps {
    onClose?: () => void;
    selectedaId?: number | string | undefined;
}

export const ModalEdite: React.FC<ModalEditeProps> = ({ onClose, selectedaId }) => {
    const [newColor, setNewColor] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (selectedaId !== undefined) {
            const fetchColorById = async (id: string | number) => {
                setLoading(true);
                setError(null);
                setSuccessMessage(null); // Clear success message on new fetch
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/colors/${id}`);
                    if (response.status === 200) {
                        setNewColor(response.data.colorName);
                    }
                } catch (error) {
                    setError("Failed to fetch color.");
                } finally {
                    setLoading(false);
                }
            };

            fetchColorById(selectedaId);
        }
    }, [selectedaId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewColor(e.target.value);
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null); // Clear previous messages

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/colors/${selectedaId}`, {
                colorName: newColor
            });

            if (response.status === 200) {
                setSuccessMessage("Color updated successfully!");
                // Optionally, you could close the modal or perform other actions here
                setTimeout(() => {
                    if (onClose) onClose(); // Close the modal after 2 seconds
                }, 2000);
            }
        } catch (error) {
            setError("Failed to update color.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <article className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
            <section className="bg-[#12263f] rounded-lg shadow-lg p-4 w-96 sm:w-96 lg:w-1/2 xl:w-1/3">
                <h2 className="text-lg text-white font-semibold mb-4">Edit This Color</h2>
                {loading && <p className="text-white mb-4">Loading...</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                
                <form onSubmit={handleSave}>
                    <input
                        type="text"
                        value={newColor}
                        onChange={handleChange}
                        placeholder="Enter new color name"
                        className="w-full mb-3 px-4 py-2 bg-[#12263f] border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker text-white"
                    />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        </article>
    );
};
