import { FaEdit } from "react-icons/fa";
import IconProps from "./definition";

const EditeIcon:React.FC<IconProps> = ({
    color = 'text-blue-600',size ='size-4'
})=>{
    return <i><FaEdit className={`${color} ${size}`}/></i>
}
export default EditeIcon;