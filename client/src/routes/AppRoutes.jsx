import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { nav } from "../components/nav";

export const RenderRoutes = () => {
    const user = { name: "mohamed", isAuth: true }; // Example user object
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
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
