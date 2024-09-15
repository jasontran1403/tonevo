import React, { useState, useEffect } from "react";
import Axios from "axios";
import styles from "../style";
import { MainDashboard, Footer, UserNavbar, InvestmentCard } from "../components";

const Investment = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [publicKey, setPublicKey] = useState(localStorage.getItem("publicKey"));
  const [walletStateInit, setWalletStateInit] = useState(
    localStorage.getItem("walletStateInit")
  );
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    let data = JSON.stringify({
      walletAddress: walletAddress,
      publicKey: publicKey,
      walletStateInit: walletStateInit,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/v1/auth/authenticate",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    Axios.request(config).then((response) => {
      localStorage.setItem("access_token", response.data.access_token);
      setAccessToken(response.data.access_token);
    });
  }, []);

  useEffect(() => {}), [];

  return (
    <div className="bg-primary w-full h-full">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <UserNavbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <InvestmentCard />
        </div>
      </div>
    </div>
  );
};

export default Investment;
