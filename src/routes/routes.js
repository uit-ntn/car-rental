import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import About from "../pages/About";
import Register from "../pages/Register";
import Detail from "../pages/Detail";
import Owner_Register from "../pages/Owner.Register";
import Account from "../pages/Accout";
import Instructions from "../pages/Instructions";
import Cart from "../pages/Cart";
import ResetPW from "../pages/ResetPW";
import Transaction from "../pages/Transaction";

const publicRoutes = [
  { path: '/', page: Home },
  { path: '/login', page: Login },
  { path: '/about', page: About },
  { path: '/register', page: Register },
  { path: '/detail/:id', page: Detail },
  { path: '/instructions', page: Instructions },
];

const privateRoutes = [
  { path: '/cart/:userId', page: Cart },
  { path: '/admin', page: Admin },
  { path: '/owner/register/:userId', page: Owner_Register },
  { path: '/account/:userId', page: Account },
  {path : `resetpw`,page : ResetPW},
  {path:`transaction`,page : Transaction}
];

export { privateRoutes, publicRoutes };
