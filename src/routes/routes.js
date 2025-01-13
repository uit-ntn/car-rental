import Home from "../pages/Home";
import Auth from "../pages/Auth";
import About from "../pages/About";
import Detail from "../pages/Detail";

const publicRoutes = [
  { path: "/", page: Home },
  { path: "/auth/login", page: Auth },
  { path: "/auth/register", page: Auth },
  { path: "/auth/forgotpw", page: Auth },
  { path: "/about", page: About },
  { path: "/detail/:id", page: Detail },
];


// role = customer
const customerRoutes = [
  // { path: "/account/:userId", page: Account },
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
