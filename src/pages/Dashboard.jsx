import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../style";
import styled from "styled-components";

import { MainDashboard, UserNavbar } from "../components";
import Form from "../components/Form";
import LockModal from "../components/LockModal";

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
    width: "70%", // Default width for larger screens
    maxWidth: "800px",
    height: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "2rem",
  },
  overlay: {
    zIndex: 1000, // Ensure it stays on top
    backgroundColor: "rgba(0, 0, 0, 0.75)", // Dark background for better focus
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
  const [isOpen, toggle] = useState(false);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [notificationModalOpen, setNotificationModalOpen] = useState(true); // Notification modal state

  const [isInTree] = useState(localStorage.getItem("is_in_tree"));
  const [isLock] = useState(localStorage.getItem("is_lock"));

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalLock, setModalLock] = useState(false);

  function handleOpenModal(open) {
    closeLockModal();
  }

  useEffect(() => {
    if (!notificationModalOpen) {
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
    setNotificationModalOpen(false); // Close the notification and continue logic
  };

  return (
    <div className="bg-primary w-full h-full">
      <div className={`${styles.paddingX} ${styles.flexCenterNav}`}>
        <div className={`${styles.boxWidthDashboard}`}>
          <UserNavbar />
        </div>
      </div>

      {/* Notification Modal */}
      <Modal
        isOpen={notificationModalOpen}
        onRequestClose={closeNotificationModal}
        style={customStyles}
        contentLabel="Announcement"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: isSmallScreen ? "18px" : "30px", // Adjust font size based on screen size
            justifyContent: "center",
            gap: "10px",
            alignItems: "flex-start", // Align items to the left
            padding: "5%",
            lineHeight: isSmallScreen ? "20px" : "50px", // Adjust line height based on screen size
            height: "100%", // Ensure the content takes the full height of the modal
          }}
        >
          <h2>Announcement</h2>
          <p>
            We would like to inform you that the system is currently undergoing
            updates to complete the Deposit - Withdrawal - Swap MCT functions.
            The estimated time to complete this process is by 23:00 UTC on
            October 4rd, 2024. During this time, all other features on the
            platform will remain fully operational. We appreciate your patience
            and continued support!
          </p>
          <p>Best regards,</p>
          <p>
            <strong>The MapChain Development Team</strong>
          </p>
          <button
            onClick={closeNotificationModal}
            style={{
              marginTop: "20px",
              padding: "10px 20px", // Adjust padding for top-bottom and left-right
              backgroundColor: "#01a1b3", // Background color
              color: "#ffffff", // Text color
              border: "none", // No border
              borderRadius: "5px", // Rounded corners
              fontSize: "18px", // Font size
              cursor: "pointer", // Pointer cursor on hover
              transition: "background-color 0.3s ease", // Smooth transition for hover effect
              textAlign: "center", // Center text in the button
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#018b9c")
            } // Darker on hover
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#01a1b3")
            } // Original color when not hovered
          >
            Close
          </button>
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
              for profit, please check your email for further details information about this situation.
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
    </div>
  );
};

export default Dashboard;
