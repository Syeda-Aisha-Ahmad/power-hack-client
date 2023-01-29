import Login from "../Login/Login";
import Registration from "../Registration/Registration";

const { createBrowserRouter } = require("react-router-dom");
const { default: Header } = require("../Shared/Header/Header");

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Header></Header>
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