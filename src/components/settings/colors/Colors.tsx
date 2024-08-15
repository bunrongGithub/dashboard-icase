import { useEffect, useState } from "react";
import { getData } from "../../../services/api";

interface ColorsProps{
    colorId?:number | string;
    colorName?: string;
}
const Colors:React.FC<ColorsProps> = () => {
    const [data,setData] = useState<ColorsProps[]>([]);
  useEffect(() => {
      try {
        const fetchColors = async () => {
            const response = await getData("api/colors");
            if(response.status!== 200){
            }else{
              setData(response.data);
            }
        }
        fetchColors();
      } catch (error) {
        console.log(error)
      }
  },[])
  return (
    <div>
        {
            data?.map(item => (
                <li key={item.colorId}>{item.colorName}</li>
            ))
        }
    </div>
  )
}

export default Colors