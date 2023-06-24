import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/actions/UserActions';
import { AppDispatch } from '../store';

interface UserUpdateFormProps {
    userId: string;
};

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({ userId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedFields = {
            id: userId,
            attributes: {
                ...(name && { name }),
                ...(age && { age: parseFloat(age) }),
                ...(description && { description }),
                ...(image && { image }),
            },
        };
        
        dispatch(updateUser(updatedFields));
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Age:
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Image:
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </label>
            <button type="submit">Update User</button>
        </form>
    );
};

export default UserUpdateForm;