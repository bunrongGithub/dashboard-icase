import React from 'react'
type headingType = {
    name: string;
    css: string;
    svg?: React.ReactNode;
}
const TableHeading: React.FC = () => {
    const heads: headingType[] = [
        { name: "Invoice", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
        { name: "Phone Number", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
        { name: "Received Date", css: "px-6 py-3 text-left text-xs font-semibold tracking-wider" },
    ]
    return (
        <thead className="bg-[#12263f] text-white">
            <tr>
                {
                    heads.map((item, index) => (
                        <th key={index} className={item.css}>
                            {item.svg}{item.name}
                        </th>
                    ))
                }
            </tr>
        </thead>
    )
}

export default TableHeading