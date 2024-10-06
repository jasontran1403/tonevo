import Axios from "axios";
import { useEffect, useState } from "react";
import styles from "../style";
import Button from "./Button";
import TransactionStatusCell from "./table/TransactionStatusCell";
import DateCell from "./table/DataCell";
import { ToastContainer } from "react-toastify";
import DepositTable from "./DepositTable";
import { API_ENDPOINT } from "../constants";
import SwapItemDaily from "./SwapItemDaily";

const TABLE_HEAD = ["Code", "Date", "Amount", "Status", "Note"];

const SwapCardDaily = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [swapHistory, setSwapHistory] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/swap-history/${walletAddress}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setSwapHistory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="investment-container">
        <SwapItemDaily />
      </div>

      <div className={`${styles.flexCenter}`}>
        <DepositTable
          TABLE_NAME={"Recent swap"}
          TABLE_SUBNAME={"These are details about the lastest swap"}
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={swapHistory}
        />
      </div>
    </>
  );
};

export default SwapCardDaily;
