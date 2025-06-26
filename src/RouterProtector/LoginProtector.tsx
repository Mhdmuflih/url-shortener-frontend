import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, type NavigateFunction } from 'react-router-dom';

const LoginProtector = () => {

    const isLoggedIn = useSelector((state: any) => state.userAuth.isLoggedIn);
    const navigate: NavigateFunction = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = () => {
            console.log("Is LoggedIn route Protector", isLoggedIn);
            if (isLoggedIn) {
                navigate('/');
            }
            setIsLoading(false);
        }
        checkAuthStatus();
    }, [isLoggedIn, navigate]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        !isLoggedIn ? <Outlet /> : null
    )
}

export default LoginProtector;