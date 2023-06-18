import React from 'react'
import { signOutSuccess } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';


const Navbar = () => {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signOutSuccess());
    };
    return (
        <>

           <nav className="bg-gray-900">
                <div className="px-6 flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center">
                        <span className="text-2xl font-semibold whitespace-nowrap text-white">Sigmoid</span>
                    </div>
                    <div className="flex">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3"
                            onClick={handleSignOut}
                        >Sign Out</button>
                    </div>
                   
                </div>
            </nav>

        </>
    )
}

export default Navbar
