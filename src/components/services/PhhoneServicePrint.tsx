import React from 'react';

function PhoneServicePrint() {
  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  // Trigger printing on component load
  React.useEffect(() => {
    handlePrint();
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold">Invoice</h1>
        <p className="text-gray-600">Phone Service</p>
      </header>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
        <p className="text-gray-800">Name: John Doe</p>
        <p className="text-gray-800">Address: 123 Elm Street, Springfield</p>
        <p className="text-gray-800">Phone: (555) 123-4567</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Invoice Details</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Item</th>
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Service A</td>
              <td className="border p-2">Monthly Subscription</td>
              <td className="border p-2 text-right">$29.99</td>
            </tr>
            <tr>
              <td className="border p-2">Service B</td>
              <td className="border p-2">Additional Data Plan</td>
              <td className="border p-2 text-right">$15.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="border p-2 font-bold text-right">Total</td>
              <td className="border p-2 text-right font-bold">$44.99</td>
            </tr>
          </tfoot>
        </table>
      </section>
      
      <footer className="text-center mt-6 text-gray-600">
        <p>Thank you for your business!</p>
      </footer>
    </div>
  );
}

export default PhoneServicePrint;
