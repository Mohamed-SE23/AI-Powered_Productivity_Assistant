// import { lazy } from "react";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Signin from "../pages/signin/Signin";
import Signup from "../pages/signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import Notifications from "../pages/notifications/Notifications";

export const nav = [
    {
        path: "/",
        name: "Home",
        element: <Home />,
        isMenu: true,
        isPrivate: false,
      },
    {
        path: "/about",
        name: "About",
        element: <About />,
        isMenu: true,
        isPrivate: false,
      },
    {
        path: "/signin",
        name: "Sign in",
        element: <Signin />,
        isMenu: true,
        isPrivate: false,
      },
    {
        path: "/signup",
        name: "Sign up",
        element: <Signup />,
        isMenu: true,
        isPrivate: false,
      },
    {
        path: "/:userId/dashboard",
        name: "Dashboard",
        element: <Dashboard />,
        isMenu: false,
        isPrivate: true,
      },
    {
        path: "/:userId/profile",
        name: "Profile",
        element: <Profile />,
        isMenu: false,
        isPrivate: true,
      },
    {
        path: "/:userId/notifications",
        name: "Notifications",
        element: <Notifications />,
        isMenu: false,
        isPrivate: true,
      },
]

export const dashboardOutlets = [

]