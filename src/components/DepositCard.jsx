import Axios from "axios";
import { useEffect, useState } from "react";
import styles from "../style";
import TransactionTable from "./table/TransactionTable";
import Button from "./Button";
import TransactionStatusCell from "./table/TransactionStatusCell";
import DateCell from "./table/DataCell";
import { ToastContainer } from "react-toastify";
import DepositItem from "./DepositItem";
import HashCell from "./table/HashCell";

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
  },
  {
    accessorKey: "hash",
    header: "Hash",
    cell: HashCell,
    size: 200,
  },
];

const DepositCard = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [depositHistory, setDepositHistory] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      url: `http://localhost:8080/api/v1/management/bep20-history/${walletAddress}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    Axios.request(config)
      .then((response) => {
        setDepositHistory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="investment-container">
        <DepositItem />
      </div>

      <div className={`${styles.flexCenter}`}>
        <TransactionTable columns={columns} data={depositHistory} />
      </div>
    </>
  );
};

export default DepositCard;
