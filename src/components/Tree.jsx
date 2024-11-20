import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import "../assets/css/TreeView.css";
import { API_ENDPOINT } from "../constants";
import { MultiTabDetectContext } from "../components/MultiTabDetectContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tree = () => {
  const { multiTabDetect } = useContext(MultiTabDetectContext);

  const [walletAddress, setWalletAddress] = useState(
    sessionStorage.getItem("walletAddress")
  );
  const [publicKey, setPublicKey] = useState(sessionStorage.getItem("publicKey"));
  const [walletStateInit, setWalletStateInit] = useState(
    sessionStorage.getItem("walletStateInit")
  );
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("access_token")
  );

  const [prevWallets, setPrevWallets] = useState([]); // Stack to hold previous wallet addresses
  const [currWallet, setCurrWallet] = useState(walletAddress);
  const [userRoot, setUserRoot] = useState({});
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    fetchTreeByRoot(currWallet); // Fetch tree using current wallet
  }, [currWallet]);

  const fetchTreeByRoot = (rootAddress) => {
    let data = JSON.stringify({
      walletAddress: rootAddress,
    });

    let config = {
      method: "post",
      url: `${API_ENDPOINT}management/userMapDown5Level`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      data: data,
    };

    Axios.request(config)
      .then((response) => {
        setTreeData(response.data.root);
        setUserRoot(response.data.root.userInfo);
      })
      .catch((error) => {
        toast.error("Please try again later", {
          position: "top-right",
          autoClose: 1500,
        });
      });
  };

  const handleClick = (address) => {

    setPrevWallets((prev) => [...prev, currWallet]); // Push current wallet to prev wallets stack
    setCurrWallet(address); // Update current wallet to the new address
  };

  const handleGoBack = () => {
    setPrevWallets((prev) => {
      if (prev.length === 0) return prev; // No previous wallets
      const lastWallet = prev[prev.length - 1]; // Get the last wallet
      setCurrWallet(lastWallet); // Set it as current wallet
      console.log("ok");
      return prev.slice(0, -1); // Remove the last wallet from the stack
    });
  };

  const renderTree = (node, depth = 0, position = 0) => {
    if (depth > 4) return null; // Limit depth to 5 levels (0-4)

    const displayName = node?.userInfo?.displayName || null;

    return (
      <li key={`${depth}-${position}`}>
        <div className={`node  ${!displayName ? "placeholder" : ""}`}>
          {displayName ? (
            <a
            className="glass"
              onClick={() => {
                handleClick(node.userInfo.walletAddress);
              }}
            >
              <p>{displayName}</p>
               
              <p className="sponsor">
                Sponsor: {node.userInfo?.rootDisplayName || "N/A"}
              </p>
              {/* <p className="sponsor">
                Placement: {node.userInfo?.placementDisplayName || "N/A"}
              </p> */}
              {/* <p className="sponsor">Side: {node.userInfo?.side || "N/A"}</p> */}
              <p className="sponsor">Sales: {node.userInfo?.sales || 0}</p>
              <p className="sponsor">Team sales left: {node.userInfo?.teamSalesLeft || 0}</p>
              <p className="sponsor">Team sales right: {node.userInfo?.teamSalesRight || 0}</p>
              <p className="sponsor">Binary left matching: {node.userInfo?.teamSalesLeftLeft || 0}</p>
              <p className="sponsor">Binary right matching: {node.userInfo?.teamSalesRightLeft || 0}</p>
            </a>
          ) : (
            <a>
              <p>&nbsp;</p>{" "}
              {/* This ensures there's some content inside the tag */}
              <p className="sponsor">&nbsp;</p>
              <p className="sponsor">&nbsp;</p>
              <p className="sponsor">&nbsp;</p>
              <p className="sponsor">&nbsp;</p>
            </a>
          )}
        </div>
        <ul>
          {/* Render left subtree */}
          {renderTree(node?.left, depth + 1, position * 2)}
          {/* Render right subtree */}
          {renderTree(node?.right, depth + 1, position * 2 + 1)}
        </ul>
      </li>
    );
  };

  return (
    <div className="tree">
      <button
        className="glass-button"
        onClick={handleGoBack}
        disabled={prevWallets.length === 0}
      >
        Back
      </button>
      <ul className="tree-ul">
        {renderTree(treeData)} {/* Render the entire tree */}
      </ul>
    </div>
  );
};

export default Tree;
