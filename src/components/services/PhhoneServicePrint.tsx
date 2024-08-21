import React from 'react';
import { PhoneServicesProps } from './definition';

// ForwardRef is used to pass refs to functional components
const PhoneServicePrint = React.forwardRef<HTMLDivElement, PhoneServicesProps>((props, ref) => {
  const { phoneNumber, accept_date, duration, warrantyperoid, psName, statusFixing, deviceNumbers, amount, created_at, updated_at } = props;

  return (
    <div ref={ref}>
      <h1>Phone Service Details</h1>
      <p>Phone Number: {phoneNumber}</p>
      <p>Accept Date: {accept_date}</p>
      <p>Duration: {duration}</p>
      <p>Warranty Period: {warrantyperoid}</p>
      <p>Status: {psName}</p>
      <p>Status Fixing: {statusFixing}</p>
      <p>Device Numbers: {deviceNumbers}</p>
      <p>Amount: {amount}</p>
      <p>Created At: {created_at}</p>
      <p>Updated At: {updated_at}</p>
    </div>
  );
});

export default PhoneServicePrint;
