import React, { useEffect, useState } from 'react';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const [navState, setNavState] = useState(false);

    const onNavScroll = () => {
        if (window.scrollY > 30) {
            setNavState(true);
        } else {
            setNavState(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onNavScroll);
        return () => window.removeEventListener('scroll', onNavScroll);
    }, []);

    return (
        <>
            <header
                className={
                    !navState
                        ? 'absolute top-7 left-0 right-0 z-[200]'
                        : 'fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center z-[200] bg-white'
                }
            >
                <nav className='flex items-center justify-between container'>
                    <div className='flex items-center text-xl text-[#2596DD] font-bold'>
                        AI<span className='text-[#1DD4CB]'>-PPA</span>
                    </div>
                    <ul className='flex items-center justify-center gap-4'>
                        <li className='grid items-center'>
                            <p
                                className={
                                    navState
                                        ? 'text-slate-900 transition-all duration-300 cursor-pointer hover:text-[#1DD4CB]'
                                        : 'text-slate-100 pointer-events-auto cursor-pointer transition-all duration-100 hover:text-[#1DD4CB]'
                                }
                            >
                                Home
                            </p>
                        </li>
                        <li className='grid items-center'>
                            <p
                                className={
                                    navState
                                        ? 'text-slate-900 transition-all duration-300 cursor-pointer hover:text-[#1DD4CB]'
                                        : 'text-slate-100 pointer-events-auto cursor-pointer transition-all duration-100 hover:text-[#1DD4CB]'
                                }
                            >
                                About
                            </p>
                        </li>
                        <li className='grid items-center'>
                            <p
                                className={
                                    navState
                                        ? 'text-slate-900 transition-all duration-300 cursor-pointer hover:text-[#1DD4CB]'
                                        : 'text-slate-100 pointer-events-auto cursor-pointer transition-all duration-100 hover:text-[#1DD4CB]'
                                }
                            >
                                Log in
                            </p>
                        </li>
                        <li className='grid items-center'>
                            <button className='px-2 py-0.5 text-slate-100 bg-[#007bff] rounded hover:bg-[#3ab4ff]'>
                                sign up
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
