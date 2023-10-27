import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import About from "../pages/About";
import Register from "../pages/Register";

const publicRoutes = [
    { path: '/', page: Home },
    { path: '/login', page: Login },
    {path :'about',page : About},
    {path : '/register', page : Register}
]

const privateRoutes = [
    { path: '/admin', page: Admin }
]

export { privateRoutes, publicRoutes };
