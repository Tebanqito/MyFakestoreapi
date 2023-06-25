import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { User } from '../types/types';
import { logout } from '../store/AuthSlice';

interface HomeProps {
    user: Partial<User> | null;
};

const Home: React.FC<HomeProps> = ({ user }) => {
    const dispatch = useDispatch<AppDispatch>();


    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            <button onClick={handleLogout}>logout</button>
            <button>Atualizar Perfil</button>
            <div>
                <h1>Home</h1>
                <p>Hola {user?.name}</p>
            </div>
        </div>
    );
};

export default Home;