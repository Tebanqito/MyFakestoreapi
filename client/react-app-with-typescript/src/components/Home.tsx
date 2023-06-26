import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { User } from '../types/types';
import { logout } from '../store/AuthSlice';
import UserUpdateForm from './UserUpdateForm';

interface HomeProps {
    user: Partial<User> | null;
};

const Home: React.FC<HomeProps> = ({ user }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isUpdateUser, setIsUpdateUser] = useState<boolean>(false);

    const handleLogout = (): void => {
        dispatch(logout());
    };

    return (
        <div>
            <button onClick={() => setIsUpdateUser(!isUpdateUser)}>
                {isUpdateUser ? "Home" : "Actualizar perfil"}
            </button>
            <button onClick={handleLogout}>Logout</button>
            {!isUpdateUser ?
                <div>
                    <h1>Home</h1>
                    <p>Hola {user?.name}</p>
                </div>
                : <UserUpdateForm userId={user?.id as string} />}
        </div>
    );
};

export default Home;