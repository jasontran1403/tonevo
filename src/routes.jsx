import React, { useEffect, useState } from "react";
import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Error404 from "./pages/Error404";
import Investment from "./pages/Investment";
import DepositUSDT from "./pages/DepositUSDT";
import DepositMCT from "./pages/DepositMCT";
import Swap from "./pages/Swap";
import SwapUsdtMCT from "./pages/SwapUsdtMCT";
import Transfer from "./pages/Transfer";
import WithdrawUSDT from "./pages/WithdrawUSDT";
import WithdrawMCT from "./pages/WithdrawMCT";
import Tree from "./pages/Tree";
import TableUser from "./pages/TableUser";
import Transactions from "./pages/Transactions";
import DisconnectComponent from "./components/DisconnectComponent";
import CommingSoon from "./pages/ComingSoon";
import Test from "./pages/Test";
import Maintance from "./pages/Maintance";
import DailySwap from "./pages/DailySwap";
import DirectSwap from "./pages/DirectSwap";
import BinarySwap from "./pages/BinarySwap";
import LeaderSwap from "./pages/LeaderSwap";
import PopSwap from "./pages/PopSwap";
import SwapMCTUsdt from "./pages/SwapMCTUsdt";

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
            element: isConnectedToWallet ? <Dashboard /> : <Navigate to="/" />
        },
        {
            path: "/staking",
            element: isConnectedToWallet ? <Investment /> : <Navigate to="/" />
        },
        {
            path: "/withdraw-usdt",
            element: isConnectedToWallet ? <WithdrawUSDT /> : <Navigate to="/" />
        },
        {
            path: "/withdraw-mct",
            element: isConnectedToWallet ? <WithdrawMCT /> : <Navigate to="/" />
        },
        {
            path: "/deposit-usdt",
            element: isConnectedToWallet ? <DepositUSDT /> : <Navigate to="/" />
        },
        {
            path: "/deposit-mct",
            element: isConnectedToWallet ? <DepositMCT /> : <Navigate to="/" />
        },
        {
            path: "/swap-usdt-mct",
            element: isConnectedToWallet ? <SwapUsdtMCT /> : <Navigate to="/" />
        },
        {
            path: "/swap-mct-usdt",
            element: isConnectedToWallet ? <SwapMCTUsdt /> : <Navigate to="/" />
        },
        {
            path: "/swap-daily",
            element: isConnectedToWallet ? <Swap /> : <Navigate to="/" />
        },
        {
            path: "/swap-direct",
            element: isConnectedToWallet ? <Swap /> : <Navigate to="/" />
        },
        {
            path: "/swap-binary",
            element: isConnectedToWallet ? <Swap /> : <Navigate to="/" />
        },
        {
            path: "/swap-leader",
            element: isConnectedToWallet ? <Swap /> : <Navigate to="/" />
        },
        {
            path: "/swap-pop",
            element: isConnectedToWallet ? <Swap /> : <Navigate to="/" />
        },
        {
            path: "/withdraw-pop",
            element: isConnectedToWallet ? <Swap /> : <Navigate to="/" />
        },
        {
            path: "/withdraw-daily",
            element: isConnectedToWallet ? <Swap /> : <Navigate to="/" />
        },
        {
            path: "/withdraw-direct",
            element: isConnectedToWallet ? <Swap /> : <Navigate to="/" />
        },
        {
            path: "/withdraw-binary",
            element: isConnectedToWallet ? <Swap /> : <Navigate to="/" />
        },
        {
            path: "/withdraw-leader",
            element: isConnectedToWallet ? <Swap /> : <Navigate to="/" />
        },
        {
            path: "/test",
            element: <Test />
        },
        {
            path: "/transfer",
            element: isConnectedToWallet ? <Transfer /> : <Navigate to="/" />
        },
        {
            path: "/transactions",
            element: isConnectedToWallet ? <Transactions /> : <Navigate to="/" />
        },
        {
            path: "/tree",
            element: isConnectedToWallet ? <Tree /> : <Navigate to="/" />
        },
        {
            path: "/disconnect",
            element: <DisconnectComponent />
        },
        {
            path: "/mapchain-swap",
            element: <CommingSoon />
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
