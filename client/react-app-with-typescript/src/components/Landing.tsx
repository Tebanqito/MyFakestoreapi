import { useSelector } from 'react-redux';
import RegisterUser from './RegisterUser';
import LoginUser from './LoginUser';
import { RootState } from '../store';
import Home from './Home';
import { useState } from 'react';

const Landing: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [isRegister, setIsRegister] = useState<boolean>(false);

    return (
        <div className="App">
            {isAuthenticated ? <Home user={user} /> :
                <div>
                    <h1>Bienvenido a MyFakeapistore</h1>
                    <button onClick={() => setIsRegister(!isRegister)}>
                        {!isRegister ? "Iniciar Sesion" : "Registrarse"}
                    </button>
                    {!isRegister ? <RegisterUser /> : <LoginUser /> }
                </div>
            }
        </div>
    );
}

export default Landing;