import axios from "axios";

export const fetchData = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/service`)
        if (response.status === 200) return response.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}
