import React, { ChangeEvent, FormEvent, useState } from 'react'
import TeachiciainRequestCreate from './request-create'
import InputField from './InputField'
import { NavLink } from 'react-router-dom';
import { FaRegSave, FaUndoAlt } from 'react-icons/fa';
import axios from 'axios';
const CreateTeachnician: React.FC = () => {
    const [teachnician, setTeachnician] = useState<TeachiciainRequestCreate>({
        techName: '',
        salary: 0,
        skills: '',
        contact: '',
        responsible: '',
        position: ''
    });

    const handleChange = (key: keyof TeachiciainRequestCreate) => (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTeachnician(prev => ({ ...prev, [key]: value }));
    }
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            for(let key in teachnician){
                if(teachnician.hasOwnProperty(key)){
                    const value = teachnician[key as keyof TeachiciainRequestCreate];
                    if(!value)
                        return console.log(`${key} are require!`) 
                }
            }
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/teachnician`);
            if(response.status === 201){
                console.log("Response status 201")
            }
        } catch (error: any) {
            console.log(error)
        }
    }
    return (
        <section className='overflow-x-auto bg-white shadow-md rounded-lg p-4'>
            <main className='flex items-center justify-center'>
                <div className='bg-white rounded-lg w-full'>
                    <form onSubmit={handleSubmit} action="">
                        <section className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 rounded-lg'>
                            <InputField label="Teachnicain Name:" value={teachnician?.techName || ''} onChange={handleChange('techName')} name='techName' type="text" placeholder="Enter name" />
                            <InputField label="Skill:" value={teachnician?.skills || ''} type="text" onChange={handleChange('skills')} name='skills' />
                            <InputField label="Responsibility:" value={teachnician?.responsible || ''} onChange={handleChange('responsible')} name='responsible' type="text" />
                            <InputField label="Position:" value={teachnician?.position || ''} onChange={handleChange('position')} name='position' type="text" />
                            <InputField label="Salary:" value={teachnician?.salary || ''} onChange={handleChange('salary')} name='salary' type="number" placeholder='' />
                            <InputField label="Contact:" value={teachnician?.contact || ''} onChange={handleChange('contact')} name='contact' type="text" placeholder='097...' />
                        </section>
                        <div className='flex justify-end items-center pr-4'>
                            <NavLink to="../services" className=" bg-red-600 flex items-center hover:bg-red-700 text-white px-3 py-1 rounded-md m-5">
                                <FaUndoAlt /> Back
                            </NavLink>
                            <button type="submit"
                                className=" bg-blue-700 flex items-center hover:bg-blue-800 text-white px-3 py-1 rounded-md"
                            >                <FaRegSave />&nbsp;Save
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </section>
    )
}

export default CreateTeachnician