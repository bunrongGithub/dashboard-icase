import { FaGoogle } from "react-icons/fa";
import IconProps from "./definition";

const Google:React.FC<IconProps> = ({color}) => {
    return <><FaGoogle className={`${color}`}/></>
}
export default Google;