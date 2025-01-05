import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { nav } from "./nav";
import MenuItems from "./MenuItems";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../app/UserInfo";
import AuthHeader from "./AuthHeader";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const [navState, setNavState] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Tracks hamburger menu state
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };

  useEffect(() => {
    // Handle scroll-based state only on the home route
    if (location.pathname === "/") {
      window.addEventListener("scroll", onNavScroll);
      return () => window.removeEventListener("scroll", onNavScroll);
    } else {
      // Force fixed navbar on non-root routes
      setNavState(true);
    }
  }, [location]);

  return (
    <>
      <header
        className={
          !navState
            ? "absolute top-7 left-0 right-0 z-[200]"
            : "fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center border-b z-[200] bg-white"
        }
      >
        <nav className="flex items-center justify-between container">
          <div className="flex items-center text-xl text-[#2596DD] font-bold">
            AI<span className="text-[#1DD4CB]">-PPA</span>
          </div>

          {/* Hamburger button for mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:block hidden text-2xl ${!navState ? 'text-slate-50' : ''}`}
          >
            &#9776;
          </button>

          {/* Full menu for larger screens */}
          <div className="md:hidden flex items-center">
            {user.isAuth ? (
              <AuthHeader />
            ) : (
              <ul className="flex items-center justify-center gap-4">
                {nav
                  .filter((r) => r.isMenu)
                  .map((r) =>
                    r.name !== "Sign up" ? (
                      <li key={r.name} className="grid items-center">
                        <MenuItems r={r} navState={navState} />
                      </li>
                    ) : (
                      <li key={r.name} className="grid items-center">
                        <button className="px-4 py-1 text-slate-50 font-semibold bg-[#007bff] rounded hover:bg-[#1dd4cb]">
                          <Link to={"/signup"}>{r.name}</Link>
                        </button>
                      </li>
                    )
                  )}
              </ul>
            )}
          </div>
        </nav>
      </header>

      {/* Hamburger menu */}
      {menuOpen && <HamburgerMenu navState={navState} nav={nav} closeMenu={() => setMenuOpen(false)} />}
    </>
  );
};

export default Navbar;
