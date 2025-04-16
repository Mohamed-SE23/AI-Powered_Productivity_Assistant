import React from 'react';
import { Link } from 'react-router-dom';

const MenuItems = ({ r }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Link
                to={`${r.path}`}
                className={`hover:text-[#1DD4CB] active:text-[#1DD4CB] transition duration-300 ease-in-out`}>
                {r.name}
            </Link>
        </>
    );
};

export default MenuItems;
