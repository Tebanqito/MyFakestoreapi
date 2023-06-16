import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/AuthSlice';
import { AppDispatch } from '../store';

const LoginUser: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [userName, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        dispatch(loginUser({ userName, password }));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginUser;