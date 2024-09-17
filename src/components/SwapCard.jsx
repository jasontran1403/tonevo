import Axios from "axios";
import { useEffect, useState } from "react";
import styles from "../style";
import TransactionTable from "./table/TransactionTable";
import Button from "./Button";
import TransactionStatusCell from "./table/TransactionStatusCell";
import DateCell from "./table/DataCell";
import { ToastContainer } from "react-toastify";
import SwapItem from "./SwapItem";
import HashCell from "./table/HashCell";
import { API_ENDPOINT } from "../constants";

const columns = [
  {
    accessorKey: "code",
    header: "Code",
    size: 500,
    enableColumnFilter: true,
    enableSorting: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: DateCell,
    size: 200,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 200,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: TransactionStatusCell,
    size: 300,
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length === 0) return true;
      const status = row.getValue(columnId);
      return filterStatuses.includes(status?.id);
    },
  }
];

const SwapCard = () => {
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
        <SwapItem />
      </div>

      <div className={`${styles.flexCenter}`}>
        <TransactionTable columns={columns} data={swapHistory} />
      </div>
    </>
  );
};

export default SwapCard;
