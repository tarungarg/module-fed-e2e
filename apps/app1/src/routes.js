import Abs from "./Abs";
import React, { Children } from 'react';
import Absd from './Absd';
import { Outlet } from 'react-router-dom';
let LazyActual = React.lazy(() => import("./Absd"));

const routes = [
    {
        path: "abc",
        element: <Abs />,
        exact:  true,

        children: [
            {
                path: "xyz",
                exact:  true,
                element: <LazyActual />
            }
        ]
    }
]

export default routes;
