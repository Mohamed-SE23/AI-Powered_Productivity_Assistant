import {  useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../app/UserInfo";
import MenuItems from "./MenuItems";
import { nav } from "./nav";
import { MdDashboard } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { selectNotifications } from "../app/Notifications";
import { profile_url } from "../utils/utilities"


const HamburgerMenu = ({ navState }) => {
  const [checked, setChecked] = useState(false);

  const user = useSelector(selectCurrentUser);
  const notifications = useSelector(selectNotifications).length;
  const profile_pic = profile_url(user?.profile_pic);


  // handleClick event
  const handleClick = () => {
    setChecked(!checked)
  }
  return (
    <label>
      <div className="w-9 h-10 hidden cursor-pointer sm:flex sm:flex-col sm:items-center sm:justify-center">
        <input
          className="hidden peer"
          type="checkbox"
          checked={checked}
          onChange={handleClick}
        />
        <div className={`w-[50%] h-[2px] ${!navState ? 'bg-white' : 'bg-gray-900'} rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]`}></div>
        <div className={`w-[50%] h-[2px] ${!navState ? 'bg-white' : 'bg-gray-900'} rounded-md transition-all duration-300 origin-center peer-checked:hidden`}></div>
        <div className={`w-[50%] h-[2px] ${!navState ? 'bg-white' : 'bg-gray-900'} rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]`}></div>
      </div>
      {user.isAuth ? (
        <ul
          className={`${
            checked
              ? "absolute top-12 right-6 w-40 bg-white hidden sm:flex flex-col gap-4 p-6 shadow-lg rounded-md"
              : "hidden"
          }`}
        >
          <li onClick={handleClick}>
            <Link
              to={`/${user.id}/dashboard`}
              className="hover:text-[#1DD4CB] active:text-[#1DD4CB] transition flex items-center gap-2 duration-300 ease-in-out"
            >
              <div className="flex items-center justify-center gap-1">
                <MdDashboard />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link
              to={`/${user.id}/notifications`}
              className="hover:text-[#1DD4CB] active:text-[#1DD4CB] transition flex items-center gap-2 duration-300 ease-in-out"
            >
              <div className="relative flex items-center justify-center">
                <IoIosNotificationsOutline className="w-6 h-6" />
                <span
                  className={
                    notifications === 0
                      ? "hidden"
                      : "absolute -top-1.5 text-slate-100 bg-red-600 text-[10px] w-4 h-4 flex items-center justify-center rounded-full md:left-1"
                  }
                >
                  {notifications > 9 ? "+9" : notifications}
                </span>
                <span className="hidden md:block">Notifications</span>
              </div>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link
              to={`/${user.id}/profile`}
              className="hover:text-[#1DD4CB] active:text-[#1DD4CB] transition flex items-center gap-2 duration-300 ease-in-out"
            >
              <img
                src={`${profile_pic}`}
                alt="profile-img"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul
          className={`${
            checked
              ? "absolute top-12 right-6 w-40 bg-white hidden sm:flex flex-col gap-4 p-6 shadow-lg rounded-md"
              : "hidden"
          }`}
        >
          {nav.map((item, i) => {
            return (
              <li
                key={i}
                onClick={handleClick}
                className={`text-lg transition-all duration-300 ease-in`}
              >
                {item.isMenu && !item.isPrivate ? <MenuItems r={item} /> : ""}
              </li>
            );
          })}
        </ul>
      )}
    </label>
  );
};

export default HamburgerMenu;
