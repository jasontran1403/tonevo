import Axios from "axios";
import { useState, useEffect } from "react";
import styles from "../style";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINT } from "../constants";

const SwapItem = ({ swapHistory }) => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [fromSelected, setFromSelected] = useState(1);
  const [toSelected, setToSelected] = useState(2);
  const [balance, setBalance] = useState(0);

  const [listSwap] = useState([
    { id: 1, name: "USDT BEP20" },
    { id: 2, name: "Mapchain Token" },
    { id: 3, name: "Direct Commission" },
    { id: 4, name: "Binary Commission" },
    { id: 5, name: "Leader Commission" },
    { id: 6, name: "Pop Commission" },
    { id: 7, name: "Daily Reward" },
  ]);

  const [listBalance, setListBalance] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/balance/${walletAddress}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    Axios.request(config)
      .then((response) => {
        setBalance(response.data.balances[0].balance);
        setListBalance(response.data.balances);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [amountSwap, setAmountSwap] = useState(0);

  useEffect(() => {
    listBalance.forEach((item) => {
      if (item.type == fromSelected) {
        setBalance(item.balance);
        
      }
    })
  }, [fromSelected]);

  const handleCreateDeposit = () => {
    let swapType = 0;

    if (fromSelected == 1 && toSelected == 2) {
      swapType = 1;
    }

    if (amount <= 0 || swapType === undefined) {
      return;
    }

    if (amount > balance) {
      toast.error("Swap amount must <= balance!", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    let data = JSON.stringify({
      walletAddress: walletAddress,
      amount: amount,
      type: swapType,
    });

    let config = {
      method: "post",
      url: `${API_ENDPOINT}management/swap`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };

    Axios.request(config)
      .then((response) => {
        if (response.data === "ok") {
          toast.success("Swap success!", {
            position: "top-right",
            autoClose: 1500,
            onClose: () => {
              window.location.reload();
            },
          });
        } else {
          toast.error(response.data, {
            position: "top-right",
            autoClose: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeAmount = (amountToSwap) => {
    const value = amountToSwap;

    // Regex to allow only numbers and decimals
    const regex = /^[0-9]*\.?[0-9]*$/;

    // Check if the input value matches the regex (valid number format)
    if (regex.test(value)) {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue) && numericValue > 0) {
        setAmount(value); // Keep the valid input
        setAmountSwap(value / 0.1);
      } else {
        setAmount(""); // Reset if invalid
      }
    } else {
      setAmount(""); // Clear input if non-numeric characters are entered
    }
  };

  return (
    <div className={`investment-container $`}>
      <section
        className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} investment-card sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
      >
        <div className="flex-1 flex flex-col">
          <h2 className={styles.heading2}>Swap</h2>
          <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="packageName"
              >
                Swap from
              </label>
              <select
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="packageName"
                value={fromSelected}
                onChange={(e) => setFromSelected(e.target.value)}
              >
                {listSwap.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tokenBalance"
              >
                Balance
              </label>
              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="tokenBalance"
                type="text" // Use "text" to fully control input validation
                value={balance}
                readOnly
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tokenBalance"
              >
                Amount
              </label>
              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="tokenBalance"
                type="text" // Use "text" to fully control input validation
                value={amount}
                min="0.1"
                onChange={(e) => {
                  handleChangeAmount(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="packageName"
              >
                Swap to
              </label>
              <select
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="packageName"
                value={toSelected}
                onChange={(e) => setToSelected(e.target.value)}
              >
                {listSwap.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tokenBalance"
              >
                You get
              </label>
              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="tokenBalance"
                type="text" // Use "text" to fully control input validation
                value={amountSwap}
                readOnly
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tokenBalance"
              >
                Fee
              </label>
              <input
                className="bg-white shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="tokenBalance"
                type="text"
                value={fee}
                readOnly
              />
            </div>

            <div className="flex items-center justify-between">
              <Button handleClick={handleCreateDeposit} content={"Swap"} />
            </div>
          </div>

          <ToastContainer stacked />
        </div>
      </section>
    </div>
  );
};

export default SwapItem;
