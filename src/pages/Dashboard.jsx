import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../style";
import styled from "styled-components";
import promotion from "../assets/promotion.jpg";
import { MainDashboard, UserNavbar } from "../components";
import { API_ENDPOINT } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import Form from "../components/Form";
import LockModal from "../components/LockModal";
import Chatbox from "../components/Chatbox";

const CloseButton = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: window.innerWidth < 768 ? "95svw" : "70svw", // Dynamic width based on screen size
    height: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "0px!important",
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState(
    sessionStorage.getItem("walletAddress")
  );
  const [publicKey, setPublicKey] = useState(
    sessionStorage.getItem("publicKey")
  );
  const [walletStateInit, setWalletStateInit] = useState(
    sessionStorage.getItem("walletStateInit")
  );
  const [isOpen, toggle] = useState(false);
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("access_token")
  );
  const [notificationModalOpen, setNotificationModalOpen] = useState(true); // Notification modal state

  const [isInTree] = useState(sessionStorage.getItem("is_in_tree"));
  const [isLock] = useState(sessionStorage.getItem("is_lock"));

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalLock, setModalLock] = useState(false);
  const [specialNoti, setSpecialNoti] = useState(false);

  function handleOpenModal(open) {
    closeLockModal();
  }

  useEffect(() => {
    if (notificationModalOpen) {
      // Only proceed when notification is closed
      if (isInTree === "true") {
        setIsOpen(false);
      } else if (isInTree === "false") {
        setIsOpen(true);
      }

      if (isLock === "true") {
        setModalLock(true);
      } else if (isLock === "false") {
        setModalLock(false);
      }
    }
  }, [notificationModalOpen, isInTree, isLock]); // Trigger when notification modal closes

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeLockModal = () => {
    setModalLock(false);
  };

  // Determine if the screen is small or large
  const isSmallScreen = window.innerWidth <= 768;

  const closeNotificationModal = () => {
    if (
      sessionStorage.getItem("walletAddress") ===
      "0:49847e3d9f5b8986565025d52b30c939d5610771a489952ebb89d148587b7ea2"
    ) {
      setSpecialNoti(true);
    }
    if (isWalletSet === true) {
      setFormSet(true);
    }
    setNotificationModalOpen(false); // Close the notification and continue logic
  };

  const closeSpecialNotificationModal = () => {
    setSpecialNoti(false); // Close the notification and continue logic
  };

  const [isWalletSet, setWalletSet] = useState(false);
  const [formSet, setFormSet] = useState(false);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/get-wallet-withdraw/${sessionStorage.getItem(
        "walletAddress"
      )}/2`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        if (response.data?.length == 0) {
          setWalletSet(true);
        }
      })
      .catch((error) => {
        toast.error("Please try again later", {
          position: "top-right",
          autoClose: 1500,
        });
      });
  }, []);

  const closeWalletForm = () => {
    setFormSet(false);
  };

  const [bepWallet, setBepWallet] = useState("");
  const [tonWallet, setTonWallet] = useState("");

  const handleVerifyWallet = () => {
    if (bepWallet === "" || tonWallet === "") {
      toast.error("All input field must be filled.", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    let data = JSON.stringify({
      walletAddress: sessionStorage.getItem("walletAddress"),
      bepWallet: bepWallet,
      tonWallet: tonWallet,
    });

    let config = {
      method: "post",
      url: `${API_ENDPOINT}management/update-wallet`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
      data: data,
    };

    Axios
      .request(config)
      .then((response) => {
        if (response.data === "ok") {
          toast.success("Verify wallet for withdraw order successful!", {
            position: "top-right",
            autoClose: 1500,
            onClose: () => window.location.reload(),
          });
        } else {
          toast.error(response.data, {
            position: "top-right",
            autoClose: 3000
          });
        }
      })
      .catch((error) => {
        toast.error("Please try again later!", {
          position: "top-right",
          autoClose: 3000
        });
      });
  };

  return (
    <div className="bg-primary w-full h-full">
      <div className={`${styles.paddingX} ${styles.flexCenterNav}`}>
        <div className={`${styles.boxWidthDashboard}`}>
          <UserNavbar />
        </div>
      </div>

      {/* Notification Modal 
      <Modal
        isOpen={notificationModalOpen}
        onRequestClose={closeNotificationModal}
        style={customStyles}
        contentLabel="Announcement"
      >
        <div
          onClick={closeNotificationModal}
          style={{
            height: "100%", // Ensure the container takes full height of the modal
            width: "100%",
            display: "flex",
            justifyContent: "center", // Center the image horizontally
            alignItems: "center", // Center the image vertically
            cursor: "pointer",
          }}
        >
          <img
            src={promotion}
            style={{
              maxHeight: "100%", // Ensure the image doesn't overflow vertically
              maxWidth: "100%", // Ensure the image doesn't overflow horizontally
              objectFit: "contain", // Ensure the image scales while maintaining aspect ratio
            }}
            alt="Promotion"
          />
        </div>
      </Modal>
      */}

      <Modal
        isOpen={formSet}
        style={customStyles}
        contentLabel="Wallet Verify Form"
      >
        <div
          style={{
            height: "auto", // Ensure the container takes full height of the modal
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Center the image horizontally
            alignItems: "center", // Center the image vertically
            cursor: "pointer",
            padding: "30px",
            gap: "20px",
            backgroundColor: "#1f2937"
          }}
        >
          <input
            type="text"
            value={bepWallet}
            placeholder="Enter USDT BEP20 wallet ..."
            onChange={(e) => {
              setBepWallet(e.target.value);
            }}
            className="bg-white rounded shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            placeholder="Enter TON wallet ..."
            value={tonWallet}
            onChange={(e) => {
              setTonWallet(e.target.value);
            }}
            className="bg-white rounded shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="form flex justify-center items-center pt-[20px] gap-[20px]">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeWalletForm}>
              Cancel
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleVerifyWallet}>
              Verify Wallet
            </button>
          </div>
        </div>
      </Modal>

      {/* Lock Modal */}
      {isLock === "true" ? (
        <LockModal
          isOpen={modalLock}
          onRequestClose={closeLockModal}
          contentLabel="Account lock"
        >
          <CloseButton
            onClick={(e) => handleOpenModal(false)}
            style={{ zIndex: "9999" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20.39 20.39"
          >
            <title>X</title>
            <line
              x1="19.39"
              y1="19.39"
              x2="1"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <line
              x1="1"
              y1="19.39"
              x2="19.39"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </CloseButton>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%", // Ensure the content takes the full height of the modal
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: isSmallScreen ? "30px" : "40px", // Adjust line height based on screen size
                color: "orangered",
              }}
            >
              Your account is temporarily locked due to abusing a vulnerability
              for profit, please check your email for further details
              information about this situation.
            </p>
          </div>
        </LockModal>
      ) : isInTree === "true" ? (
        <div className={`bg-primary ${styles.flexStart} bg-image`}>
          <MainDashboard />
        </div>
      ) : (
        <div className={`bg-primary ${styles.flexStart} bg-image`}>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Update sponsor"
          >
            <Form />
          </Modal>
        </div>
      )}

      <Chatbox />
    </div>
  );
};

export default Dashboard;
