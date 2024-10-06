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
import PolyGlobe2 from "../components/PolyGlobe2";
import binance from "../assets/binance.png";
import ecosystem from "../assets/ecosystem.png";
import ecosystem1 from "../assets/ecosystem1.png";
import coinlogo from "../assets/coinlogo.png";
import allocation from "../assets/allocation.png";
import allocation1 from "../assets/allocation1.png";
import roadmap1 from "../assets/roadmap1.png";
import roadmap2 from "../assets/roadmap2.png";
import introducing from "../assets/introducing.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles

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

const LandingPage2 = () => {
  const [isOpen, toggle] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [rorateSpeed, setRotateSpeed] = useState(1.5);
  const [idx, setIdxMarker] = useState(0);

  function handleOpenModal(open, idxMarker) {
    if (open) {
      setAnimation(true);
      setRotateSpeed(0);
    } else {
      setAnimation(false);
      setRotateSpeed(2);
    }

    setIdxMarker(idxMarker);
    toggle(open);
  }

  const handleAnimation = () => {
    setAnimation((prev) => !prev);
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      {/* <div
        className={`${styles.paddingX} ${styles.flexCenterNav} w-full absolute z-10 navbar`}
      >
        <div className={`${styles.boxWidth}`}>
          <Navbar handleOpenModal={handleOpenModal} />
        </div>
      </div> */}
      <div className={`bg-primary ${styles.flexStart} test`}>
        <div className={`${styles.boxWidth}`}>
          {/* <Hero /> */}
          <PolyGlobe2
            handleOpenModal={handleOpenModal}
            handleAnimation={handleAnimation}
            animate={animation}
            rorateSpeed={rorateSpeed}
          />
        </div>
      </div>

      {/* <div className="footer">
        <Footer />
      </div> */}
    </div>
  );
};

export default LandingPage2;
