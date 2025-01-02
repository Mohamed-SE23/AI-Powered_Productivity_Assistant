import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../app/UserInfo'
import { MdDashboard } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { selectNotifications} from '../app/Notifications';
// import founder from '../assets/founder.jpg';

const AuthHeader = () => {
    const user = useSelector(selectCurrentUser);
    const notifications = useSelector(selectNotifications).length;

  return (
    <div className='flex items-center justify-center gap-4'>
        <NavLink
            to={`/${user.id}/dashboard`}
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
            className={({ isActive }) =>
                isActive
                    ? 'text-[#1DD4CB] transition duration-300 ease-in-out'
                    : 'hover:text-[#1DD4CB] transition duration-300 ease-in-out'
            }
        >
            <div className='relative flex items-center justify-center'>
            <IoIosNotificationsOutline className='w-6 h-6' /><span className='absolute -top-1.5 text-slate-100 bg-red-600 text-[10px] w-4 h-4 flex items-center justify-center rounded-full'>{notifications > 9 ? '+9': notifications}</span>
            </div>
        </NavLink>
        <NavLink
            to={`/${user.id}/profile`}
            className={({ isActive }) =>
                isActive
                    ? 'text-[#1DD4CB] transition duration-300 ease-in-out'
                    : 'hover:text-[#1DD4CB] transition duration-300 ease-in-out'
            }
        >
            <img src={user.profile_pic} alt='profile-img' className='h-8 w-8 rounded-full object-cover'/>
        </NavLink>
    </div>
  )
}

export default AuthHeader;
