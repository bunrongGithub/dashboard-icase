import React from 'react'
interface InputFieldProp {
    label: string;
    className?: string;
    type: string;
    value?:string | number;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string
}

const InputField:React.FC<InputFieldProp> = ({
    label,type,placeholder,value,onChange,name,className
}) => {
  return (
    <div className='flex flex-col space-y-4'>
    <div className='flex flex-col'>
        <label className="font-medium text-gray-800">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className={`mt-1 p-2 border border-gray-300 rounded-md ${className}`}
            placeholder={placeholder}
            name={name}
        />
    </div>
</div>
  )
}

export default InputField