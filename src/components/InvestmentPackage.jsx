import Axios from "axios";
import { useState, useEffect } from "react";
import styles from "../style";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINT } from "../constants";

const InvestmentPackage = ({ packages = [], balance = 0 }) => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [listPackages, setListPackages] = useState([]);
  const [packagePrice, setPackagePrice] = useState("");
  const [packageReward, setPackageReward] = useState("");
  const [currentBalance, setCurrentBalance] = useState(balance);
  const [selectedPackageId, setSelectedPackageId] = useState("");

  const buyPackage = () => {
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

    if (selectedPackage.price > currentBalance) {
      toast.error("Balance not enough to buy this package!", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    let data = JSON.stringify({
      packageId: selectedPackageId,
      walletAddress: walletAddress,
    });

    let config = {
      method: "post",
      url: `${API_ENDPOINT}management/invest`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };

    Axios.request(config)
      .then((response) => {
        if (response.data === "ok") {
          toast.success("Invest success!", {
            position: "top-right",
            autoClose: 1500,
            onClose: () => window.location.reload(),
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

    // Add code to handle the purchase here
  };

  useEffect(() => {
    if (packages.length > 0) {
      setListPackages(packages);
      setCurrentBalance(balance);

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
        <h2 className={styles.heading2}>Investment package information</h2>
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
              htmlFor="tokenBalance"
            >
              Token balance
            </label>
            <input
              className="bg-white shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="tokenBalance"
              type="text"
              value={currentBalance}
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
