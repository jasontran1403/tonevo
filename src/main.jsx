import Axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ReactDOM from "react-dom/client";
import Router from "./routes";
import "./index.css";
import {
  THEME,
  TonConnectUIProvider,
  useTonWallet,
} from "@tonconnect/ui-react";
import { API_ENDPOINT } from "./constants";
import { BrowserRouter } from "react-router-dom";
import { useTonConnectUI } from "@tonconnect/ui-react"; // or any specific hook provided by the SDK
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MultiTabDetectProvider } from "./components/MultiTabDetectContext";
import PuffLoader from "react-spinners/PuffLoader";

function App() {
  const wallet = useTonWallet();
  const connect = useTonConnectUI();
  const [lastStatus, setLastStatus] = useState();
  const isAdmin = window.location.href.includes("/admin");
  const id = location.pathname.split("/admin/dashboard/")[1];
  const [loading, setLoading] = useState(true);
  let [color] = useState("#42d7f5");

  useEffect(() => {
    var timeout;
    if (isAdmin) {
      timeout = setTimeout(() => {
        let data = JSON.stringify({
          walletAddress: id,
        });

        let config = {
          method: "post",
          url: `${API_ENDPOINT}auth/admin-jwt`,
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
          data: data,
        };

        Axios.request(config).then((response) => {
          sessionStorage.setItem("walletAddress", response.data.wallet_address);
          sessionStorage.setItem("access_token", response.data.access_token);
          sessionStorage.setItem("is_in_tree", response.data.is_in_tree);
          sessionStorage.setItem("is_lock", response.data.is_lock);
          sessionStorage.setItem("bep20", response.data.bep20);
          sessionStorage.setItem("xrp", response.data.xrp);
        });
      }, 500);
    } else {
      if (wallet === null) return;

      if (connect[0].connected) {
        // Lưu địa chỉ ví vào sessionStorage
        sessionStorage.setItem("walletAddress", wallet.account.address);
        sessionStorage.setItem("publicKey", wallet.account.publicKey);
        sessionStorage.setItem("walletStateInit", wallet.account.walletStateInit);
        sessionStorage.setItem("managerment", "admin");
        setLastStatus(true);
        timeout = setTimeout(() => {
          let data = JSON.stringify({
            walletAddress: wallet.account.address,
            publicKey: wallet.account.publicKey,
            walletStateInit: wallet.account.walletStateInit,
          });

          let config = {
            method: "post",
            url: `${API_ENDPOINT}auth/authenticate`,
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
            data: data,
          };

          Axios.request(config).then((response) => {
            sessionStorage.setItem("access_token", response.data.access_token);
            sessionStorage.setItem("is_in_tree", response.data.is_in_tree);
            sessionStorage.setItem("is_lock", response.data.is_lock);
            sessionStorage.setItem("bep20", response.data.bep20);
            sessionStorage.setItem("xrp", response.data.xrp);
            sessionStorage.setItem("ton", response.data.ton);
            sessionStorage.setItem("price", response.data.price);
          });
        }, 500);
      } else {
        // Xóa thông tin ví khi ngắt kết nối
        disconnect();
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [connect, id]);

  const disconnect = () => {
    sessionStorage.removeItem("walletAddress");
    sessionStorage.removeItem("publicKey");
    sessionStorage.removeItem("walletStateInit");
    sessionStorage.removeItem("is_in_tree");
    sessionStorage.removeItem("is_lock");
    sessionStorage.removeItem("ton");
    sessionStorage.removeItem("bep20");
    sessionStorage.removeItem("xrp");
    sessionStorage.removeItem("price");

    let config = {
      method: "get",
      url: `${API_ENDPOINT}auth/logout/${sessionStorage.getItem(
        "access_token"
      )}`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config).then((response) => {
      if (response.data) {
        if (lastStatus) {
          setLastStatus(false);
          window.location.href = "/";
        }
      }
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout); // Dọn dẹp timeout khi component unmount
  }, []);

  if (loading) {
    return (
      <div className="sweet-loading">
        <PuffLoader  
          color={color}
          loading={loading}
          size={150}
        />
      </div>
    );
  }

  return <Router />;
}

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <MultiTabDetectProvider>
    <TonConnectUIProvider
      manifestUrl="https://www.mapchain.org/tonconnect-manifest.json"
      uiPreferences={{
        theme: THEME.LIGHT,
        borderRadius: "s",
        colorsSet: {
          [THEME.DARK]: {
            connectButton: {
              background: "#29CC6A",
            },
          },
        },
      }}
    >
      <BrowserRouter>
        <App />
        <ToastContainer stacked />
      </BrowserRouter>
    </TonConnectUIProvider>
  </MultiTabDetectProvider>
);