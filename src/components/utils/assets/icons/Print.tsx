import { FaPrint } from "react-icons/fa"
import IconProps from "./definition";
const Print:React.FC<IconProps> = ({
    color = 'text-green-600',
    size = 'size-4'
}) => {
    return <i><FaPrint className={`${color} ${size}  transition`}/></i>
}
export default Print;