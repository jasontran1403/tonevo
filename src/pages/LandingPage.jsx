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
import binance from "../assets/binance.png";
import ecosystem from "../assets/ecosystem.png";
import coinlogo from "../assets/coinlogo.png";
import allocation from "../assets/allocation.png";

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
  const [idx, setIdxMarker] = useState(0);

  function handleOpenModal(open, idxMarker) {
    if (open) {
      setAnimation(true);
      setRotateSpeed(0);
    } else {
      setAnimation(false);
      setRotateSpeed(2);
    }

    console.log(idxMarker);

    setIdxMarker(idxMarker);
    toggle(open);
  }

  const handleAnimation = () => {
    setAnimation((prev) => !prev);
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenterNav} absolute z-10`}>
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
            {idx === 0 && <Modal isOpen={isOpen}>
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
                <div className="flex flex-1 w-full p-5 gap-5">
                  <img src={binance} />

                  <div className="flex flex-col flex-auto gap-5">
                    <p className="text-6xl font-extrabold subpixel-antialiased text-cyan-400">MAP CHAIN</p>
                    <p className="text-white">Game: Mapchain</p>
                    <p className="text-white">Game type: Tap to earn</p>
                    <p className="text-white">
                      Objective: Earn money by owning and mining locations on
                      the map
                    </p>
                    <p className="text-white">
                      Unique feature: The first profect to connect Coin mining
                      points to the real world
                    </p>
                  </div>
                </div>
              </ModalContent>
            </Modal>}
            {idx === 1 && <Modal isOpen={isOpen}>
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
                <div className="flex flex-1 w-full p-5 gap-5">
                  <div className="flex flex-col flex-auto gap-5 border border-white">
                    <p className="text-5xl font-extrabold subpixel-antialiased text-cyan-400">
                      How to play
                    </p>
                    <p className="text-white">Free to play</p>
                    <p className="text-white">
                      Mine MCT coins for free at locations owned by your friends
                    </p>
                    <p className="text-white">
                      Own mining locations to gain more advantages Buy mining
                      locations:
                    </p>
                    <p className="text-white">
                      o Use MCT coins to own mined locations
                    </p>
                    <p className="text-white">
                      o Locations are verified on the world map
                    </p>
                    <p className="text-white">
                      o Each mining location is unique (NFT)
                    </p>
                  </div>
                  <div className="flex flex-col flex-auto gap-5 border border-white">
                    <p className="text-5xl font-extrabold subpixel-antialiased text-cyan-400">
                      How to mine
                    </p>
                    <p className="text-white">
                      Tap on owned locations to receive MCT coins
                    </p>
                    <p className="text-white">
                      Tap multiple times to receive more MCT coins
                    </p>
                    <p className="text-white">
                      Mining locations are owned by players who purchased them
                    </p>
                    <p className="text-white">
                      Mining locations can be traded with other players
                    </p>
                    <p className="text-white">
                      The total number of mining locations is limited
                    </p>
                  </div>
                  <div className="flex flex-col flex-auto gap-5 border border-white">
                    <p className="text-5xl font-extrabold subpixel-antialiased text-cyan-400">
                    How to use
                    </p>
                    <p className="text-white">
                    Swap MCT to USDT:
                    </p>
                    <p className="text-white">
                      o MCT is accepted for trading on reputable exchanges
                    </p>
                    <p className="text-white">
                      o Sell MCT to convert to USDT
                    </p>
                    <p className="text-white">
                      o Use MCT to trade and own mining points
                    </p>
                    <p className="text-white">
                    Financial opportunities:
                    </p>
                    <p className="text-white">
                      o Participate in the digital financial market
                    </p>
                    <p className="text-white">
                      o Earn money from playing games and trading MCT
                    </p>
                    <p className="text-white">
                      o Lead a new Blockchain trend with unprecedented growth rate
                    </p>
                  </div>
                </div>
              </ModalContent>
            </Modal>}
            {idx === 2 && <Modal isOpen={isOpen}>
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
                <div className="flex flex-1 flex-col justify-center items-center w-full p-5 gap-5">
                  <div>
                    <img className="w-full h-full border rounded-2xl" src={ecosystem} alt="" />
                  </div>
                </div>
              </ModalContent>
            </Modal>}
            {idx === 3 && <Modal isOpen={isOpen}>
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
                <div className="flex flex-1 flex-col justify-center items-center w-full p-5 gap-5">
                  <p className="text-5xl font-extrabold subpixel-antialiased text-cyan-400">
                    How to use
                  </p>
                  <p className="text-white">Swap MCT to USDT:</p>
                  <p className="text-white">
                    o MCT is accepted for trading on reputable exchanges
                  </p>
                  <p className="text-white">o Sell MCT to convert to USDT</p>
                  <p className="text-white">
                    o Use MCT to trade and own mining points
                  </p>
                  <p className="text-white">Financial opportunities:</p>
                  <p className="text-white">
                    o Participate in the digital financial market
                  </p>
                  <p className="text-white">
                    o Earn money from playing games and trading MCT
                  </p>
                  <p className="text-white">
                    o Lead a new Blockchain trend with unprecedented growth rate
                  </p>
                </div>
              </ModalContent>
            </Modal>}
            {idx === 4 && <Modal isOpen={isOpen}>
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
                <div className="flex flex-1 flex-row justify-center items-center w-full p-5 gap-5">
                  <div className="flex flex-1 flex-col">
                    <p className="text-5xl font-extrabold subpixel-antialiased text-cyan-400">
                      Our Key Products
                    </p>
                    <p className="text-white">
                      o Interactive Games: Earn rewards and explore blockchain
                      through engaging experiences
                    </p>
                    <p className="text-white">
                      o Smart Wallet: Multi-platform, highly secure wallet for
                      digital asset storage and transactions
                    </p>
                    <p className="text-white">
                      o Private Blockchain: Optimized for scalability and
                      performance. Asset Staking: Invest and earn sustainable
                      returns from digital assets
                    </p>
                    <p className="text-white">
                      o Business Branding Platform: Enhance brand visibility
                      through a large user base
                    </p>
                    <p className="text-white">
                      o DeFi Trading: Fast, secure decentralized trading on
                      MAPCHAIN’s blockchain, focus on NFTs or other blockchain
                      Asset included cryptocurrencies
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col">
                    <p className="text-5xl font-extrabold subpixel-antialiased text-cyan-400">
                      User Experience
                    </p>
                    <p className="text-white">
                      For Players: The game product is built with the following
                      criteria:
                    </p>
                    <p className="text-white">
                      o Bridging blockchain technology with the real world, we
                      create a user-friendly experience that even those without
                      prior blockchain knowledge can easily access
                    </p>
                    <p className="text-white">
                      o Decentralized transparency, improving the user
                      experience for customers already familiar with blockchain
                    </p>
                    <p className="text-white">
                      For Investors: Ensuring transparent public profits and
                      facilitating digital currency transactions through
                      reputable global exchange partners, thereby enhancing the
                      reliability of financial investment products
                    </p>
                  </div>
                </div>
              </ModalContent>
            </Modal>}
            {idx === 5 && <Modal isOpen={isOpen}>
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
                <div className="flex flex-1 flex-col justify-center items-center w-full p-5 gap-5">
                  <div className="flex flex-1 flex-row">
                    <div className="flex flex-1 flex-col gap-2">
                      <p className="text-5xl font-extrabold subpixel-antialiased text-cyan-400">
                        TOKEN MCT
                      </p>
                      <p className="text-white pl-6">Blockchain: TON</p>
                      <p className="text-white pl-6">
                        Algorithm: BPOS (Block-Proof of Stake)
                      </p>
                      <p className="text-white pl-6">Technology:</p>
                      <p className="text-white pl-6">
                        o Sharding for enhanced processing speed
                      </p>
                      <p className="text-white pl-6">
                        o High scalability for optimal performance
                      </p>
                      <p className="text-white pl-6">
                        o TON Cross-chain Bridge connecting BNB Chain
                      </p>
                    </div>
                    <div className="flex flex-1">
                      <img src={coinlogo} alt="" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col">
                  <img className="w-96 h-72 rounded-2xl" src={allocation} alt="" />
                  </div>
                </div>
              </ModalContent>
            </Modal>}
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
