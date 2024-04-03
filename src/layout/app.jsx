import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

import PageNotFound from "../components/404.jsx";
import Home from "../view/admin/index.jsx";
import Dashboard from "../components/dashboard/index.jsx";
import {ADMIN_PREFIX_PATH} from "../config/AppConfig.js";


const AppLayout = () => {

    const router = createBrowserRouter([
        {
            path: ADMIN_PREFIX_PATH,
            element: <Dashboard/>,
            errorElement: <PageNotFound/>,
            children: [
                {
                    path: '',
                    element: <Home/>
                }
            ]
        },
        {
            path: '*',
            element: <Navigate to={ADMIN_PREFIX_PATH}/>
        }
    ]);


    return <RouterProvider router={router}/>
}


export default AppLayout;