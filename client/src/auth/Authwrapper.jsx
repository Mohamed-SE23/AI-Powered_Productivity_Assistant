import React, { useState, useEffect} from 'react';
import { RenderRoutes } from '../routes/AppRoutes';
import RenderMenu from '../components/RenderMenu';
import { useLocation } from 'react-router-dom';

export const AuthWrapper = () => {
    const [ showNav, setShowNav ] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/reset-password') {
            setShowNav(false);
        } else {
            setShowNav(true);
        }

    }, [location]);

    return (
        <>
            {showNav && <RenderMenu />}
            <RenderRoutes />
        </>
    )
}