import Axios from "axios";
import { useState, useEffect } from "react";
import styles from "../style";
import TaskTable from "../components/table/TaskTable";
import WalletCard from "./WalletCard";
import InvestmentCard from "./InvestmentCard";
import StatusCell from "../components/table/StatusCell";
import DateCell from "../components/table/DataCell";
import TransactionTable from "./TransactionTable";
import { API_ENDPOINT } from "../constants";
import WalletCard2 from "./WalletCard2";
import WalletCard3 from "./WalletCard3";
import WalletCard4 from "./WalletCard4";
import WalletCard5 from "./WalletCard5";
import RankCard from "./RankCard";
import ReflinkCard from "./ReflinkCard";

const TABLE_HEAD = ["Code", "Date", "Amount", "Status", "Note"];

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
  },
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
  const [leftRefCode, setLeftRefCode] = useState("");
  const [rightRefCode, setRightRefCode] = useState("");

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/balance/${walletAddress}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setListTransaction(response.data.transactionHistory);
        setListBalance(response.data.balances);
        setRank(response.data.rank);
        setLeftRefCode(response.data.leftRefCode)
        setRightRefCode(response.data.rightRefCode);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", width: "100svw" }}
      >
        <div>
          {/* First Row - 3 Items */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center", // Distributes items evenly
              width: "100%",
              gap: "20px",
              marginTop: "100px",
            }}
            className="flex-wrap" // Allow wrapping on small screens
          >
            <RankCard content={"Rank"} rank={rank} />
            <WalletCard2
              content={"USDT BEP20"}
              amount={listBalance[0]?.balance}
              unit={"USDT"}
              wallet={true}
              className="flex-1 w-full max-w-xs" // Adjust width for small screens
            />
            <WalletCard2
              content={"Mapchain Token"}
              amount={listBalance[1]?.balance}
              unit={"MCT"}
              wallet={true}
              className="flex-1 w-full max-w-xs" // Adjust width for small screens
            />
            <ReflinkCard
              content={"Reflink"}
              walletAddress={walletAddress}
              leftRefCode={leftRefCode}
              rightRefCode={rightRefCode}
              className="flex-1 w-full max-w-xs" // Adjust width for small screens
            />
          </div>

          {/* Second Row - 3 Items */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center", // Distributes items evenly
              width: "100%",
              gap: "20px",
              marginTop: "50px",
              marginBottom: "50px",
            }}
            className="flex-wrap" // Allow wrapping on small screens
          >
            <WalletCard3
              content={"Commission"}
              amount={
                listBalance[2]?.balance +
                listBalance[3]?.balance +
                listBalance[4]?.balance +
                listBalance[5]?.balance
              }
              unit={"MCT"}
              wallet={false}
              className="flex-1 w-full max-w-xs" // Adjust width for small screens
            />
            <WalletCard3
              content={"Daily reward"}
              amount={listBalance[8]?.balance}
              unit={"MCT"}
              wallet={false}
              className="flex-1 w-full max-w-xs" // Adjust width for small screens
            />
            <WalletCard5
              content={"Transfer wallet"}
              amount={listBalance[6]?.balance}
              unit={"MCT"}
              wallet={false}
              className="flex-1 w-full max-w-xs" // Adjust width for small screens
            />
            <WalletCard4
              content={"Maxout"}
              amount={listBalance[7]?.balance}
              unit={"MCT"}
              wallet={false}
              className="flex-1 w-full max-w-xs" // Adjust width for small screens
            />
          </div>
        </div>
      </div>

      <div className="investment-container pt-[20px] w-full">
        <TransactionTable
          className="w-full flex justify-center items-center ml-[20px]"
          TABLE_NAME={"Recent transactions"}
          TABLE_SUBNAME={"These are details about the lastest transactions"}
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={listTransaction}
        />
      </div>
    </>
  );
};

export default MainDashboard;
