import React from "react"
interface AlertBoxProps {
    message?:string;
    setMessage?:() =>void;
}
const AlertBox: React.FC<AlertBoxProps> = ({message,setMessage}) => {
    return (
        <div className="fixed top-4 right-4 md:right-8 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-xs w-full z-50 flex items-center space-x-4">
            <svg
                className="h-6 w-6 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 00-8 8v2a8 8 0 0016 0V10a8 8 0 00-8-8zm-1 11a1 1 0 112 0 1 1 0 01-2 0zm1-4a1 1 0 00-.867.5L9 10.382V11a1 1 0 002 0v-1.382l-.133-.382A1 1 0 0010 9z"
                    clipRule="evenodd"
                />
            </svg>
            <div className="flex-1">
                <p className="font-medium">{message}</p>
            </div>
            <button
                type="button"
                className="text-white hover:text-gray-300"
                onClick={setMessage}
            >
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M6.293 9.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 01-1.414 1.414L10 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    )
}

export default AlertBox