import Axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
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


function App() {
  const wallet = useTonWallet();
  const connect = useTonConnectUI();
  const [lastStatus, setLastStatus] = useState();

  useEffect(() => {
    var timeout;

    // if (wallet == null) return;
    if (connect[0].connected) {
      // Lưu địa chỉ ví vào localStorage
      localStorage.setItem("walletAddress", wallet.account.address);
      localStorage.setItem("publicKey", wallet.account.publicKey);
      localStorage.setItem("walletStateInit", wallet.account.walletStateInit);
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
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("is_in_tree", response.data.is_in_tree);
        });
      }, 500);
    } else {
      // Xóa thông tin ví khi ngắt kết nối
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("publicKey");
      localStorage.removeItem("walletStateInit");

      let config = {
        method: "get",
        url: `${API_ENDPOINT}auth/logout/${localStorage.getItem(
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
    }

    return (() => {
      clearTimeout(timeout);
    })
  }, [connect]);

  return <Router />;
}

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
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
    </BrowserRouter>
  </TonConnectUIProvider>
  // </React.StrictMode>
);
