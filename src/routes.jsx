import React, { useEffect, useState } from "react";
import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Error404 from "./pages/Error404";
import Investment from "./pages/Investment";
import Deposit from "./pages/Deposit";
import Swap from "./pages/Swap";
import Transfer from "./pages/Transfer";
import Withdraw from "./pages/Withdraw";
import Tree from "./pages/Tree";
import TableUser from "./pages/TableUser";
import Transactions from "./pages/Transactions";
import DisconnectComponent from "./components/DisconnectComponent";
import CommingSoon from "./pages/ComingSoon";
import Test from "./pages/Test";
import Maintance from "./pages/Maintance";

export default function Router() {
    // Initialize with the value from localStorage
    const [isConnectedToWallet, setIsConnectedToWallet] = useState(() => {
        return (
            localStorage.getItem("walletAddress") &&
            localStorage.getItem("publicKey") &&
            localStorage.getItem("walletStateInit")
        );
    });

    const routes = useRoutes([
        {
            path: "/",
            element: <LandingPage />
        },
        {
            path: "/dashboard",
            element: isConnectedToWallet ? <Maintance /> : <Navigate to="/" />
        },
        {
            path: "/staking",
            element: isConnectedToWallet ? <Maintance /> : <Navigate to="/" />
        },
        {
            path: "/withdraw",
            element: isConnectedToWallet ? <Maintance /> : <Navigate to="/" />
        },
        {
            path: "/deposit",
            element: isConnectedToWallet ? <Maintance /> : <Navigate to="/" />
        },
        {
            path: "/swap",
            element: isConnectedToWallet ? <Maintance /> : <Navigate to="/" />
        },
        {
            path: "/test",
            element: <Maintance />
        },
        {
            path: "/transfer",
            element: isConnectedToWallet ? <Maintance /> : <Navigate to="/" />
        },
        {
            path: "/transactions",
            element: isConnectedToWallet ? <Maintance /> : <Navigate to="/" />
        },
        {
            path: "/tree",
            element: isConnectedToWallet ? <Maintance /> : <Navigate to="/" />
        },
        {
            path: "/disconnect",
            element: <DisconnectComponent />
        },
        {
            path: "/mapchain-swap",
            element: <Maintance />
        },
        {
            path: '/404',
            element: <Error404 />
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />
        },
    ]);

    return routes;
}
