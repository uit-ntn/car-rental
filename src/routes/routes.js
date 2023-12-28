import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import Register from "../pages/Register";
import Detail from "../pages/Detail";
import Owner_Register from "../pages/Owner.Register";
import Account from "../pages/Account";
import Instructions from "../pages/Instructions";
import Cart from "../pages/Cart";
import ResetPW from "../pages/ResetPW";
import Transaction from "../pages/Transaction";
import Admin from "../pages/Admin";
const publicRoutes = [
  { path: "/", page: Home },
  { path: "/login", page: Login },
  { path: "/about", page: About },
  { path: "/register", page: Register },
  { path: "/instructions", page: Instructions },
  { path: "/bookmark/:userId", page: Cart },
  { path: "/detail/:id", page: Detail },
];

const privateRoutes = [
  
  { path: "/transaction/:userId", page: Transaction },
  { path: "/owner/register/:userId", page: Owner_Register },
  { path: "/account/:userId", page: Account },
  { path: `resetpw/:userId`, page: ResetPW },
];

const adminRoutes = [{ path: "/admin", page: Admin }];

export { privateRoutes, publicRoutes, adminRoutes };
