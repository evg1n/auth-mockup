import Home from "./Home/Home.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";

const ROUTES = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];

export default ROUTES;
