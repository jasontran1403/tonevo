import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../style";
import { MainDashboard, UserNavbar } from "../components";
import Form from "../components/Form";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    minWidth: "50svw",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [publicKey, setPublicKey] = useState(localStorage.getItem("publicKey"));
  const [walletStateInit, setWalletStateInit] = useState(
    localStorage.getItem("walletStateInit")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [isInTree] = useState(localStorage.getItem("is_in_tree"));
  const [modalIsOpen, setIsOpen] = useState();

  useEffect(() => {
    if (isInTree === "true") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    
  }

  return (
    <div className="bg-primary w-full h-full">
      <div className={`${styles.paddingX} ${styles.flexCenterNav}`}>
        <div className={`${styles.boxWidthDashboard}`}>
          <UserNavbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart} bg-image` }>
          {isInTree === "true" ? (
            <>
              <MainDashboard />
            </>
          ) : (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Update sponsor"
            >
              <Form />
            </Modal>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
