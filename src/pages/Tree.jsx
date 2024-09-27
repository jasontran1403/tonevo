import React, { useState, useEffect } from "react";
import styles from "../style";
import { TreeVisualize, UserNavbar } from "../components";
import Form from "../components/Form";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    minWidth: "20svw",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Tree = () => {
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
  const [isInTree, setIsInTree] = useState(localStorage.getItem("is_in_tree"));
  const [modalIsOpen, setIsOpen] = useState();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isInTree === "true") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  return (
    <div className="bg-primary w-full h-full">
      <div className={`${styles.paddingX} ${styles.flexCenterNav}`}>
        <div className={`${styles.boxWidthDashboard}`}>
          <UserNavbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart} bg-image`} >
        <div className={`${styles.boxWidthDashboard}`} style={{ overflowY: "scroll" }}>
          {isInTree === "true" ? (
            <TreeVisualize />
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
    </div>
  );
};

export default Tree;
