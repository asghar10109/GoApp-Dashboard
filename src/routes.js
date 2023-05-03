import React from "react";

// Admin Imports
import MainDashboard from "views/admin/dashboard";
import Properties from "views/admin/properties";
import UsersList from "views/admin/users";
import Maintainance from "views/admin/maintainance";
import RTLDefault from "views/rtl/default";

// Auth Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  // {
  //   name: "Main Dashboard",
  //   layout: "/admin",
  //   path: "dashboard",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <MainDashboard />,
  // },
  {
    name: "Properties",
    layout: "/admin",
    path: "properties",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Properties />,
    secondary: true,
  },
  {
    name: "Maintenance",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "maintainances",
    component: <Maintainance />,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "users",
    icon: <MdPerson className="h-6 w-6" />,
    component: <UsersList />,
  },
  
];
const token = localStorage.token;
// console.log(token)
if (token){
  routes.push(
    {
        name: "Main Dashboard",
        layout: "/admin",
        path: "dashboard",
        icon: <MdHome className="h-6 w-6" />,
        component: <MainDashboard />,
      },
  )
}
export default routes;
