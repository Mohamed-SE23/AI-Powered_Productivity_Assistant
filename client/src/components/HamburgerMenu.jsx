import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../app/UserInfo";
import MenuItems from "./MenuItems";
import AuthHeader from "./AuthHeader";

const HamburgerMenu = ({ nav, closeMenu, navState }) => {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="md:fixed md:inset-0 md:bg-black md:bg-opacity-50 md:z-[300]">
      <div className="bg-white w-[75vw] max-w-xs h-full shadow-lg p-6">
        <button
          onClick={closeMenu}
          className={`absolute top-3 right-8 text-3xl font-semibold text-slate-50`}
        >
          &times;
        </button>
        {user.isAuth ? (
              <AuthHeader closeMenu={closeMenu} />
            ) : (
              <ul className="flex flex-col items-start space-y-4">
                {nav
                  .filter((r) => r.isMenu)
                  .map((r) =>
                    r.name !== "Sign up" ? (
                      <li 
                            key={r.name} 
                            onClick={closeMenu}
                            className="grid items-center">
                        <MenuItems 
                                   r={r} 
                                   navState={true} />
                      </li>
                    ) : (
                      <li key={r.name} className="grid items-center">
                        <button 
                            className="px-4 py-1 text-slate-50 font-semibold bg-[#007bff] rounded hover:bg-[#1dd4cb]">
                          <Link 
                            to={"/signup"}>{r.name}</Link>
                        </button>
                      </li>
                    )
                  )}
              </ul>
            )}
        {/* <ul className="flex flex-col items-start space-y-4">
          {nav.map((r) => (
            <li key={r.name} className="text-lg font-semibold">
              <Link
                to={r.path}
                onClick={closeMenu}
                className="hover:text-[#1dd4cb]"
              >
                {r.name}
              </Link>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default HamburgerMenu;
