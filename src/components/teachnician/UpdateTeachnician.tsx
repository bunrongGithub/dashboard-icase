import { NavLink, useNavigate, useParams } from "react-router-dom"
import InputField from "../utils/InputField"
import { FaRegSave, FaUndoAlt } from "react-icons/fa"
import Loading from "../utils/Loading"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import UserRoleType from "../settings/user_roles/types/user-role"
import axios from "axios"
import TeachnicianProps from "./types/definition"
import TeachiciainRequestUpdate from "./types/request-update"
import AlertBox from "../utils/AlertBox"
const UpdateTeachnician: React.FC = () => {
    const [teachnician, setTeachnician] = useState<TeachiciainRequestUpdate>({
        salary: 0,
        skills: '',
        responsible: '',
        contact: '',
        roleId: 0,
        roleName: '',
        techId: 0,
        techName: ''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [alertBox, setAlertBox] = useState<boolean>(false);
    const [errorBox, setErrorBox] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<UserRoleType[]>([]);
    const [message, setMessage] = useState<string>('')
    const nagvigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        //================================
        // fet data user roles
        //================================
        const userRoles = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user-role`);
                setUserRole(response.data);
            } catch (error: any) {
                const status = error?.response.status;
                if (status === 500) {
                    nagvigate("../_500");
                } else {
                    throw error;
                }
            } finally {
                setLoading(false);
            }
        };
        //================================
        // fet data teachnicain by id
        //================================
        const fetchTeachnicainById = async (id: number) => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/teachnician/${id}`);
                console.log(response.data);

                if (response.status === 200) {
                    setTeachnician(response.data[0]);
                }
            } catch (error: any) {
                if (error.code === 'ERR_NETWORK') {
                    nagvigate("../_500");
                } else {
                    throw error;
                }
            }
        };
        fetchTeachnicainById(Number(id));
        userRoles();
    }, [nagvigate, id]);
    //================================
    // handle change element 
    //================================
    const handleChange = (key: keyof TeachnicianProps) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = event.target;
        setTeachnician(prev => ({ ...prev, [key]: value }));
    }
    //================================
    // handle Submit data to API
    //================================
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/teachnician/${id}`, {
                salary: teachnician.salary,
                skills: teachnician.skills,
                responsible: teachnician.responsible,
                contact: teachnician.contact,
                roleId: teachnician.roleId,
                techId: id,
                techName: teachnician.techName
            });
            if (response.status === 200) {
                console.log(response);

                setMessage(response.data.message);
                setAlertBox(!alertBox)
            }
        } catch (error: any) {
            const errStatus = error.response.status;
            const errMessage = error.response.data.message;
            if (errStatus === 400) {
                setErrorBox(!errorBox);
                setMessage(errMessage)
            }
            throw error;
        } finally {
            setLoading(false)
        }
    }
    return (
        <section className='overflow-x-auto bg-white shadow-md rounded-lg p-4'>
            <main className='flex items-center justify-center'>
                <div className='bg-white rounded-lg w-full'>
                    <form onSubmit={handleSubmit}>
                        {
                            alertBox && <AlertBox setMessage={() => setMessage('')} message={message} type='success' />
                            || errorBox && <AlertBox setMessage={() => setMessage('')} message={message} type='error' />}
                        <section className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 rounded-lg'>
                            <InputField
                                label="Technician Name:"
                                name='techName'
                                value={teachnician?.techName || ''}
                                onChange={handleChange('techName')}
                                type="text" placeholder="Enter name"
                            />
                            <InputField
                                label="Skill:"
                                type="text"
                                name='skills'
                                value={teachnician?.skills || ''}
                                onChange={handleChange('skills')}
                            />
                            <InputField
                                label="Responsibility:"
                                name='responsible'
                                type="text"
                                value={teachnician?.responsible || ''}
                                onChange={handleChange('responsible')}
                            />
                            <InputField
                                label="Salary:"
                                name='salary'
                                type="number"
                                value={teachnician?.salary || 0}
                                onChange={handleChange('salary')}
                            />
                            <InputField
                                label="Contact:"
                                name='contact'
                                type="text"
                                placeholder='097...'
                                value={teachnician?.contact || ''}
                                onChange={handleChange('contact')}
                            />
                            <div className='flex flex-col space-y-4'>
                                <div className='flex flex-col'>
                                    <label className="font-medium text-gray-800">Permission</label>
                                    <select
                                        name='roleId'
                                        onChange={handleChange('roleId')}
                                        value={teachnician.roleId || 0}
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