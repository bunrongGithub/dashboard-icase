import { FaTrash } from "react-icons/fa";
import IconProps from "./definition";
const Trash:React.FC<IconProps> = ({
    size = 'size-4',color='text-red-700'
}) => {
    return (
        <i><FaTrash className={`${size} ${color}`}/></i>
    )
}
export default Trash;