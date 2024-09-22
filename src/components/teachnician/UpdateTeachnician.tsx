import { NavLink, useNavigate, useParams } from "react-router-dom"
import InputField from "../utils/InputField"
import { FaRegSave, FaUndoAlt } from "react-icons/fa"
import Loading from "../utils/Loading"
import { FormEvent, useEffect, useState } from "react"
import UserRoleType from "../settings/user_roles/types/user-role"
import axios from "axios"
import TeachnicianProps from "./types/definition"

const UpdateTeachnician: React.FC = () => {
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [teachnician,setTeachnician] = useState<TeachnicianProps>();
    const [loading, setLoading] = useState<boolean>(false);
    const [messageSuccess, setMessageSuccess] = useState<string>('');
    const [userRole, setUserRole] = useState<UserRoleType[]>([]);
    const nagvigate = useNavigate();
    const id = useParams();
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user-role`);
                setUserRole(response.data);
            } catch (error: any) {
                const status = error?.response.status;
                if (status === 500) {
                    nagvigate("../../_500");
                } else {
                    throw error;
                }
            } finally {
                setLoading(false);
            }
        };
        const fetchTeachnicainById = async (id: Object) => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/teachnician/${id}`);
                if(response.status === 200){
                    console.log(response.data);
                    //setTeachnician(response.data);
                }
            } catch (error: any) {
                if(error.code === 'ERR_NETWORK'){
                    nagvigate("../_500");
                }else {
                    throw error;
                }
            }
        };
        fetchTeachnicainById(id);
        fetchStatus();
    }, [nagvigate,id]);
    const handleChange = () => {
    }
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {

        } catch (error) {

        }
    }
    return (
        <section className='overflow-x-auto bg-white shadow-md rounded-lg p-4'>
            <main className='flex items-center justify-center'>
                <div className='bg-white rounded-lg w-full'>
                    <form onSubmit={handleSubmit}>
                        <span className='text-red-700 leading-3 tracking-wider'>
                            {responseMessage && responseMessage}
                        </span>
                        {messageSuccess && <span className='text-blue-700'>{messageSuccess}</span>}
                        <section className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 rounded-lg'>
                            <InputField label="Technician Name:" name='techName' type="text" placeholder="Enter name" />
                            <InputField label="Skill:" type="text" name='skills' />
                            <InputField label="Responsibility:" name='responsible' type="text" />
                            <InputField label="Salary:" name='salary' type="number" />
                            <InputField label="Contact:" name='contact' type="text" placeholder='097...' />
                            <div className='flex flex-col space-y-4'>
                                <div className='flex flex-col'>
                                    <label className="font-medium text-gray-800">Permission</label>
                                    <select
                                        name=''
                                     
                                        className={`mt-1.5 p-[9px] border border-gray-300 rounded-md`}
                                    >
                                        <option value="">
                                            ---Select one---
                                        </option>
                                        {userRole.map((role, index) => (
                                            <option key={index} value={role.roleId}>
                                                {role.roleName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </section>
                        <div className='flex justify-end items-center pr-4'>
                            <NavLink to="../teachnician" className="bg-red-600 flex items-center hover:bg-red-700 text-white px-3 py-1 rounded-md m-5">
                                <FaUndoAlt /> Back
                            </NavLink>
                            <button
                                type="submit"
                                className="bg-blue-700 flex items-center hover:bg-blue-800 text-white px-3 py-1 rounded-md"
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? <Loading /> : <FaRegSave />}
                                &nbsp;Save
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </section>
    )
}

export default UpdateTeachnician