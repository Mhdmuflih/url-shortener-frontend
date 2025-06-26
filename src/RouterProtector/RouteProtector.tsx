import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const RouteProtector = () => {

    const isLoggedIn = useSelector((state: any) => state.userAuth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return (
        isLoggedIn ? <Outlet /> : null
    )
}

export default RouteProtector;