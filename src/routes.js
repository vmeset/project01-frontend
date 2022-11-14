import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import List from "./pages/List";
import NotePage from "./pages/NotePage";
import { ADMIN_ROUTE, TO_BUY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, NOTE_ROUTE, REGISTRATION_ROUTE, TO_DO_ROUTE, DONE_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: TO_DO_ROUTE,
        Component: List
    },
    {
        path: TO_BUY_ROUTE,
        Component: List
    },
    {
        path: DONE_ROUTE,
        Component: List
    },
    {
        path: NOTE_ROUTE + '/:id',
        Component: NotePage
    },
    {
        path: MAIN_ROUTE,
        Component: List
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]