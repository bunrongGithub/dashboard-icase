import { FaEye } from "react-icons/fa"
import IconProps from "./definition"

const Eye:React.FC<IconProps> = ({
    color = 'text-sky-600',
    size = 'size-4',
}) => {
    return (<i><FaEye className={`${color} ${size}`}/></i>)
}
export default Eye