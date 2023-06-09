import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/actions/AuthActions';
import { AppDispatch } from '../store';
import { RootState } from '../store';

const RegisterUser: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [email, setEmail] = useState<string>("");

    const handleRegister = (): void => {
        if (!name.length || !email.length || !password.length) return alert("Datos incompletos.");
        dispatch(registerUser({ name, image, age, email, password }))
            .then(() => alert("Usuario registrado correctamente."));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterUser;