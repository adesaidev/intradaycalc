import React, { useState } from "react";
import "./IntradayCalculator.css";

const PositionSize = () => {
  const [capital, setCapital] = useState(100000);
  const [risk, setRisk] = useState(0.5);
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopLossPercentage, setStopLossPercentage] = useState(1.5);
  const [stopLoss, setStopLoss] = useState(98);
  const [tradeType, setTradeType] = useState("buy"); // Add trade type state

  // Modify stop loss calculation based on trade type
  const handleStopLossPercentageChange = (e) => {
    const percentage = Number(e.target.value);
    setStopLossPercentage(percentage);
    const newStopLoss =
      tradeType === "buy"
        ? entryPrice - (entryPrice * percentage) / 100
        : entryPrice + (entryPrice * percentage) / 100;
    setStopLoss(newStopLoss);
  };

  // Update stop loss percentage when entry price changes
  const handleEntryPriceChange = (e) => {
    const newEntryPrice = Number(e.target.value);
    setEntryPrice(newEntryPrice);
    const newStopLoss =
      tradeType === "buy"
        ? newEntryPrice - (newEntryPrice * stopLossPercentage) / 100
        : newEntryPrice + (newEntryPrice * stopLossPercentage) / 100;
    setStopLoss(newStopLoss);
  };

  const calculatePosition = () => {
    // Calculate risk amount based on capital and risk percentage
    const riskAmount = (capital * risk) / 100;

    // Calculate risk per share
    const riskPerShare = Math.abs(entryPrice - stopLoss);

    // Calculate number of shares
    const shares = Math.floor(riskAmount / riskPerShare);

    // Calculate total position size
    const positionSize = shares * entryPrice;

    // Calculate potential loss
    const maxLoss = shares * riskPerShare;

    return {
      shares,
      positionSize,
      maxLoss,
      riskPerShare,
    };
  };

  const results = calculatePosition();

  return (
    <div className="position-calculator">
      <h2>Position Size Calculator</h2>

      <div className="input-section">
        {/* Add trade type selector */}
        <div className="input-group">
          <label>Trade Type</label>
          <select
            value={tradeType}
            onChange={(e) => {
              setTradeType(e.target.value);
              handleStopLossPercentageChange({
                target: { value: stopLossPercentage },
              });
            }}
          >
            <option value="buy">Buy (Long)</option>
            <option value="sell">Sell (Short)</option>
          </select>
        </div>

        <div className="input-group">
          <label>Trading Capital (₹)</label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label>Risk Per Trade (%)</label>
          <input
            type="number"
            value={risk}
            onChange={(e) => setRisk(Number(e.target.value))}
            step="0.1"
          />
        </div>

        <div className="input-group">
          <label>Entry Price (₹)</label>
          <input
            type="number"
            value={entryPrice}
            onChange={handleEntryPriceChange}
          />
        </div>

        <div className="input-group">
          <label>Stop Loss Percentage (%)</label>
          <input
            type="number"
            value={stopLossPercentage}
            onChange={handleStopLossPercentageChange}
            step="0.1"
          />
        </div>

        <div className="input-group">
          <label>Stop Loss Price (₹)</label>
          <input type="number" value={stopLoss.toFixed(2)} readOnly />
        </div>
      </div>

      {/* Add trade direction indicator */}
      <div className="trade-direction">
        {tradeType === "buy" ? (
          <span className="trade-long">Long Position</span>
        ) : (
          <span className="trade-short">Short Position</span>
        )}
      </div>

      <div className="results-section">
        <div className="result-item">
          <span>Number of Shares:</span>
          <span>{results.shares.toLocaleString()}</span>
        </div>

        <div className="result-item">
          <span>Total Position Size:</span>
          <span>₹{results.positionSize.toLocaleString()}</span>
        </div>

        <div className="result-item">
          <span>Risk Per Share:</span>
          <span>₹{results.riskPerShare.toFixed(2)}</span>
        </div>

        <div className="result-item">
          <span>Maximum Loss:</span>
          <span>₹{results.maxLoss.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PositionSize;
