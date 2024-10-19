import React from 'react';
import BoxReportType from './types/box-reports.type';

const BoxReport: React.FC<BoxReportType> = ({
  tittle, totleItem, percentes, svg
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 w-[350px]">
      <div className="flex items-center">
        <div className="bg-blue-100 p-2 rounded-full">
          {svg}
        </div>
        <div className="ml-auto bg-teal-100 text-green-800 text-sm rounded-full px-2 py-1">
          {percentes} &#8593;
        </div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold">{totleItem}</div>
        <div className="text-gray-500">{tittle}</div>
      </div>
    </div>
  );
};

export default BoxReport;

//etkimhong
