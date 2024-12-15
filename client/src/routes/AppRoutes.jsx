import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { nav } from "../components/nav";

export const RenderRoutes = () => {
    const user = { name: "mohamed", isAuth: false };
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            {nav.map((r, i) => {
                if(!(user.isAuth && r.isPrivate)) {
                    return <Route key={i} path={r.path} element={r.element} />;
                } else if(user.isAuth && r.isPrivate) {
                    return <Route key={i} path={r.path} element={r.element} />;
                }
            })}
        </Routes>
    )
}