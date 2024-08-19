export const TablePhoneItemHead: React.FC = () => {
    const tableHead = [
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Model" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Phone Color" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Password" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Problem" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Responsible" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Price" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Status Fiexed" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Status Paid" },
        { cssClass: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", name: "Action" },
    ]
    return <>
        <thead className="bg-[#12263f] text-slate-100">
            <tr>
                {tableHead.map((th, index) => (
                    <th key={index} className={th.cssClass}>
                        {th.name}
                    </th>
                ))}
            </tr>
        </thead>
    </>
}
