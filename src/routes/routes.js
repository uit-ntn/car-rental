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
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import SellCar from "../pages/SellCar";
import Settings from "../pages/Settings";
import { Navigate } from "react-router-dom";
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
  { path: '/owner/register/:userId', page: Owner_Register },
  { path: '/account/:userId', page: Account },
  { path: `resetpw`, page: ResetPW },
  { path: `transaction`, page: Transaction }]

  const RedirectDashboard = () => {
    return <Navigate to="/admin/dashboard" />;
  };
  const adminRoutes = [
    { path: '/admin', element: <RedirectDashboard /> },
    { path: '/admin/dashboard', page: Dashboard },
    { path: '/admin/bookings', page: Bookings },
    { path: '/admin/sell-car', page: SellCar },
    { path: '/admin/settings', page: Settings },
  ];
  

export { privateRoutes, publicRoutes, adminRoutes };
