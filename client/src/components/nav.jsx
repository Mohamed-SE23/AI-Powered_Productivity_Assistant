// import { lazy } from "react";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Signin from "../pages/signin/Signin";
import Signup from "../pages/signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";

// const Home = lazy(() => import("../pages/Home/Home"));
// const About = lazy(() => import("../pages/About/About"));
// const Signin = lazy(() => import("../pages/signin/Signin"));
// const Signup = lazy(() => import("../pages/signup/Signup"));
// const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));

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
        path: "/dashboard",
        name: "Dashboard",
        element: <Dashboard />,
        isMenu: false,
        isPrivate: true,
      },
]
