import React, { useState } from "react";
import styles from "../style";
import {
  Billing,
  Business,
  CardDeal,
  Clients,
  CTA,
  Footer,
  Navbar,
  Stats,
  Testimonials,
  Hero,
} from "../components";
import Modal from "../components/Modal";
import styled from "styled-components";
import PolyGlobe from "../components/PolyGlobe";

const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #5c3aff;
  }
`;

const CloseButton = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
`;

const LandingPage = () => {
  const [isOpen, toggle] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [rorateSpeed, setRotateSpeed] = useState(2);

  function handleOpenModal(open) {
    if (open) {
      setAnimation(true);
      setRotateSpeed(0);
    } else {
      setAnimation(false);
      setRotateSpeed(2);
    }
    
    toggle(open);
  }

  const handleAnimation = () => {
    setAnimation((prev) => !prev);
  }
  
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenterNav}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          {/* <Hero /> */}
          <PolyGlobe
            handleOpenModal={handleOpenModal}
            handleAnimation={handleAnimation}
            animate={animation}
            rorateSpeed={rorateSpeed}
          />
          <div className="modal-container">
            <Modal isOpen={isOpen}>
              <ModalContent>
                <CloseButton
                  onClick={(e) => handleOpenModal(false)}
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
                <h1>Awesome modal</h1>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>

      {/* <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Business />
          <Billing />
          <CardDeal />
          <Testimonials />
          <Clients />
          <CTA />
          <Footer />
        </div>
      </div> */}
    </div>
  );
};

export default LandingPage;
