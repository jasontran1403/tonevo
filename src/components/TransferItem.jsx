import Axios from "axios";
import { useState, useEffect } from "react";
import styles from "../style";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINT } from "../constants";

const TransferItem = ({ swapHistory }) => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [to, setTo] = useState("");
  const [balance, setBalance] = useState(0);

  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);

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
        setBalance(response.data.balances[1].balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCreateDeposit = () => {
    if (amount <= 0) {
      toast.error("Swap amount must > 0!", {
        position: "top-right",
        autoClose: 1500,
      });
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
      from: walletAddress,
      to: to,
      amount: amount,
      status: 1,
      type: 0,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_ENDPOINT}management/transfer-balance`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": "69420",
      },
      data: data,
    };

    Axios.request(config)
      .then((response) => {
        if (response.data === "Transaction success") {
          toast.success("Transfer success!", {
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
          <h2 className={styles.heading2}>Internal Transfer</h2>
          <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                Transfer to
              </label>
              <input
                className="bg-white shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="tokenBalance"
                type="text"
                placeholder="Display name or wallet address"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                }}
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
              <Button handleClick={handleCreateDeposit} content={"Transfer"} />
            </div>
          </div>

          <ToastContainer stacked />
        </div>
      </section>
    </div>
  );
};

export default TransferItem;
