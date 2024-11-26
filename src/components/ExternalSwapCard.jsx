import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { API_ENDPOINT } from "../constants";
import { toast } from "react-toastify";
import { MultiTabDetectContext } from "../components/MultiTabDetectContext";
import { GearFill } from "react-bootstrap-icons";
import ConfigModal from "./ConfigModal";
import CurrencyField from "./CurrencyField";
import BeatLoader from "react-spinners/BeatLoader";
import CurrencyPrice from "./CurrencyPrice";
import TransactionSwap from "./TransactionSwap";
import TransactionTable from "./TransactionTable";

const TABLE_HEAD = ["Source", "Destination", "Amount", "Receive", "Time", "Status"];

const ExternalSwapCard = () => {
  const { multiTabDetect } = useContext(MultiTabDetectContext);
  const [slippageAmount, setSlippageAmount] = useState(undefined);
  const [deadlineMinutes, setDeadlineMinutes] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [showModal, setShowModal] = useState(undefined);
  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setoutputAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(undefined);
  const [ratio, setRatio] = useState(undefined);
  const [wethContract, setWethContract] = useState(undefined);
  const [uniContract, setUniContract] = useState(undefined);
  const [wethAmount, setWethAmount] = useState(undefined);
  const [uniAmount, setUniAmount] = useState(undefined);
  const [source, setSource] = useState("MCTUSDT");
  const [sourceBalance, setSourceBalance] = useState(0);
  const [destination, setDestination] = useState("BNBUSDT");
  const [sourceAmount, setSourceAmount] = useState(0);
  const [destinationAmount, setDestinationAmount] = useState(undefined);
  const [from, setFrom] = useState("MCT");
  const [to, setTo] = useState("BNB");

  const handleSwap = () => {
    if (multiTabDetect) {
      toast.error("Multiple instances detected, please close all others window and reload the page!", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    if (source === "" || destination === "" || sourceAmount <= 0 || isNaN(sourceAmount) === true || isNaN(destinationAmount) === true) return;

    let data = JSON.stringify({
      "walletAddress": sessionStorage.getItem("walletAddress"),
      "amount": sourceAmount,
      "tokenSource": source,
      "tokenDestination": destination
    });

    let config = {
      method: "post",
      url: `${API_ENDPOINT}management/mapchain-swap`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        if (response.data === "Swap order created success.") {
          toast.success(response.data, {
            position: "top-right",
            autoClose: 1500,
            onClose: () => {
              window.location.reload();
            }
          });
        } else {
          toast.error(response.data, {
            position: "top-right",
            autoClose: 1500,
          });
        }
      })
      .catch((error) => {
        toast.error("Please try again later", {
          position: "top-right",
          autoClose: 1500,
        });
      });
  }

  useEffect(() => {
    fetchBalance();
  }, [source]);

  const fetchBalance = () => {
    if (source === undefined) return;

    let config = {
      method: 'get',
      url: `${API_ENDPOINT}management/get-source-balance/${source}/${sessionStorage.getItem("walletAddress")}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      }
    };

    axios.request(config)
      .then((response) => {
        setSourceBalance(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getSwapPrice = (inputAmount) => {
    setLoading(true);
    setSourceAmount(inputAmount);

    setDestinationAmount(inputAmount * ratio);
    setLoading(false);
  };

  useEffect(() => {
    let config = {
      method: 'get',
      url: `${API_ENDPOINT}management/transactions-swap/${sessionStorage.getItem("walletAddress")}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      }
    };

    axios.request(config)
      .then((response) => {
        setTransactions(response.data.data);
      });
  }, []);

  const fetchPrice = () => {
    let config = {
      method: 'get',
      url: `${API_ENDPOINT}management/get-ratio/${source}/${destination}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      }
    };

    axios.request(config)
      .then((response) => {
        setRatio(response.data);
      });
  }

  useEffect(() => {
    fetchPrice();
  }, [source, destination])

  useEffect(() => {
    const timeInterval = setInterval(() => {
      fetchPrice();
    }, 3000);

    return () => {
      clearInterval(timeInterval);
    }
  }, [source, destination]);

  const handleChangeType = (type, e) => {
    let tokenName = `${e}USDT`
    if (type === "source") {
      setFrom(e);
      setSource(tokenName);
    } else {
      setTo(e);
      setDestination(tokenName);
    }
    setSourceAmount(0);
    setDestinationAmount(0);
  };

  return (
    <div className="appBody">
      <div className="swapContainer">
        <div className="swapContent">
          <div className="swapHeader">
            <span className="swapText">Swap</span>
            <span className="gearContainer">
              <GearFill onClick={() => setShowModal(true)} />
            </span>
            {showModal && (
              <ConfigModal
                onClose={() => setShowModal(false)}
                setDeadlineMinutes={setDeadlineMinutes}
                deadlineMinutes={deadlineMinutes}
                setSlippageAmount={setSlippageAmount}
                slippageAmount={slippageAmount}
              />
            )}
          </div>
          <div className="swapBody">
            <CurrencyField
              field="input"
              converted={false}
              sourceAmount={sourceAmount}
              handleChangeType={handleChangeType}
              tokenName="BNB"
              getSwapPrice={getSwapPrice}
              signer={signer}
              balance={sourceBalance}
            />

            <CurrencyField
              field="input"
              tokenName="MCT"
              converted={true}
              handleChangeType={handleChangeType}
              value={destinationAmount}
              signer={signer}
              balance={0.0}
              spinner={BeatLoader}
              loading={loading}
            />
            <CurrencyPrice ratio={ratio} from={from} to={to} />
          </div>
          <div className="swapFooter">
            <button className="button-64" role="button" onClick={handleSwap}><span className="text">Swap</span></button>
          </div>
          <div className="transaction-container">
            <TransactionSwap
              className="w-full flex justify-center items-center ml-[20px]"
              TABLE_NAME={""}
              TABLE_SUBNAME={""}
              TABLE_HEAD={TABLE_HEAD}
              TABLE_ROWS={transactions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalSwapCard;
