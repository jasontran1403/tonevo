import Axios from "axios";
import { useEffect, useState } from "react";
import styles from "../style";
import TaskTable from "../components/table/TaskTable";
import InvestmentPackage from "./InvestmentPackage";
import StatusCell from "../components/table/StatusCell";
import DateCell from "../components/table/DataCell";
import { API_ENDPOINT } from "../constants";
import InvestmentTable from "./InvestmentTable";

const TABLE_HEAD = [
  "Code",
  "Date",
  "Daily Reward",
  "Capital",
  "Status",
];

const InvestmentCard = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [packages, setPackages] = useState();
  const [balance, setBalance] = useState();
  const [listInvestment, setListInvestment] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/packages/${walletAddress}`,
      headers: {
        Authorization: accessToken,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setPackages(response.data.packages);
        setBalance(response.data.balance);
        setListInvestment(response.data.investments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  return (
    <>
      <div className="investment-container">
        <InvestmentPackage packages={packages} balance={balance} />
      </div>

      <div className={`${styles.flexCenter}`}>
        <InvestmentTable TABLE_NAME={"Recent deposit"} TABLE_SUBNAME={"These are details about the lastest deposit"} TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={listInvestment} />
      </div>
    </>
  );
};

export default InvestmentCard;
