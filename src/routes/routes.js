import Home from "../pages/Home";
import Auth from "../pages/Auth";
import About from "../pages/About";
import Detail from "../pages/Detail";
import Account from "../pages/Account";
import DashboardLayout from "../layouts/DashboardLayout";

const adminRoutes = [
  {path: "/dashboard", page: DashboardLayout},
];

const publicRoutes = [
  { path: "/", page: Home },
  { path: "/auth/login", page: Auth },
  { path: "/auth/register", page: Auth },
  { path: "/auth/forgotpw", page: Auth },
  { path: "/about", page: About },
  { path: "/car/:id", page: Detail },
];

// Các route dành cho customer
const customerRoutes = [
  { path: "/user/:userId", page: Account },
];

// Các route dành cho sale staff
const saleStaffRoutes = [
];

// Các route dành cho warehouse staff
const warehouseStaffRoute = [
];

export {
  publicRoutes,
  customerRoutes,
  saleStaffRoutes,
  warehouseStaffRoute,
  adminRoutes,
};
