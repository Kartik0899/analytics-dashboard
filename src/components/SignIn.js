import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, selectError } from './features/auth/authSlice';


const SignIn = () => {

    const dispatch = useDispatch();
    const error = useSelector(selectError);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    const handleSignIn = async (e) => {
        e.preventDefault();

        const signInPayload = {
            email,
            password,
            rememberMe,
        };

        try {
            const response = await dispatch(signIn(signInPayload));
            toast.success('Welcome');
        } catch (error) {
                toast.error('Wrong credentials. Please try again.');
        }
    };
   
    return (
        <div>

             <section className="bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-wide md:text-2xl text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSignIn}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                                        placeholder="name@gmail.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                    <input type="password"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        name="password" id="password" placeholder="••••••••" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="w-4 h-4" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium hover:underline text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#2563eb] hover:bg-[#0b55f4]">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <ToastContainer 
                position="bottom-right"
                autoClose={2000}
            />
        </div>
    );
};

export default SignIn;
