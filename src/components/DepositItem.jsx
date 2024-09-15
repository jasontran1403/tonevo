import Axios from "axios";
import { useState } from "react";
import styles from "../style";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DepositItem = ({ depositHistory }) => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [networkSelected, setNetworkSelected] = useState("");

  const [listNetwork, setListNetwork] = useState([
    { id: 1, name: "USDT BEP20" },
    { id: 2, name: "Mapchain Token" },
  ]);

  const [amount, setAmount] = useState(0);
  const [qrImage, setQrImage] = useState("");

  const handleSelectPackage = (packageId) => {
    const selectedPackage = listPackages.find(
      (pkg) => pkg.id === parseInt(packageId)
    );
    if (selectedPackage) {
      setNetworkSelected(packageId);
    }
  };

  const handleCreateDeposit = () => {
    if (amount <= 0) {
      return;
    }
    let data = JSON.stringify({
      walletAddress: walletAddress,
      amount: amount,
      method: 0,
    });

    let config = {
      method: "post",
      url: "http://localhost:8080/api/v1/management/generate-qr",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
      responseType: "blob",
    };

    Axios.request(config)
      .then((response) => {
        // Assuming response.data contains the image URL or base64 string
        const qrCodeBlob = response.data;
        const qrCodeUrl = URL.createObjectURL(qrCodeBlob);
        setQrImage(qrCodeUrl);
        toast.success("Created deposit order!", {
          position: "top-right",
          autoClose: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelDeposit = () => {
    let data = JSON.stringify({
      walletAddress: walletAddress,
      amount: 0,
      method: 0,
    });

    let config = {
      method: "post",
      url: "http://localhost:8080/api/v1/management/cancel-deposit",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };

    Axios.request(config)
      .then((response) => {
        if (response.data === "ok") {
          setQrImage("");
          toast.success("Canceled deposit order!", {
            position: "top-right",
            autoClose: 1500,
            onClose: () => window.location.reload(),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                value={networkSelected}
                onChange={(e) => setNetworkSelected(e.target.value)}
              >
                {listNetwork.map((network) => (
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
                Amount
              </label>
              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="tokenBalance"
                type="text" // Use "text" to fully control input validation
                value={amount}
                min="0.1"
                onChange={(e) => {
                  const value = e.target.value;

                  // Regex to allow only numbers and decimals
                  const regex = /^[0-9]*\.?[0-9]*$/;

                  // Check if the input value matches the regex (valid number format)
                  if (regex.test(value)) {
                    const numericValue = parseFloat(value);
                    if (!isNaN(numericValue) && numericValue > 0) {
                      setAmount(value); // Keep the valid input
                    } else {
                      setAmount(""); // Reset if invalid
                    }
                  }
                }}
              />
            </div>

            <div className="mb-6">
              {qrImage && (
                <img
                  src={qrImage}
                  alt="QR Code"
                  className="w-[400px] h-auto" // Adjust styling as needed
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              {qrImage.length === 0 ? (
                <Button handleClick={handleCreateDeposit} content={"Deposit"} />
              ) : (
                <Button handleClick={handleCancelDeposit} content={"Cancel"} />
              )}
            </div>
          </div>

          <ToastContainer stacked />
        </div>
      </section>
    </div>
  );
};

export default DepositItem;
