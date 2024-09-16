import { FaPlusCircle } from "react-icons/fa"
import { NavLink } from "react-router-dom"

type Variant = "sm" | "xs" | "md";

type AddButtonProps = {
    target?: boolean;
    variant?: Variant;
    title?: string;
    link_to_page?:string;
};

const buttonSize: Record<Variant, string> = {
    sm: "size-4",
    xs: "size-3",
    md: "size-6",
};

const AddBtn: React.FC<AddButtonProps> = ({ target = true, variant = "sm" ,title = "Add New",link_to_page}) => {
    const iconSizeClass = buttonSize[variant];

    return (
        <>
            {target ? (
                <NavLink
                    to={`${link_to_page}`}
                    className="flex items-center border px-3 py-1 bg-blue-700 text-white rounded-lg"
                >
                    <FaPlusCircle className={`mr-1 ${iconSizeClass}`} /> {title}
                </NavLink>
            ) : (
                <button
                    className="flex items-center border px-3 py-1 bg-blue-700 text-white rounded-lg"
                >
                    <FaPlusCircle className={`mr-1 ${iconSizeClass}`} /> {title}
                </button>
            )}
        </>
    );
};

export default AddBtn;
