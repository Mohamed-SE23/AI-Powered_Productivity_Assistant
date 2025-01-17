import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItems = ({ r, navState }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            {r.isPrivate ? (
                <NavLink
                    to={`/${user.userId}${r.Path}`}
                    className={({ isActive }) =>
                        isActive
                            ? 'text-[#1DD4CB] transition duration-300 ease-in-out'
                            : 'hover:text-[#1DD4CB] transition duration-300 ease-in-out'
                    }
                >
                    {r.name}
                </NavLink>
            ) : (
                <NavLink
                    to={`${r.path}`}
                    className={({ isActive }) =>
                        `${isActive ? 'transition duration-300 ease-in-out' : 'hover:text-[#1DD4CB] transition duration-300 ease-in-out'} ${
                            !navState ? 'text-white' : isActive ? 'text-[#1DD4CB]' : ''
                        }`
                    }
                >
                    {r.name}
                </NavLink>
            )}
        </>
    );
};

export default MenuItems;
