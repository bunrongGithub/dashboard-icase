import React, { useEffect, useState } from "react";
import { FaEye, FaPhone, FaPhoneSquareAlt } from "react-icons/fa";
import { PhoneServicesItemProps, ViewPhoneServiceProps } from "./definition";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";

export const PhoneServicePrint: React.FC = () => {
  const [itemDetails, setItemDetails] = useState<ViewPhoneServiceProps>();
  const [phoneItems, setPhoneItems] = useState<PhoneServicesItemProps[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // Track if data is loaded
  const { id } = useParams();

  useEffect(() => {
    const getItemsDetailById = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/service/${id}`);
        if (response.status === 200) {
          setItemDetails(response.data);
          setPhoneItems(response.data?.repaireItem || []);
          setIsLoaded(true); // Set data loaded flag to true
        }
      } catch (error) {
        console.error(error);
      }
    };
    getItemsDetailById();
  }, [id]);

  useEffect(() => {
    if (isLoaded) {
      window.print(); // Print only when data is loaded
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>; // Render a loading state or spinner
  }

  return (
    <main className="flex items-center justify-start bg-gray-100">
      <section className="bg-white rounded-lg shadow-lg w-[210mm] h-[297mm] border border-gray-300">
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 p-8 bg-gray-300">
          <h3 className="text-3xl font-semibold text-stone-500">Icase Mobile Service Center</h3>
          <img width={50} src="/logo.png" alt="...." />
        </div>
        <div className=" flex px-4 justify-between">
          <div className="space-y-4">
            <div className="font-medium text-gray-800">
              <strong>Phone Number:</strong> {itemDetails?.repair?.phoneNumber}
            </div>
            <div className="font-medium text-gray-800">
              <strong>Received Date:</strong> {itemDetails?.repair?.accept_date}
            </div>
            <div className="font-medium text-gray-800">
              <strong>Service Duration:</strong> {itemDetails?.repair?.duration}
            </div>
            <div className="font-medium text-gray-800">
              <strong>Warranty Period:</strong> {itemDetails?.repair?.warrantyperoid}
            </div>
            <div className="font-medium text-gray-800 flex">
              <strong className="flex items-center"> <FaLocationDot/> Location:&nbsp;</strong> Lorem ipsum dolor sit amet.
            </div>
            <div className="font-medium text-gray-800 flex">
              <strong className="flex items-center"> <FaPhoneSquareAlt/> Contact: &nbsp;</strong> 099778866 , 066784521
            </div>
          </div>
          <div className="space-y-4">
            <div className="font-medium text-gray-800">
              <strong>Payment Status:</strong>
              <span
                className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                  itemDetails?.repair?.psName === 'done'
                    ? 'bg-green-100 text-green-800'
                    : itemDetails?.repair?.psName?.toLowerCase() === 'pending'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {itemDetails?.repair?.psName}
              </span>
            </div>
            <div className="font-medium text-gray-800">
              <strong>Payment Method:</strong> <span className="text-green-800">{itemDetails?.repair?.payment_method_name}</span>
            </div>
            <div className="font-medium text-gray-800">
              <strong>Service Status:</strong>
              <span
                className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                  itemDetails?.statusFixed === 'done'
                    ? 'bg-green-100 text-green-800'
                    : itemDetails?.statusFixed?.toLowerCase() === 'pending'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {itemDetails?.statusFixed}
              </span>
            </div>
            <div className="font-medium text-gray-800">
              <strong>Total Price:</strong> <span className="text-green-800 font-medium">{itemDetails?.total} $</span>
            </div>
          </div>
        </div>
        
        <div className="">
          <h4 className="text-xl font-semibold text-gray-900 px-4">
            #Items
          </h4>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-300 text-stone-500">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Model</th>
                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Color</th>
                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Password</th>
                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Problem</th>
                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {phoneItems.map((phone, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-sm text-gray-900">{phone.moName}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{phone.colorName}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{phone.password}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{phone.problem}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{phone.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-6 border-t border-gray-200 pt-4">
          <NavLink id="not-print" to="../services" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Back
          </NavLink>
        </div>
      </section>
    </main>
  );
};
