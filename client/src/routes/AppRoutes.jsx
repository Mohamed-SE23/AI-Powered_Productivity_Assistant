import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { nav } from "../components/nav";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../app/UserInfo";

export const RenderRoutes = () => {
    const user = useSelector(selectCurrentUser);
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            {user.isAuth ? (<Route path="/" element={<Navigate to={`/${user.id}/dashboard`} />} />) :
            (<Route path="*" element={ <Navigate to="/" />} />)}
            {nav.map((r, i) => {
                // Allow private routes only if user is authenticated
                if (user.isAuth && r.isPrivate) {
                    return <Route key={i} path={r.path} element={r.element} />;
                }

                // Allow non-private routes if user is not authenticated or any route that is public
                if (!r.isPrivate) {
                    return <Route key={i} path={r.path} element={r.element} />;
                }

                // If the route is private and the user is not authenticated, do nothing
                return null;
            })}
        </Routes>
    );
};
