import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
import { FaCog, FaEdit, FaPlusCircle, FaTrash, FaPrint, FaFileAlt } from "react-icons/fa";

interface PhoneService {
    id: number;
    phoneNumber: string;
    receivedDate: string;
    serviceDuration: string;
    warrantyPeriod: string;
    paymentStatus: string;
    serviceStatus: string;
    numberOfPhones: number;
    totalPrice: number;
    creationDate: string;
    updateDate: string;
}

const API_URL = 'http://localhost:3000/phoneServices';

export const PhoneServices: React.FC = () => {
    const [services, setServices] = useState<PhoneService[]>([]);
    const [form, setForm] = useState<PhoneService>({
        id: 0,
        phoneNumber: '',
        receivedDate: '',
        serviceDuration: '',
        warrantyPeriod: '',
        paymentStatus: '',
        serviceStatus: '',
        numberOfPhones: 0,
        totalPrice: 0,
        creationDate: '',
        updateDate: ''
    });
    const [editing, setEditing] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get<PhoneService[]>(API_URL);
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleAdd = async () => {
        try {
            await axios.post(API_URL, form);
            fetchServices();
            resetForm();
        } catch (error) {
            console.error('Error adding service:', error);
        }
    };

    const handleEdit = async () => {
        try {
            await axios.put(`${API_URL}/${form.id}`, form);
            fetchServices();
            resetForm();
        } catch (error) {
            console.error('Error editing service:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFilter = async () => {
        try {
            const response = await axios.get<PhoneService[]>(API_URL, {
                params: {
                    receivedDate_gte: startDate,
                    receivedDate_lte: endDate
                }
            });
            setServices(response.data);
        } catch (error) {
            console.error('Error filtering services:', error);
        }
    };

    const resetForm = () => {
        setForm({
            id: 0,
            phoneNumber: '',
            receivedDate: '',
            serviceDuration: '',
            warrantyPeriod: '',
            paymentStatus: '',
            serviceStatus: '',
            numberOfPhones: 0,
            totalPrice: 0,
            creationDate: '',
            updateDate: ''
        });
        setEditing(false);
    };

    const handleEditClick = (service: PhoneService) => {
        setForm(service);
        setEditing(true);
    };

    return (
        <section className="overflow-x-auto bg-white shadow-md rounded-lg">
            <div className="w-full p-4 flex items-center justify-between bg-gray-50 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    />
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    />
                    <span className="text-gray-600">to</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                    />
                    <button 
                        onClick={handleFilter}
                        className="bg-blue-700 text-white px-3 py-1.5 rounded-lg">
                        Filter
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={() => {
                            resetForm();
                            setEditing(false);
                        }}
                        className="flex items-center border px-3 py-1 bg-blue-700 text-white rounded-lg">
                        <FaPlusCircle className="mr-1" /> {editing ? 'Save' : 'Add New'}
                    </button>
                    <button className="flex items-center border px-3 py-1 bg-green-600 text-white rounded-lg">
                        <FaPrint className="mr-1" /> Print
                    </button>
                    <button className="flex items-center border px-3 py-1 bg-gray-600 text-white rounded-lg">
                        <FaFileAlt className="mr-1" /> Report
                    </button>
                </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200 mt-2">
                <thead className="bg-[#12263f] text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider">Phone Number</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider">Received Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Service Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Warranty Period</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Service Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Number of Phones</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Creation Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Update Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            <FaCog className="inline" />
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td className="px-6 py-4 text-sm text-gray-900">{service.phoneNumber}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{service.receivedDate}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{service.serviceDuration}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{service.warrantyPeriod}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{service.paymentStatus}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{service.serviceStatus}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{service.numberOfPhones}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{service.totalPrice}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{service.creationDate}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{service.updateDate}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                <button 
                                    onClick={() => handleEditClick(service)}
                                    className="text-blue-600 hover:text-blue-900">
                                    <FaEdit />
                                </button>
                                <button 
                                    onClick={() => handleDelete(service.id)}
                                    className="text-red-600 hover:text-red-900 ml-2">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editing && (
                <div className="p-4 bg-gray-100 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">{form.id ? 'Edit Service' : 'Add New Service'}</h3>
                    <form>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input 
                                type="text" 
                                name="phoneNumber" 
                                value={form.phoneNumber} 
                                onChange={handleFormChange} 
                                placeholder="Phone Number"
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                            <input 
                                type="date" 
                                name="receivedDate" 
                                value={form.receivedDate} 
                                onChange={handleFormChange} 
                                placeholder="Received Date"
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                            <input 
                                type="text" 
                                name="serviceDuration" 
                                value={form.serviceDuration} 
                                onChange={handleFormChange} 
                                placeholder="Service Duration"
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                            <input 
                                type="text" 
                                name="warrantyPeriod" 
                                value={form.warrantyPeriod} 
                                onChange={handleFormChange} 
                                placeholder="Warranty Period"
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                            <input 
                                type="text" 
                                name="paymentStatus" 
                                value={form.paymentStatus} 
                                onChange={handleFormChange} 
                                placeholder="Payment Status"
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                            <input 
                                type="text" 
                                name="serviceStatus" 
                                value={form.serviceStatus} 
                                onChange={handleFormChange} 
                                placeholder="Service Status"
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                            <input 
                                type="number" 
                                name="numberOfPhones" 
                                value={form.numberOfPhones} 
                                onChange={handleFormChange} 
                                placeholder="Number of Phones"
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                            <input 
                                type="number" 
                                name="totalPrice" 
                                value={form.totalPrice} 
                                onChange={handleFormChange} 
                                placeholder="Total Price"
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                            <input 
                                type="date" 
                                name="creationDate" 
                                value={form.creationDate} 
                                onChange={handleFormChange} 
                                placeholder="Creation Date"
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                            <input 
                                type="date" 
                                name="updateDate" 
                                value={form.updateDate} 
                                onChange={handleFormChange} 
                                placeholder="Update Date"
                                className="border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>
                        <button 
                            type="button" 
                            onClick={editing ? handleEdit : handleAdd} 
                            className="bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            {editing ? 'Save Changes' : 'Add Service'}
                        </button>
                    </form>
                </div>
            )}
        </section>
    );
};
