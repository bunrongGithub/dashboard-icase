import React from 'react'
import Loading from '../../Loading'
import { FaFilter } from 'react-icons/fa'
import ButtonFilterProps from './types/ButtonFilter'

const ButtonFilter:React.FC<ButtonFilterProps> = ({onClick,buttonDisable,title = 'Filter'}) => {
  return (
    <button
    onClick={onClick}
    disabled={buttonDisable}
    className={` ${buttonDisable ? 'bg-blue-500':'bg-blue-700'}  flex items-center text-white px-3 py-1.5 rounded-lg`}
>
   { buttonDisable ? (<><Loading/>&nbsp;</> ) : <FaFilter className="mr-1" />} {title}
</button>
  )
}

export default ButtonFilter