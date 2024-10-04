import React, { useState, useEffect } from "react";
import Axios from "axios";
import styles from "../style";
import { SwapCard, Footer, UserNavbar } from "../components";
import Modal from "react-modal";
import styled from "styled-components";
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

const Swap = () => {
  const isSmallScreen = window.innerWidth <= 768;

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
  const [notificationModalOpen, setNotificationModalOpen] = useState(true); // Notification modal state
  const [modalIsOpen, setIsOpen] = useState();
  const [isLock] = useState(localStorage.getItem("is_lock"));
  const [modalLock, setModalLock] = useState(false);

  const closeNotificationModal = () => {
    setNotificationModalOpen(false); // Close the notification and continue logic
    window.location.href = "/dashboard";
  };
  useEffect(() => {
    // Only proceed when notification is closed
    if (isInTree === "true") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

    if (isLock === "true") {
      setModalLock(true);
    } else {
      setModalLock(false);
    }
  }, [isInTree, isLock]); // Trigger when notification modal closes

  const closeLockModal = () => {
    setModalLock(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function handleOpenModal(open) {
    closeLockModal();
  }
  return (
    <div className="bg-primary w-full h-full">
      <div className={`${styles.paddingX} ${styles.flexCenterNav}`}>
        <div className={`${styles.boxWidth}`}>
          <UserNavbar />
        </div>
      </div>

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
            This function will be reactivated soon. Expected time: 19:00 UTC on
            October 5, 2024
          </p>
          <p>Sincerely,</p>
          <p>
            <strong>The Mapchain Team</strong>
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
      ) : (
        <></>
      )}
      {/* <div className={`bg-primary ${styles.flexStart} bg-image`}>
        <div className={`${styles.boxWidthDashboard}`}>
          {isInTree === "true" ? (
            <>
              <SwapCard />
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
      </div> */}
    </div>
  );
};

export default Swap;
