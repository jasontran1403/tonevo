import React, { useState, useEffect } from "react";
import Axios from "axios";
import styles from "../style";
import { WithdrawCard, Footer, UserNavbar } from "../components";
import Modal from "react-modal";
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

const Withdraw = () => {
  const isSmallScreen = window.innerWidth <= 768;

  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [publicKey, setPublicKey] = useState(localStorage.getItem("publicKey"));
  const [walletStateInit, setWalletStateInit] = useState(
    localStorage.getItem("walletStateInit")
  );
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
  const [isInTree, setIsInTree] = useState(localStorage.getItem("is_in_tree"));
  const [notificationModalOpen, setNotificationModalOpen] = useState(true); // Notification modal state

  const closeNotificationModal = () => {
    setNotificationModalOpen(false); // Close the notification and continue logic
    window.location.href = "/dashboard";
  };
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

      {/* <div className={`bg-primary ${styles.flexStart} bg-image`}>
        <div className={`${styles.boxWidthDashboard}`}>
          {isInTree === "true" ? (
            <>
              <WithdrawCard />
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

export default Withdraw;
