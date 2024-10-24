
const FormErrorMessage = ({message}: {message:string}) => {
    return <p className="p-2 text-center text-red-500 bg-red-100 rounded">{message}</p>
}
export default FormErrorMessage;