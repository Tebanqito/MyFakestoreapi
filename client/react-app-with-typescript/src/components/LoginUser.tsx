import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/AuthActions';
import { AppDispatch } from '../store';
import { selectUsers } from '../store/UserSlice';

const LoginUser: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [userName, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const user = useSelector(selectUsers).user;

    const handleLogin = () => {
        dispatch(loginUser({ userName, password }));
    };

    return (
        <div>
            {!user && <div>
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
            </div>}
        </div>
    );
};

export default LoginUser;