import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";

const publicRoutes = [
    { path: '/', page: Home },
    { path: '/login', page: Login }
]

const privateRoutes = [
    { path: '/admin', page: Admin }
]

export { privateRoutes, publicRoutes };
