import Home from "../pages/Home";

const publicRoutes = [
    { path: '/', page: Home },
    { path: '/', page }
]

const privateRoutes = [
    { path: '/', page: Admin }
]

export default { privateRoutes, publicRoutes };