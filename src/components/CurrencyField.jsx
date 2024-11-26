import React, { useState, useEffect } from "react";

const pairs = [
    // { id: 1, name: "BTCUSDT", symbol: "BTC" },
    { id: 2, name: "BNBUSDT", symbol: "BNB" },
    { id: 3, name: "TONUSDT", symbol: "TON" },
    // { id: 4, name: "SOLUSDT", symbol: "SOL" },
    { id: 5, name: "XRPUSDT", symbol: "XRP" },
    { id: 6, name: "MCTUSDT", symbol: "MCT" },
];

const CurrencyField = (probs) => {
    const [selectedSymbol, setSelectedSymbol] = useState("");

    // Cập nhật giá trị mặc định dựa trên probs.converted khi component được render hoặc khi probs.converted thay đổi
    useEffect(() => {
        if (probs.converted) {
            setSelectedSymbol(pairs[0].symbol); // Index 1 -> "BNB"
        } else {
            setSelectedSymbol(pairs[3].symbol); // Index 6 -> "MCT"
        }
    }, [probs.converted]);

    useEffect(() => {
        probs.handleChangeType("source", "MCT"); // Gọi hàm xử lý từ props
        probs.handleChangeType("destination", "BNB"); // Gọi hàm xử lý từ props
    }, []);

    const getPrice = (value) => {
        if (probs.failed) {
            probs.getSwapPrice(0);
        } else {
            probs.getSwapPrice(value);
        }
    };

    const handleChange = (field, value) => {
        setSelectedSymbol(value); // Cập nhật state local
        probs.handleChangeType(field, value); // Gọi hàm xử lý từ props
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
                            placeholder="0"
                            value={probs.value}
                            readOnly={probs.converted}
                            onBlur={(e) =>
                                probs.field === "input"
                                    ? getPrice(e.target.value)
                                    : null
                            }
                        />
                        <select
                            value={selectedSymbol} // Giá trị hiện tại
                            onChange={(e) =>
                                handleChange(
                                    probs.converted ? "destination" : "source",
                                    e.target.value
                                )
                            }
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
                    <span className="balanceAmount">
                        Balance: {probs.balance}
                    </span>
                    {probs.converted === false ? <button>Max</button> : null}
                </div>
            </div>}
        </div>
    );
};

export default CurrencyField;
