import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import About from "../pages/About";

const publicRoutes = [
    { path: '/', page: Home },
    { path: '/login', page: Login },
    {path :'about',page : About}
]

const privateRoutes = [
    { path: '/admin', page: Admin }
]

export { privateRoutes, publicRoutes };
