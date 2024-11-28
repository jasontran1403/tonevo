// Disconnect.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react"; // or any specific hook provided by the SDK
import TonConnect from '@tonconnect/sdk';




const DisconnectComponent = () => {
    const wallet = useTonWallet();
    const navigate = useNavigate();
    const connect = useTonConnectUI();
    const connector = new TonConnect();

    const handleDisconnect = () => {
        // Clear sessionStorage or any state management related to wallet connection
        sessionStorage.removeItem("walletAddress");
        sessionStorage.removeItem("publicKey");
        sessionStorage.removeItem("walletStateInit");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("is_in_tree");
        sessionStorage.removeItem("is_lock");
        sessionStorage.removeItem("ton");
        sessionStorage.removeItem("bep20");
        sessionStorage.removeItem("xrp");

        connector.disconnect;

        // Optionally navigate to another path
        navigate('/'); // Redirect to home or any desired path after disconnect
    };

    // Call your function when the component mounts
    React.useEffect(() => {
        handleDisconnect();
    }, []);

    return (
        <div>
        </div>
    );
};

export default DisconnectComponent; // Ensure this is exported
