import Google from "./components/utils/assets/icons/Google";
const LoginWithGoogle = () => {
    async function handleLoginWithGoogle(): Promise<void> {
        window.alert("Action with Google!")
    }
    return <>
        <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="flex items-center justify-center w-full px-4 py-3 font-medium text-white transition duration-200 ease-in-out bg-[#1a4f85] hover:bg-[#3a7cb9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
        >
            <Google color='text-white' />&nbsp;  Login with Google
        </button>
    </>
}
export default LoginWithGoogle;