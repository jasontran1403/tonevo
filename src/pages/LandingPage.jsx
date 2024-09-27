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

    setIdxMarker(idxMarker);
    toggle(open);
  }

  const handleAnimation = () => {
    setAnimation((prev) => !prev);
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div
        className={`${styles.paddingX} ${styles.flexCenterNav} w-full absolute z-10 navbar`}
      >
        <div className={`${styles.boxWidth}`}>
          <Navbar handleOpenModal={handleOpenModal} />
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
            {idx === 0 && (
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
                  <div className="flex flex-1 w-full p-12 sm:p-[100px] gap-6">
                    <img
                      src={introducing}
                      className="w-72 h-72 rounded-full introducing hidden sm:block"
                    />

                    <div className="flex flex-col w-full flex-auto gap-5">
                      <p className="text-4xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                        MAP CHAIN
                      </p>
                      <p className="text-white">Game: Mapchain</p>
                      <p className="text-white">Game type: Tap to earn</p>
                      <p className="text-white">
                        Objective: Earn money by owning and mining locations on
                        the map
                      </p>
                      <p className="text-white">
                        Unique feature: The first project to connect Coin mining
                        points to the real world
                      </p>
                    </div>
                  </div>
                </ModalContent>
              </Modal>
            )}
            {idx === 1 && (
              <Modal isOpen={isOpen}>
                <ModalContent>
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
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                  >
                    <SwiperSlide>
                      <div className="flex flex-col flex-auto h-full sm:p-[200px] pt-[20px] pl-[20px] pr-[20px] sm:gap-5 gap-5">
                        <p className="text-5xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                          How to play
                        </p>
                        <p className="text-white pl-8">Free to play</p>
                        <p className="text-white pl-8">
                          Mine MCT coins for free at locations owned by your
                          friends
                        </p>
                        <p className="text-white pl-8">
                          Own mining locations to gain more advantages. Buy
                          mining locations:
                        </p>
                        <p className="text-white pl-16">
                          o Use MCT coins to own mined locations
                        </p>
                        <p className="text-white pl-16">
                          o Locations are verified on the world map
                        </p>
                        <p className="text-white pl-16">
                          o Each mining location is unique (NFT)
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="flex flex-col flex-auto h-full sm:p-[200px] sm:gap-5 pt-[80px] pl-[10px] pr-[10px] gap-3">
                        <p className="text-5xl font-extrabold subpixel-antialiased text-cyan-400">
                          How to mine
                        </p>
                        <p className="text-white pl-8">
                          Tap on owned locations to receive MCT coins
                        </p>
                        <p className="text-white pl-8">
                          Tap multiple times to receive more MCT coins
                        </p>
                        <p className="text-white pl-8">
                          Mining locations are owned by players who purchased
                          them
                        </p>
                        <p className="text-white pl-8">
                          Mining locations can be traded with other players
                        </p>
                        <p className="text-white pl-8">
                          The total number of mining locations is limited
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="flex flex-col flex-auto h-full sm:p-[150px] sm:gap-5 pt-[20px] pl-[10px] pr-[10px] gap-3">
                        <p className="text-5xl font-extrabold subpixel-antialiased text-cyan-400">
                          How to use
                        </p>
                        <p className="text-white pl-8">Swap MCT to USDT:</p>
                        <p className="text-white pl-16">
                          o MCT is accepted for trading on reputable exchanges
                        </p>
                        <p className="text-white pl-16">
                          o Sell MCT to convert to USDT
                        </p>
                        <p className="text-white pl-16">
                          o Use MCT to trade and own mining points
                        </p>
                        <p className="text-white pl-8">
                          Financial opportunities:
                        </p>
                        <p className="text-white pl-16">
                          o Participate in the digital financial market
                        </p>
                        <p className="text-white pl-16">
                          o Earn money from playing games and trading MCT
                        </p>
                        <p className="text-white pl-16">
                          o Lead a new Blockchain trend with unprecedented
                          growth rate
                        </p>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </ModalContent>
              </Modal>
            )}
            {idx === 2 && (
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
                  <div className="flex flex-1 flex-col justify-center items-center w-full p-5 gap-5">
                    <div className="block sm:hidden">
                      <img className="w-full h-full" src={ecosystem1} alt="" />
                    </div>
                    <div className="hidden sm:block">
                      <img className="w-full h-full" src={ecosystem} alt="" />
                    </div>
                  </div>
                </ModalContent>
              </Modal>
            )}
            {idx === 3 && (
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
                  <div className="flex flex-1 flex-col w-full sm:p-[100px] sm:gap-5 pt-[10px] pl-[10px] pr-[10px] gap-3">
                    <p className="text-4xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                      Our Key Products
                    </p>
                    <p className="text-white sm:pl-8 pl-2">
                      o Interactive Games: Earn rewards and explore blockchain
                      through engaging experiences
                    </p>
                    <p className="text-white sm:pl-8 pl-2">
                      o Smart Wallet: Multi-platform, highly secure wallet for
                      digital asset storage and transactions
                    </p>
                    <p className="text-white sm:pl-8 pl-2">
                      o Private Blockchain: Optimized for scalability and
                      performance
                    </p>
                    <p className="text-white sm:pl-8 pl-2">
                      o Asset Staking: Invest and earn sustainable returns from
                      digital assets
                    </p>
                    <p className="text-white sm:pl-8 pl-2">
                      o Business Branding Platform: Enhance brand visibility
                      through a large user base
                    </p>
                    <p className="text-white sm:pl-8 pl-2">
                      o DeFi Trading: Fast, secure decentralized trading on
                      MAPCHAIN’s blockchain, focus on NFTs or other blockchain
                      Asset included cryptocurrencies
                    </p>
                  </div>
                </ModalContent>
              </Modal>
            )}
            {idx === 4 && (
              <Modal isOpen={isOpen}>
                <ModalContent>
                  <CloseButton
                    style={{ zIndex: "9999" }}
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
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    style={{ height: "calc(100vh - 100px)" }} // Adjust height if needed
                  >
                    {/* <SwiperSlide>
                      <div className="flex flex-1 flex-col w-full sm:gap-5 sm:p-[100px] sm:pt-[250px] gap-3 pt-[150px] pl-[10px] pr-[10px]">
                        <p className="text-4xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                          Our Key Products
                        </p>
                        <p className="text-white sm:pl-16 pl-8">
                          o Interactive Games: Earn rewards and explore
                          blockchain through engaging experiences
                        </p>
                        <p className="text-white sm:pl-16 pl-8">
                          o Smart Wallet: Multi-platform, highly secure wallet
                          for digital asset storage and transactions
                        </p>
                        <p className="text-white sm:pl-16 pl-8">
                          o Private Blockchain: Optimized for scalability and
                          performance. Asset Staking: Invest and earn
                          sustainable returns from digital assets
                        </p>
                        <p className="text-white sm:pl-16 pl-8">
                          o Business Branding Platform: Enhance brand visibility
                          through a large user base
                        </p>
                        <p className="text-white sm:pl-16 pl-8">
                          o DeFi Trading: Fast, secure decentralized trading on
                          MAPCHAIN’s blockchain, focus on NFTs or other
                          blockchain Asset included cryptocurrencies
                        </p>
                      </div>
                    </SwiperSlide> */}
                    <SwiperSlide>
                      <div className="flex flex-1 flex-col  w-full sm:gap-5 sm:p-[100px] sm:pt-[250px] gap-3 pt-[140px] pl-[10px] pr-[10px]">
                        <p className="text-4xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                          User Experience
                        </p>
                        <p className="text-white sm:pl-8 pl-4">
                          For Players: The game product is built with the
                          following criteria:
                        </p>
                        <p className="text-white sm:pl-16 pl-8">
                          o Bridging blockchain technology with the real world,
                          we create a user-friendly experience that even those
                          without prior blockchain knowledge can easily access
                        </p>
                        <p className="text-white sm:pl-16 pl-8">
                          o Decentralized transparency, improving the user
                          experience for customers already familiar with
                          blockchain
                        </p>
                        <p className="text-white sm:pl-16 pl-8">
                          For Investors: Ensuring transparent public profits and
                          facilitating digital currency transactions through
                          reputable global exchange partners, thereby enhancing
                          the reliability of financial investment products
                        </p>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </ModalContent>
              </Modal>
            )}
            {idx === 5 && (
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
                  <div className="hidden sm:block flex flex-1 flex-col justify-center items-center w-full p-[100px] gap-5">
                    <div className="flex flex-1 flex-row">
                      <div className="flex flex-1 flex-col gap-2">
                        <p className="text-5xl font-extrabold subpixel-antialiased text-cyan-400">
                          TOKEN MCT
                        </p>
                        <p className="text-white pl-8">Blockchain: TON</p>
                        <p className="text-white pl-8">
                          Algorithm: BPOS (Block-Proof of Stake)
                        </p>
                        <p className="text-white pl-8">Technology:</p>
                        <p className="text-white sm:pl-16 pl-8">
                          o Sharding for enhanced processing speed
                        </p>
                        <p className="text-white pl-16">
                          o High scalability for optimal performance
                        </p>
                        <p className="text-white pl-16">
                          o TON Cross-chain Bridge connecting BNB Chain
                        </p>
                      </div>
                      <div className="flex flex-1">
                        <img src={allocation} alt="" />
                      </div>
                    </div>
                  </div>
                  <Swiper
                    className="block sm:hidden"
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    style={{ height: "calc(100vh - 100px)" }} // Adjust height if needed
                  >
                    <SwiperSlide>
                      <div className="flex flex-1 flex-row pt-[200px] pl-[20px] pr-[20px]">
                        <div className="flex flex-1 flex-col gap-3">
                          <p className="text-4xl sm:text-2xl font-extrabold subpixel-antialiased text-cyan-400">
                            TOKEN MCT
                          </p>
                          <p className="text-white sm:pl-8 pl-4">
                            Blockchain: TON
                          </p>
                          <p className="text-white sm:pl-8 pl-4">
                            Algorithm: BPOS (Block-Proof of Stake)
                          </p>
                          <p className="text-white sm:pl-8 pl-4">Technology:</p>
                          <p className="text-white sm:pl-16 pl-8">
                            o Sharding for enhanced processing speed
                          </p>
                          <p className="text-white sm:pl-16 pl-8">
                            o High scalability for optimal performance
                          </p>
                          <p className="text-white sm:pl-16 pl-8">
                            o TON Cross-chain Bridge connecting BNB Chain
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="flex flex-1 flex-col w-full sm:gap-5 sm:p-[100px] sm:pt-[300px] gap-3 pt-[200px] pl-[10px] pr-[10px]">
                        <img src={allocation1} alt="" />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </ModalContent>
              </Modal>
            )}
            {idx === 6 && (
              <Modal isOpen={isOpen}>
                <ModalContent>
                  <CloseButton
                    style={{ zIndex: "9999" }}
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
                  <Swiper
                    className="hidden sm:block"
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    style={{ height: "calc(100vh - 100px)" }} // Adjust height if needed
                  >
                    <SwiperSlide>
                      <div
                        className="flex flex-1 flex-col w-full p-5 gap-5 p-12"
                        style={{ paddingTop: "230px", paddingBottom: "50px" }}
                      >
                        <div className="w-[80%] overflow-hidden mx-auto">
                          <img
                            className="w-full h-full"
                            src={roadmap1}
                            alt="Roadmap"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="flex flex-1 flex-col  w-full p-5 gap-5 p-12"
                        style={{ paddingTop: "230px", paddingBottom: "50px" }}
                      >
                        <img className="w-full h-96" src={roadmap2} />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  <Swiper
                    className="block sm:hidden"
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    style={{ height: "calc(100vh - 100px)" }} // Adjust height if needed
                  >
                    <SwiperSlide>
                      <div class="history-tl-container pt-[100px]">
                        <ul class="tl">
                          <li
                            class="tl-item"
                            ng-repeat="item in retailer_history"
                          >
                            <div class="timestamp">2021</div>
                            <div class="item-title">
                              Research GRAM model and The Open Network platform
                            </div>
                          </li>
                          <li
                            class="tl-item"
                            ng-repeat="item in retailer_history"
                          >
                            <div class="timestamp">2022</div>
                            <div class="item-title">
                              Build NFT agency platform and Validator database
                            </div>
                          </li>
                          <li
                            class="tl-item"
                            ng-repeat="item in retailer_history"
                          >
                            <div class="timestamp">01/2024</div>
                            <div class="item-title">
                              Launch Tab-To-Earn Game with NFT integration
                              Develop Validator database
                            </div>
                          </li>
                          <li
                            class="tl-item"
                            ng-repeat="item in retailer_history"
                          >
                            <div class="timestamp">10/2024</div>
                            <div class="item-title">
                              Official token launch (MCT) and 3.0 website
                              release
                            </div>
                          </li>
                          <li
                            class="tl-item"
                            ng-repeat="item in retailer_history"
                          >
                            <div class="timestamp">10/2024</div>
                            <div class="item-title">
                              Official token launch (MCT) and 3.0 website
                              release
                            </div>
                          </li>
                        </ul>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="history-tl-container pt-[100px]">
                        <ul class="tl">
                          <li
                            class="tl-item"
                            ng-repeat="item in retailer_history"
                          >
                            <div class="timestamp">11/2024</div>
                            <div class="item-title">
                              Grand Opening and launch MapChain-Swap exchange
                            </div>
                          </li>
                          <li
                            class="tl-item"
                            ng-repeat="item in retailer_history"
                          >
                            <div class="timestamp">12/2024</div>
                            <div class="item-title">
                              Release multi-platform MapChain-Wallet
                            </div>
                          </li>
                          <li
                            class="tl-item"
                            ng-repeat="item in retailer_history"
                          >
                            <div class="timestamp">03/2025</div>
                            <div class="item-title">
                              Launch decentralized social network 3.0
                            </div>
                          </li>
                          <li
                            class="tl-item"
                            ng-repeat="item in retailer_history"
                          >
                            <div class="timestamp">06/2025</div>
                            <div class="item-title">
                              Complete private blockchain network
                            </div>
                          </li>
                          <li
                            class="tl-item"
                            ng-repeat="item in retailer_history"
                          >
                            <div class="timestamp">2026</div>
                            <div class="item-title">
                              Focus on user community building Establish
                              investment fund Launch Launchpool and LaunchPad on
                              CEX partners
                            </div>
                          </li>
                        </ul>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </ModalContent>
              </Modal>
            )}
          </div>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
