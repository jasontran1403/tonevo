import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';
import { MultiTabDetectContext } from "../components/MultiTabDetectContext";
import { API_ENDPOINT } from "../constants";

const pairs = [
    // { id: 1, name: "BTCUSDT", symbol: "BTC" },
    { id: 2, name: "BNBUSDT", symbol: "BNB" },
    { id: 3, name: "TONUSDT", symbol: "TON" },
    // { id: 4, name: "SOLUSDT", symbol: "SOL" },
    { id: 5, name: "XRPUSDT", symbol: "XRP" },
    { id: 6, name: "MCTUSDT", symbol: "MCT" },
];

const WithdrawField = (probs) => {
    const { multiTabDetect } = useContext(MultiTabDetectContext);

    const [selectedSymbol, setSelectedSymbol] = useState("");
    const [amount, setAmount] = useState(0);
    const [wallet, setWallet] = useState("");

    useEffect(() => {
        setSelectedSymbol(probs.tokenName);
    }, []);

    const handleChange = (field, value) => {
        setAmount(0);
        setSelectedSymbol(value); // Cập nhật state local
        probs.handleChangeType(field, value); // Gọi hàm xử lý từ props
    };

    const handleWithdraw = () => {
        if (multiTabDetect) {
            toast.error("Multiple instances detected, please close all others window and reload the page!", {
                position: "top-right",
                autoClose: 1500,
            });
            return;
        }

        if (selectedSymbol === "" || selectedSymbol === undefined || amount === "" || parseFloat(amount) <= 0 || wallet === "" || wallet === undefined) {
            toast.error("Withdraw information must not be null", {
                position: "top-right",
                autoClose: 1500,
            });
            return;
        }

        Swal.fire({
            title: 'Confirm withdraw',
            text: `Please withdraw to the corresponding network wallet; otherwise, your assets will be lost!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, confirm it!',
            cancelButtonText: 'No, cancel it',
            reverseButtons: true,
            customClass: {
                confirmButton: 'custom-confirm-button', // Custom class for confirm button
                cancelButton: 'custom-cancel-button',   // Custom class for cancel button
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                // toast.success("Withdraw success", {
                //     position: "top-right",
                //     autoClose: 1500,
                //     onClose: () => {
                //         window.location.reload();
                //     }
                // });
            }
        })
    };

    return (
        <div className="row currencyInput">
            <div className="col-md-6 numberContainer">
                {probs.loading ? (
                    <div className="spinnerContainer">
                        <probs.spinner />
                    </div>
                ) : (
                    <>
                        <input
                            className="currencyInputField"
                            type="text" // Dùng type="text" thay vì "number" để kiểm soát chi tiết hơn
                            placeholder="0"
                            value={amount}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Chỉ cho phép số và dấu thập phân
                                if (/^\d*\.?\d*$/.test(value)) {
                                    setAmount(value);
                                }
                            }}
                        />

                        <select
                            value={selectedSymbol} // Giá trị hiện tại
                            onChange={(e) => {
                                handleChange(
                                    probs.converted ? "destination" : "source",
                                    e.target.value
                                );
                                setWallet("");
                            }}
                            name="symbols"
                            id="symbol-select"
                        >
                            {pairs.map((pair) => (
                                <option key={pair.id} value={pair.symbol}>
                                    {pair.symbol}
                                </option>
                            ))}
                        </select>
                    </>
                )}
            </div>

            {probs.converted === false && <div className="cold-md-6 tokenContainer">
                <div className="balanceContainer">
                    {probs.converted === false ?
                        <button
                            style={{ cursor: "pointer", color: "rgb(14, 190, 221)" }}
                            onClick={() => {
                                probs.handleMax();
                                setAmount(probs.balance);
                            }}>
                            MAX
                        </button>
                        : null}
                    <span className="balanceAmount" style={{ color: "rgb(14, 190, 221)" }}>
                        Balance: {probs.balance}
                    </span>
                </div>
            </div>}

            <input
                className="currencyInputField"
                style={{ marginTop: "20px" }}
                type="text"
                placeholder="Wallet address receive"
                value={wallet}
                onChange={(e) => {
                    const value = e.target.value;
                    setWallet(value);
                }}
            />

            <div className="mt-[20px]">
                <button className="button-64" role="button" onClick={handleWithdraw}><span className="text">Confirm</span></button>
            </div>
        </div>
    );
};

export default WithdrawField;
