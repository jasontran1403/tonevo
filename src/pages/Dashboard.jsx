import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../style";
import styled from "styled-components";
import promotion from "../assets/promotion.jpg";
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
    width: window.innerWidth < 768 ? "100svw" : "70svw", // Dynamic width based on screen size
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
  const [publicKey, setPublicKey] = useState(sessionStorage.getItem("publicKey"));
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
    if (sessionStorage.getItem("walletAddress") === "0:49847e3d9f5b8986565025d52b30c939d5610771a489952ebb89d148587b7ea2") {
      setSpecialNoti(true);
    }
    setNotificationModalOpen(false); // Close the notification and continue logic
  };

  const closeSpecialNotificationModal = () => {
    setSpecialNoti(false);; // Close the notification and continue logic
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

      {specialNoti && <Modal
        isOpen={specialNoti}
        onRequestClose={closeSpecialNotificationModal}
        style={customStyles}
        contentLabel="Announcement"
      >
        <div
          onClick={closeSpecialNotificationModal}
          style={{
            height: "100%", // Ensure the container takes full height of the modal
            width: "100%",
            display: "flex",
            justifyContent: "center", // Center the image horizontally
            alignItems: "center", // Center the image vertically
            cursor: "pointer",
            padding: "20px",
          }}
        >
          <div style={{
            height: "100%", // Ensure the container takes full height of the modal
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start", // Center the image horizontally
            alignItems: "flex-start", // Center the image vertically
            padding: "10px",
            backgroundColor: "transparent"
          }}>
            <h2>Dear user Phucnguyen2,</h2>
            <p>We have recorded a deposit of 344.96 from you. However, due to a blockchain signal error on your side, we have recorded the balance as three times the normal amount.</p>

            <p>Currently, we have removed the excess balance. However, you have already executed an investment package of 3000 MCT, which has generated commission payments for the system.</p>

            <p>Therefore, we request that you deposit the missing MCT amount or the equivalent in USDT.</p>

            <p>Details below :</p>
            <p>Deposit of $344.96 swapped to 1971.2 MCT (correct).</p>
            <p>You participated with 1000 MCT</p>
            <p>You participated with 3000 MCT (missing 3000 - 971.2 = 2028.8 MCT).</p>

            <p>You need to supplement 2028.8 MCT, which is approximately $355.04 (at the current rate of 1 MCT = 0.175 USDT).</p>

            <p>While we process this, we will temporarily suspend certain features of your account to ensure the safety of the system.</p>

            <p>Best Regards,</p>
            <h2>Mapchain Team</h2>
          </div>
        </div>
      </Modal>}

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
    </div>
  );
};

export default Dashboard;
