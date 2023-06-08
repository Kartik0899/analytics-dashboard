import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from './features/auth/authSlice';

const SignIn = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    const handleSignIn = (e) => {
        e.preventDefault();

        const signInPayload = {
            email,
            password,
            rememberMe,
        };

        dispatch(signIn(signInPayload));
    };

    // const dispatch = useDispatch();
    // const [credentials, setCredentials] = useState({ username: '', password: '' });

    // const handleInputChange = (e) => {
    //     setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(signIn(credentials));
    //     setCredentials({ username: '', password: '' });
    // };

    return (
        <div>
            <h2>Sign In  email: 'candidate@sigmoid.com',
             password: 'Sigmoid#123',</h2>
            <form onSubmit={handleSignIn}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Remember Me:</label>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
