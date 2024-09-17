import Axios from "axios";
import { useEffect, useState } from "react";
import styles from "../style";
import TaskTable from "../components/table/TaskTable";
import InvestmentPackage from "./InvestmentPackage";
import StatusCell from "../components/table/StatusCell";
import DateCell from "../components/table/DataCell";

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
    accessorKey: "daily",
    header: "Reward",
    size: 200,
  },
  {
    accessorKey: "capital",
    header: "Capital",
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
        <TaskTable columns={columns} data={listInvestment} />
      </div>
    </>
  );
};

export default InvestmentCard;
