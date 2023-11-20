import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Stats} from "../pages/stats/index.js";
import {Base} from "../containers/base/index.js";
import {Home} from "../pages/home/index.js";

export default function Router() {

    const router = createBrowserRouter([
        {
            path: '/', element: <Base/>, children: [
                {path: '/', element: <Stats/>},
                {path: '/home', element: <Home/>}
            ]
        },
        {path: '*', element: <p>404 Page</p>}
    ])

    return <RouterProvider router={router}/>
}

