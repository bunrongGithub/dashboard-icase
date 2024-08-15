import axios from "axios"

const BASE_URL: any =import.meta.env.VITE_API_URL

export async function getData(endpoint: any){
    const response = await axios.get(`${BASE_URL}/${endpoint}`)
    return response;
}