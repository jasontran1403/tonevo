import Axios from "axios";
import { useState, useEffect } from "react";
import styles from "../style";
import TaskTable from "../components/table/TaskTable";
import WalletCard from "./WalletCard";
import InvestmentCard from "./InvestmentCard";
import StatusCell from "../components/table/StatusCell";
import DateCell from "../components/table/DataCell";

const columns = [
  {
    accessorKey: "code",
    header: "Code",
    size: 400,
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
    size: 100,
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 200,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
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

const MainDashboard = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [rank, setRank] = useState(0);
  const [listBalance, setListBalance] = useState([]);
  const [listTransaction, setListTransaction] = useState([]);
  useEffect(() => {
    let config = {
      method: "get",
      url: `http://localhost:8080/api/v1/management/balance/${walletAddress}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    Axios.request(config)
      .then((response) => {
        console.log(response.data);
        setListTransaction(response.data.transactionHistory);
        setListBalance(response.data.balances);
        setRank(response.data.rank);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
      <>
        <div className="wallet-container">
          <WalletCard className="wallet-card" content={"USDT BEP20"} amount={listBalance[0]?.balance} unit={"USDT"} />
          <WalletCard className="wallet-card" content={"Mapchain Token"} amount={listBalance[1]?.balance} unit={"MCT"} />
          <WalletCard className="wallet-card" content={"Direct Commission"} amount={listBalance[2]?.balance} unit={"MCT"} />
          <WalletCard className="wallet-card" content={"Binary Commission"} amount={listBalance[3]?.balance} unit={"MCT"} />
          <WalletCard className="wallet-card" content={"Leader Commission"} amount={listBalance[4]?.balance} unit={"MCT"} />
          <WalletCard className="wallet-card" content={"Pop Commission"} amount={listBalance[5]?.balance} unit={"MCT"} />
          <WalletCard className="wallet-card" content={"Transfer Commission"} amount={listBalance[6]?.balance} unit={"MCT"} />
          <WalletCard className="wallet-card" content={"Maxout"} amount={listBalance[7]?.balance} unit={"MCT"} />
          <WalletCard className="wallet-card" content={"Daily reward"} amount={listBalance[8]?.balance} unit={"MCT"} />

          <section
            className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
          >
            <div className="flex-1 flex flex-col">
              <h2 className={styles.heading2}>Level {rank}</h2>
            </div>
          </section>
        </div>
        <div className={`${styles.flexCenter}`}>
            <TaskTable columns={columns} data={listTransaction} />
        </div>
      </>
  );
};

export default MainDashboard;
