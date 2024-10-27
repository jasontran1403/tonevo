import React, { useEffect, useState } from "react";
import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Error404 from "./pages/Error404";
import Investment from "./pages/Investment";
import DepositUSDT from "./pages/DepositUSDT";
import DepositMCT from "./pages/DepositMCT";
import SwapUsdtMCT from "./pages/SwapUsdtMCT";
import Transfer from "./pages/Transfer";
import WithdrawUSDT from "./pages/WithdrawUSDT";
import WithdrawMCT from "./pages/WithdrawMCT";
import Tree from "./pages/Tree";
import Transactions from "./pages/Transactions";
import DisconnectComponent from "./components/DisconnectComponent";
import CommingSoon from "./pages/ComingSoon";
import Test from "./pages/Test";
import SwapMCTUsdt from "./pages/SwapMCTUsdt";
import DirectTree from "./pages/DirectTree";
import TransferDirect from "./pages/TransferDirect";
import TransferBinary from "./pages/TransferBinary";
import TransferLeader from "./pages/TransferLeader";
import TransferPop from "./pages/TransferPop";
import TransferDaily from "./pages/TransferDaily";
import SwapDaily from "./pages/SwapDaily";
import SwapDirect from "./pages/SwapDirect";
import SwapBinary from "./pages/SwapBinary";
import SwapLeader from "./pages/SwapLeader";
import SwapPop from "./pages/SwapPop";
import WithdrawPop from "./pages/WithdrawPop";
import WithdrawDaily from "./pages/WithdrawDaily";
import WithdrawDirect from "./pages/WithdrawDirect";
import WithdrawBinary from "./pages/WithdrawBinary";
import WithdrawLeader from "./pages/WithdrawLeader";
import MapchainChart from "./pages/MapchainChart";

