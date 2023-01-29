import Layout from "../Layout/Layout";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Table from "../Table/Table";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: <Table></Table>
            }
        ]
    },
    {
        path: "/registration",
        element: <Registration></Registration>
    },
    {
        path: "/login",
        element: <Login></Login>
    },
])