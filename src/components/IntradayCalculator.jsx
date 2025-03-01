import React, { useState } from "react";
import "./IntradayCalculator.css";

const IntradayCalculator = () => {
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopLoss, setStopLoss] = useState(98);
  const [riskAmount, setRiskAmount] = useState(1000);
  const [accountSize, setAccountSize] = useState(100000);
  const [newStopLoss, setNewStopLoss] = useState(99);

  const calculatePosition = () => {
    const riskPerShare = Math.abs(entryPrice - stopLoss);
    const shares = Math.floor(riskAmount / riskPerShare);
    const positionSize = shares * entryPrice;
    const riskPercentage = (riskAmount / accountSize) * 100;
    const potentialProfit = Math.abs(entryPrice - stopLoss) * shares * 2;
    const newSlPoint =
      (Math.abs(stopLoss - newStopLoss) * shares) /
      Math.abs(entryPrice - newStopLoss);
    const slPercentage = ((entryPrice - stopLoss) / entryPrice) * 100;

    return {
      shares,
      positionSize,
      newSlPoint: newSlPoint.toFixed(2),
      potentialProfit: potentialProfit.toFixed(2),
      riskPercentage: riskPercentage.toFixed(2),
      slPercentage: Math.abs(slPercentage).toFixed(2),
      slDifference: riskPerShare.toFixed(2),
    };
  };

  const results = calculatePosition();

  return (
    <div className="intraday-calculator">
      <h2>Intraday Position Size Calculator</h2>
      <div className="input-group">
        <label>Entry Price (₹)</label>
        <input
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>Stop Loss (₹)</label>
        <input
          type="number"
          value={stopLoss}
          onChange={(e) => setStopLoss(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>New Stop Loss (₹)</label>
        <input
          type="number"
          value={newStopLoss}
          onChange={(e) => setNewStopLoss(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>Risk Amount (₹)</label>
        <input
          type="number"
          value={riskAmount}
          onChange={(e) => setRiskAmount(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>Account Size (₹)</label>
        <input
          type="number"
          value={accountSize}
          onChange={(e) => setAccountSize(Number(e.target.value))}
        />
      </div>
      <div className="results">
        <div className="result-item">
          <span>Number of Shares</span>
          <span>{results.shares.toLocaleString()}</span>
        </div>
        <div className="result-item">
          <span>Margin Required</span>
          <span>₹{results.positionSize.toLocaleString()}</span>
        </div>
        <div className="result-item">
          <span>Risk Percentage</span>
          <span>{results.riskPercentage}%</span>
        </div>
        <div className="result-item">
          <span>Potential Profit</span>
          <span>₹{results.potentialProfit}</span>
        </div>
        <div className="result-item">
          <span>New Quantity To buy</span>
          <span>{results.newSlPoint}</span>
        </div>
        <div className="result-item">
          <span>Stop Loss Percentage</span>
          <span>{results.slPercentage}%</span>
        </div>
        <div className="result-item">
          <span>Stop Loss Difference</span>
          <span>₹{results.slDifference}</span>
        </div>
      </div>
    </div>
  );
};

export default IntradayCalculator;
