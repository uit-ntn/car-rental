import Home from "../pages/Home";
import Auth from "../pages/Auth";
import About from "../pages/About";
import Detail from "../pages/Detail";
import Account from "../pages/Account";
import ResetPW from "../pages/ResetPW";
import Privacy from "../pages/Privacy";
// import Admin from "../pages/Admin";


// No need to login to use
const publicRoutes = [
  { path: "/", page: Home },
  { path: "/auth/login", page: Auth },
  { path: "/auth/register", page: Auth },
  { path: "/auth/forgotpw", page: Auth },
  { path: "/about", page: About },
  { path: "/detail/:id", page: Detail },
  { path: "/privacy", page: Privacy }
];


// role = customer
const customerRoutes = [
  { path: "/account/:userId", page: Account },
  { path: `/resetpw/:userId`, page: ResetPW },
];


// role = sale staff
const saleStaffRoutes = [

]

// role = warehouse staff
const warehouseStaffRoute = [

]

// role = admin
const adminRoutes = [
  // { path: "/admin", page: Admin }
];





export {
  publicRoutes,
  customerRoutes,
  saleStaffRoutes,
  warehouseStaffRoute,
  adminRoutes
};
