import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import Loading from './components/utils/Loading';
const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState(false);
    const { loginAction } = useAuth();
    const [error, setError] = useState<string>('');
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setIsLogin(true)
            await loginAction({ username, password });
        } catch (error: any) {
            console.log(error)
            const statusCode = error.response.status;
            const errMessage = error.response.data.message;
            if(error.code === "ERR_NETWORK"){
                setError("Network Error")
                setIsLogin(false)
            }
            if (statusCode === 400) {
                setError(errMessage);
            } else if (statusCode === 401) {
                setError(errMessage);
            } else if (statusCode === 404) {
                setError(`Status 404 ${errMessage}`)
            } else if (statusCode === 500) {
                setError("Status 500 Internal Server error!");
            } else if (statusCode === 403) {
                setError(errMessage)
            }
            setIsLogin(false)
        }finally{
            setIsLogin(false);
        }
    };
    return (
        <main className="flex flex-col bg-[#12263f] items-center justify-center min-h-screen p-4 space-y-4 antialiased text-gray-900 dark:bg-dark dark:text-light">
            <div className="w-full bg-[#152e4d] max-w-sm px-4 py-6 space-y-6 rounded-md dark:bg-darker">
                <h1 className="text-xl font-semibold text-center text-white font-mono">ICASE MOBILE</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        className="w-full px-4 py-2 bg-[#12263f] border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker text-white"
                        type="text"
                        value={username}
                        autoComplete='username'
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        className="w-full px-4 py-2 bg-[#12263f] border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker text-white"
                        type="password"
                        value={password}
                        autoComplete='current-password'
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        className={` ${isLogin ? 'bg-blue-500' :'bg-blue-700' }  flex items-center justify-center w-full px-4 py-2 font-medium text-center text-white transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:focus:ring-offset-darker`}
                        disabled={isLogin}
                    >
                        {isLogin ? (
                            <span className="flex items-center space-x-1">
                                <Loading />
                                <span>Login</span>
                            </span>
                        ) : (
                            "Login"
                        )}
                    </button>

                </form>
            </div>
        </main>
    );
};

export default LoginForm;
