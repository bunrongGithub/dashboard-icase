import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import Loading from './components/utils/Loading';
import LoginWithGoogle from './LoginWithGoogle';
import FormErrorMessage from './components/utils/FormErrorMessage';
import Logo from './components/utils/assets/images/Logo';
const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState(false);
    const { loginAction } = useAuth();
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setIsLogin(true);
            await loginAction({ username, password });
        } catch (error: any) {
            console.log(error);
            const statusCode = error.response.status;
            const errMessage = error.response.data.message;

            if (error.code === 'ERR_NETWORK') {
                setError('Network Error');
            }
            if (statusCode === 400 || statusCode === 401 || statusCode === 403) {
                setError(errMessage);
            } else if (statusCode === 404) {
                setError(`Status 404: ${errMessage}`);
            } else if (statusCode === 500) {
                setError('Status 500: Internal Server Error');
            }
            setIsLogin(false);
        } finally {
            setIsLogin(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-[#0d1b2a] to-[#12263f]">
            <div className="w-full max-w-sm p-6 space-y-6 bg-[#1e3a5f] rounded-lg shadow-lg">
                <h1 className="flex items-center justify-center text-2xl font-semibold text-center text-white font-mono"><Logo/>&nbsp;ICASE MOBILE</h1>
                {error && <FormErrorMessage message={error}/>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full px-4 py-3 text-white bg-[#12263f] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                        type="text"
                        value={username}
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        className="w-full px-4 py-3 text-white bg-[#12263f] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                        type="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <button
                        //type="submit"
                        className={`
                            flex items-center justify-center w-full px-4 py-3 font-medium text-white transition duration-200 ease-in-out bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md 
                            ${isLogin ? 'cursor-not-allowed' : ''
                            }`}
                        disabled={isLogin}
                    >
                        {isLogin ? (
                            <span className="flex items-center space-x-2">
                                <Loading />
                                <span>Login</span>
                            </span>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
                 <LoginWithGoogle/> 
            </div>
        </main>
    );
};

export default LoginForm;
