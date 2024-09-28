import React, { useEffect, useState } from "react";
// import { FaPhoneSquareAlt } from "react-icons/fa";
import { PhoneServicesItemProps, ViewPhoneServiceProps } from "./definition";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { FaLocationDot } from "react-icons/fa6";
// import Invoice from "./invoices/Invoice";
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
    <div className="max-w-3xl mx-auto bg-white p-10 mt-10 border rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img width={50} src="/logo.png" alt="Company Logo" className="w-16 h-16" />
          <div>
            <h1 className="text-2xl font-semibold">ICASE MOBILE SERVICE CENTER</h1>
          </div>
        </div>
        {/* Date and Invoice Number */}
        <div className="text-right">
          <h2 className="text-lg font-medium">Invoice: #00{itemDetails?.repairId}</h2>
          <p className="text-sm text-gray-600">Date: {itemDetails?.repair?.accept_date}</p>
        </div>
      </div>

      {/* Table Section */}
      <div>
        <table className="w-full text-left border-collapse mb-8">
          <thead className="bg-gray-100">
            <tr>
              <th className="border py-2 px-4">MODEL</th>
              <th className="border py-2 px-4">COLOR</th>
              <th className="border py-2 px-4">PROBLEM</th>
              <th className="border py-2 px-4">PRICE</th>
              <th className="border py-2 px-4">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {
              phoneItems?.map((item, index) => (
                <tr key={index}>
                  <td className="border py-2 px-4">{item?.moName ? item.moName : '--'}</td>
                  <td className="border py-2 px-4">{item?.colorName ? item?.colorName : '--'}</td>
                  <td className="border py-2 px-4">{item?.problem ? item.problem : '--'}</td>
                  <td className="border py-2 px-4">{item?.price ? item.price : '--'}</td>
                  <td className="border py-2 px-4">{item?.statusName ? item?.statusName : '--'}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* Total Amount Section */}
      <div className="flex justify-end items-center text-lg font-medium mb-8">
        <div className="w-1/3 text-right">
          <p>Total Amount: ${itemDetails?.total ? itemDetails?.total : ""}</p>
        </div>
      </div>

      {/* Payment Information */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Payment Information Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Payment Information:</h3>
          <p>Cashier: ###</p>
          <p>Bank: {itemDetails?.repair?.payment_method_name}</p>
          <p>Cash: ###</p>
        </div>
        {/* User Information Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Information:</h3>
          <p>Phone Number: {itemDetails?.repair?.phoneNumber}</p>
          <p>
            Password: {phoneItems?.map((item, index) => (
              <span key={index} className="mr-2">
                {item.password === undefined ? "" : item.password}
              </span>
            ))}
          </p>
          <p>Location: borey romchek, street pkaromdul</p>
          <p>Contact: 086662929</p>
        </div>
      </div>

      {/* Note Section */}
      <div className="border-t pt-4 text-gray-600 text-sm">
        <p>Note: The warranty is valid for {itemDetails?.repair?.warrantyperoid}.</p>
      </div>
    </div>
  );
};
