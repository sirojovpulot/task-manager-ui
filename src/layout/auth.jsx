import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "../view/auth/login.jsx";
import Register from "../view/auth/register.jsx";
import {LOGIN_PREFIX_PATH, REG_PREFIX_PATH} from "../config/AppConfig.js";

const AuthLayout = () => {

    const router = createBrowserRouter([
        {
            path: LOGIN_PREFIX_PATH,
            element: <Login/>,
        },
        {
            path: REG_PREFIX_PATH,
            element: <Register/>,
        },
        {
            path: "*",
            element: <Navigate to={LOGIN_PREFIX_PATH}/>
        }
    ]);


    return <RouterProvider router={router}/>
}


export default AuthLayout;