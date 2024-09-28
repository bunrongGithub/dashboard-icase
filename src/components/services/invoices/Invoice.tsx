import { PhoneServicesItemProps, ViewPhoneServiceProps } from "../definition";

const Invoice:React.FC<ViewPhoneServiceProps | PhoneServicesItemProps[]> = (

) => {
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
          <h2 className="text-lg font-medium">Invoice: #01234</h2>
          <p className="text-sm text-gray-600">Date: 2nd May, 2026</p>
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
              <th className="border py-2 px-4">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border py-2 px-4">15 Pro Max</td>
              <td className="border py-2 px-4">Black</td>
              <td className="border py-2 px-4">Check</td>
              <td className="border py-2 px-4">$40.00</td>
              <td className="border py-2 px-4">Done</td>
              <td className="border py-2 px-4">$40.00</td>
            </tr>
            <tr>
              <td className="border py-2 px-4">Iwatch 42 Mini</td>
              <td className="border py-2 px-4">Grey</td>
              <td className="border py-2 px-4">Check</td>
              <td className="border py-2 px-4">$40.00</td>
              <td className="border py-2 px-4">Progress</td>
              <td className="border py-2 px-4">—</td>
            </tr>
            <tr>
              <td className="border py-2 px-4">Pancell</td>
              <td className="border py-2 px-4">White</td>
              <td className="border py-2 px-4">Check</td>
              <td className="border py-2 px-4">$40.00</td>
              <td className="border py-2 px-4">Waiting</td>
              <td className="border py-2 px-4">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Total Amount Section */}
      <div className="flex justify-end items-center text-lg font-medium mb-8">
        <div className="w-1/3 text-right">
          <p>Total Amount: $40.00</p>
        </div>
      </div>

      {/* Payment Information */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Payment Information Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Payment Information:</h3>
          <p>Cashier: Ricky</p>
          <p>Bank: ABA</p>
          <p>Cash: None</p>
        </div>
        {/* User Information Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Information:</h3>
          <p>Phone Number: 0889162788</p>
          <p>Password: 11112222, 1234...</p>
          <p>Location: borey romchek, street pkaromdul, home 0.10</p>
          <p>Contact: 086662929</p>
        </div>
      </div>

      {/* Note Section */}
      <div className="border-t pt-4 text-gray-600 text-sm">
        <p>Note: The warranty is valid for 30 days.</p>
      </div>
    </div>
  );
};

export default Invoice;
