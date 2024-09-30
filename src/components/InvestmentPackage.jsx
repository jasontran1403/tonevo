import Axios from "axios";
import { useState, useEffect } from "react";
import styles from "../style";
import Button from "./Button";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINT } from "../constants";

const InvestmentPackage = ({ packages = [], balance = 0 }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [mapchain, setMapchain] = useState(0);
  const [transfer, setTransfer] = useState(0);

  const [listBalance, setListBalance] = useState([]);
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
        setMapchain(response.data.balances[1].balance);
        setTransfer(response.data.balances[6].balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [listPackages, setListPackages] = useState([]);
  const [packagePrice, setPackagePrice] = useState("");
  const [packageReward, setPackageReward] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [walletType, setWalletType] = useState(1);

  const buyPackage = () => {
    if (buttonDisabled) return;
    if (selectedPackageId === "" || !listPackages.length) return;

    const selectedPackage = listPackages.find(
      (pkg) => pkg.id === parseInt(selectedPackageId)
    );
    if (!selectedPackage) {
      toast.error("Package not found!", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    Swal.fire({
      title: "Confirm cancel deposit",
      text: `Are you sure you want to cancel?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, transfer it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "custom-confirm-button", // Custom class for confirm button
        cancelButton: "custom-cancel-button", // Custom class for cancel button
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setButtonDisabled(true);
        let data = JSON.stringify({
          packageId: selectedPackageId,
          walletAddress: walletAddress,
          type: walletType,
        });

        let config = {
          method: "post",
          url: `${API_ENDPOINT}management/invest`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "ngrok-skip-browser-warning": "69420",
          },
          data: data,
        };

        Axios.request(config)
          .then((response) => {
            if (response.data === "ok") {
              setButtonDisabled(true);
              toast.success("Invest success!", {
                position: "top-right",
                autoClose: 1500,
                onClose: () => window.location.reload(),
              });
            } else {
              setButtonDisabled(false);
              toast.error(response.data, {
                position: "top-right",
                autoClose: 1500,
              });
            }
          })
          .catch((error) => {
            setButtonDisabled(false);
            console.log(error);
          });
      }
    });

    // Add code to handle the purchase here
  };

  useEffect(() => {
    if (packages.length > 0) {
      setListPackages(packages);

      const firstPackage = packages[0];
      if (firstPackage) {
        setSelectedPackageId(firstPackage.id.toString());
        setPackagePrice(firstPackage.price);
        setPackageReward(`${firstPackage.daily}%`);
      }
    }
  }, [packages, balance]);

  const handleSelectPackage = (packageId) => {
    const selectedPackage = listPackages.find(
      (pkg) => pkg.id === parseInt(packageId)
    );
    if (selectedPackage) {
      setSelectedPackageId(packageId);
      setPackagePrice(selectedPackage.price);
      setPackageReward(`${selectedPackage.daily}%`);
    }
  };

  return (
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} investment-card sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
    >
      <div className="flex-1 flex flex-col">
        <h4 className={styles.heading4}>Investment package information</h4>
        <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="packageName"
            >
              Package name
            </label>
            <select
              className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="packageName"
              value={selectedPackageId}
              onChange={(e) => handleSelectPackage(e.target.value)}
            >
              {listPackages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Package price
            </label>
            <input
              className="bg-white shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              readOnly
              value={packagePrice}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Daily reward
            </label>
            <input
              className="bg-white shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="text"
              value={packageReward}
              readOnly
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="balance"
            >
              Mapchain Balance
            </label>
            <input
              className="bg-white shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="balance"
              type="text"
              value={mapchain}
              readOnly
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="transfer"
            >
              Transfer Balance
            </label>
            <input
              className="bg-white shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="transfer"
              type="text"
              value={transfer}
              readOnly
            />
          </div>
          <div className="flex items-center justify-between">
            <Button handleClick={buyPackage} content={"Buy"} />
          </div>
        </div>

        <ToastContainer stacked />
      </div>
    </section>
  );
};

export default InvestmentPackage;
