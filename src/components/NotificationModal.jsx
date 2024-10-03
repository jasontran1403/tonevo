import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); // Slight dark overlay for contrast
`;

const ModalContainer = styled(motion.div)`
  width: 60%;
  height: 50%;
  background: rgba(130, 130, 130, 0.2); // Transparent background for glass effect
  backdrop-filter: blur(10px); // Blur effect for glassmorphism
  box-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.1),           // Soft shadow for depth
    0 0 25px rgba(173, 216, 230, 0.7),       // Increase the glow radius and opacity
    0 0 50px rgba(173, 216, 230, 0.5);       // Additional glow for shininess
  position: absolute;
  top: 45%;
  left: 80%;
  transform: translate(-80%, -45%);
  border-radius: 40px;
  overflow: hidden; // Ensures the border animation stays within the container

  // The animated border effect
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #01a1b3; // 1px solid white border
    border-radius: inherit; // Match modal's border-radius
    box-sizing: border-box;
    animation: snake-border 4s linear infinite; // Animation running in a loop
    pointer-events: none; // Avoid interaction with the border
  }

  @media (max-width: 768px) {
    width: 80%; // Adjust width for mobile
    height: 65%; // Adjust height for mobile
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    border-radius: 8px; // Smaller border radius for mobile
  }

  // Keyframes for the snake-like border movement
  @keyframes snake-border {
    0% {
      clip-path: inset(0 100% 0 0); // Start from the top left
    }
    20% {
      clip-path: inset(0 0 100% 0); // Move along the top
    }
    50% {
      clip-path: inset(0 0 0 100%); // Move down the right side
    }
    80% {
      clip-path: inset(100% 0 0 0); // Move along the bottom
    }
    100% {
      clip-path: inset(0 100% 0 0); // Move up the left side and reset
    }
  }
`;

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};
const containerVariant = {
  initial: { top: "-50%", transition: { type: "spring" } },
  isOpen: { top: "50%", transition: { duration: 1 } }, // Set the duration to 1 second for showing
  exit: { top: "-50%", transition: { duration: 0.5 } }, // Optional: Adjust exit duration if needed
};

const NotificationModal = ({ children, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
        >
          <ModalContainer variants={containerVariant}>
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