export default function Router() {
    // Initialize with the value from localStorage
    const [isConnectedToWallet, setIsConnectedToWallet] = useState(() => {
        return (
            localStorage.getItem("walletAddress") &&
            localStorage.getItem("publicKey") &&
            localStorage.getItem("walletStateInit")
        );
    });

    const isAdmin = window.location.href.includes("/admin");

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
            element: isConnectedToWallet ? <SwapDaily /> : <Navigate to="/" />
        },
        {
            path: "/swap-direct",
            element: isConnectedToWallet ? <SwapDirect /> : <Navigate to="/" />
        },
        {
            path: "/swap-binary",
            element: isConnectedToWallet ? <SwapBinary /> : <Navigate to="/" />
        },
        {
            path: "/swap-leader",
            element: isConnectedToWallet ? <SwapLeader /> : <Navigate to="/" />
        },
        {
            path: "/swap-pop",
            element: isConnectedToWallet ? <SwapPop /> : <Navigate to="/" />
        },
        {
            path: "/withdraw-pop",
            element: isConnectedToWallet ? <WithdrawPop /> : <Navigate to="/" />
        },
        {
            path: "/withdraw-daily",
            element: isConnectedToWallet ? <WithdrawDaily /> : <Navigate to="/" />
        },
        {
            path: "/withdraw-direct",
            element: isConnectedToWallet ? <WithdrawDirect /> : <Navigate to="/" />
        },
        {
            path: "/withdraw-binary",
            element: isConnectedToWallet ? <WithdrawBinary /> : <Navigate to="/" />
        },
        {
            path: "/withdraw-leader",
            element: isConnectedToWallet ? <WithdrawLeader /> : <Navigate to="/" />
        },
        {
            path: "/transfer-direct",
            element: isConnectedToWallet ? <TransferDirect /> : <Navigate to="/" />
        },
        {
            path: "/transfer-binary",
            element: isConnectedToWallet ? <TransferBinary /> : <Navigate to="/" />
        },
        {
            path: "/transfer-leader",
            element: isConnectedToWallet ? <TransferLeader /> : <Navigate to="/" />
        },
        {
            path: "/transfer-pop",
            element: isConnectedToWallet ? <TransferPop /> : <Navigate to="/" />
        },
        {
            path: "/transfer-daily",
            element: isConnectedToWallet ? <TransferDaily /> : <Navigate to="/" />
        },
        {
            path: "/direct-tree",
            element: isConnectedToWallet ? <DirectTree /> : <Navigate to="/" />
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
            path: "/mapchain-chart",
            element: <MapchainChart />
        },
        // here
        {
            path: "/admin/dashboard/:id",
            element: isAdmin ? <Dashboard /> : <Navigate to="/" />
        },
        {
            path: "/admin/staking/:id",
            element: isAdmin ? <Investment /> : <Navigate to="/" />
        },
        {
            path: "/admin/withdraw-usdt/:id",
            element: isAdmin ? <WithdrawUSDT /> : <Navigate to="/" />
        },
        {
            path: "/admin/withdraw-mct/:id",
            element: isAdmin ? <WithdrawMCT /> : <Navigate to="/" />
        },
        {
            path: "/admin/deposit-usdt/:id",
            element: isAdmin ? <DepositUSDT /> : <Navigate to="/" />
        },
        {
            path: "/admin/deposit-mct/:id",
            element: isAdmin ? <DepositMCT /> : <Navigate to="/" />
        },
        {
            path: "/admin/swap-usdt-mct/:id",
            element: isAdmin ? <SwapUsdtMCT /> : <Navigate to="/" />
        },
        {
            path: "/admin/swap-mct-usdt/:id",
            element: isAdmin ? <SwapMCTUsdt /> : <Navigate to="/" />
        },
        {
            path: "/admin/swap-daily/:id",
            element: isAdmin ? <SwapDaily /> : <Navigate to="/" />
        },
        {
            path: "/admin/swap-direct/:id",
            element: isAdmin ? <SwapDirect /> : <Navigate to="/" />
        },
        {
            path: "/admin/swap-binary/:id",
            element: isAdmin ? <SwapBinary /> : <Navigate to="/" />
        },
        {
            path: "/admin/swap-leader/:id",
            element: isAdmin ? <SwapLeader /> : <Navigate to="/" />
        },
        {
            path: "/admin/swap-pop/:id",
            element: isAdmin ? <SwapPop /> : <Navigate to="/" />
        },
        {
            path: "/admin/withdraw-pop/:id",
            element: isAdmin ? <WithdrawPop /> : <Navigate to="/" />
        },
        {
            path: "/admin/withdraw-daily/:id",
            element: isAdmin ? <WithdrawDaily /> : <Navigate to="/" />
        },
        {
            path: "/admin/withdraw-direct/:id",
            element: isAdmin ? <WithdrawDirect /> : <Navigate to="/" />
        },
        {
            path: "/admin/withdraw-binary/:id",
            element: isAdmin ? <WithdrawBinary /> : <Navigate to="/" />
        },
        {
            path: "/admin/withdraw-leader/:id",
            element: isAdmin ? <WithdrawLeader /> : <Navigate to="/" />
        },
        {
            path: "/admin/transfer-direct/:id",
            element: isAdmin ? <TransferDirect /> : <Navigate to="/" />
        },
        {
            path: "/admin/transfer-binary/:id",
            element: isAdmin ? <TransferBinary /> : <Navigate to="/" />
        },
        {
            path: "/admin/transfer-leader/:id",
            element: isAdmin ? <TransferLeader /> : <Navigate to="/" />
        },
        {
            path: "/admin/transfer-pop/:id",
            element: isAdmin ? <TransferPop /> : <Navigate to="/" />
        },
        {
            path: "/admin/transfer-daily/:id",
            element: isAdmin ? <TransferDaily /> : <Navigate to="/" />
        },
        {
            path: "/admin/direct-tree/:id",
            element: isAdmin ? <DirectTree /> : <Navigate to="/" />
        },
        {
            path: "/admin/transfer/:id",
            element: isAdmin ? <Transfer /> : <Navigate to="/" />
        },
        {
            path: "/admin/transactions/:id",
            element: isAdmin ? <Transactions /> : <Navigate to="/" />
        },
        {
            path: "/admin/tree/:id",
            element: isAdmin ? <Tree /> : <Navigate to="/" />
        },
        // end
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
