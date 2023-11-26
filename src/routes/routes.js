// routes/routes.js

import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import About from "../pages/About";
import Register from "../pages/Register";
import Detail from "../pages/Detail";
import Owner_Register from "../pages/Owner.Register";
import Account from "../pages/Accout";


const publicRoutes = [
  { path: '/', page: Home },
  { path: '/login', page: Login },
  { path: '/about', page: About },
  { path: '/register', page: Register },
  { path: '/detail/:id', page: Detail },
];

const privateRoutes = [
  { path: '/admin', page: Admin },
  { path: '/owner/register', page: Owner_Register },
  {path : '/account' , page : Account}
];

export { privateRoutes, publicRoutes };
