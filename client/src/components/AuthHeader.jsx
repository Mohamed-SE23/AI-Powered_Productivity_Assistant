import {  useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../app/UserInfo';
import { MdDashboard } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { selectNotifications} from '../app/Notifications';
import { profile_url } from "../utils/utilities"
// import founder from '../assets/founder.jpg';

const AuthHeader = ({closeMenu}) => {
    const user = useSelector(selectCurrentUser);
    const notifications = useSelector(selectNotifications).length;
    const profile_pic = profile_url(user?.profile_pic);


  return (
    <div className='flex items-center justify-center gap-4 sm:flex-col sm:items-start'>
        <NavLink
            to={`/${user?.id}/dashboard`}
            onClick={closeMenu}
            className={({ isActive }) =>
                isActive
                    ? 'text-[#1DD4CB] transition duration-300 ease-in-out'
                    : 'hover:text-[#1DD4CB] transition duration-300 ease-in-out'
            }
        >
            <div className='flex items-center justify-center gap-1'>
                <MdDashboard /><span>Dashboard</span>
            </div>
        </NavLink>
        <NavLink
            to={`/${user.id}/notifications`}
            onClick={closeMenu}
            className={({ isActive }) =>
                isActive
                    ? 'text-[#1DD4CB] transition duration-300 ease-in-out'
                    : 'hover:text-[#1DD4CB] transition duration-300 ease-in-out'
            }
        >
            <div className='relative flex items-center justify-center'>
            <IoIosNotificationsOutline className='w-6 h-6' />
            <span className={notifications === 0 ? 'hidden' : 'absolute -top-1.5 text-slate-100 bg-red-600 text-[10px] w-4 h-4 flex items-center justify-center rounded-full md:left-1'}>
                {notifications > 9 ? '+9': notifications}</span>
                <span className='hidden sm:block'>Notifications</span>
            </div>
        </NavLink>
        <NavLink
            to={`/${user.id}/profile`}
            onClick={closeMenu}
            className={({ isActive }) =>
                isActive
                    ? 'text-[#1DD4CB] flex items-center gap-2 transition duration-300 ease-in-out'
                    : 'hover:text-[#1DD4CB] transition flex items-center gap-2 duration-300 ease-in-out'
            }
        >
            <img src={profile_pic} alt='profile_pic' className='h-8 w-8 rounded-full object-cover'/>
            <span className='hidden sm:block'>Profile</span>
        </NavLink>
    </div>
  )
}

export default AuthHeader;
