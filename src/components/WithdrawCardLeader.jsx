import Axios from "axios";
import { useEffect, useState } from "react";
import styles from "../style";
import { ToastContainer } from "react-toastify";
import HashCell from "./table/HashCell";
import { API_ENDPOINT } from "../constants";
import WithdrawTable from "./WithdrawTable";
import WithdrawItemLeader from "./WithdrawItemLeader";

const TABLE_HEAD = [
  "Code",
  "Date",
  "Amount",
  "Fee",
  "To",
  "Status",
  "Note",
];

const WithdrawCardLeader = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [withdrawHistory, setWithdrawHistory] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/withdraw-history/${walletAddress}/5`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setWithdrawHistory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="investment-container">
        <WithdrawItemLeader />
      </div>

      <div className={`${styles.flexCenter}`}>
        <WithdrawTable TYPE={5} TABLE_NAME={"Recent withdraw"} TABLE_SUBNAME={"These are details about the lastest withdraw"} TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={withdrawHistory} />
      </div>
    </>
  );
};

export default WithdrawCardLeader;
