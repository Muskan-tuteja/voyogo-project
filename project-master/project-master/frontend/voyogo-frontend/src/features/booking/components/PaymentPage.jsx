import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../api/axios";
import QRCode from "react-qr-code";

import "../../../shared/styles/payment.css";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { tripId, passengers, totalAmount } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("UPI_QR");
  const [upiId, setUpiId] = useState("");
  const [timeLeft, setTimeLeft] = useState(600);

  const merchantUpi = "voyago@upi";
  const upiPaymentString = `upi://pay?pa=${merchantUpi}&pn=Voyago&am=${totalAmount}&cu=INR`;

  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Session expired");
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handlePayment = async () => {
    try {
      const response = await api.post("/buses/booking/create", {
        tripId,
        passengers,
        amount: totalAmount,
        paymentMethod,
        upiId: paymentMethod === "UPI_ID" ? upiId : undefined,
      });

      navigate("/booking-success", {
        state: response.data,
      });
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-left">
        <div className="payment-header">
          <h2>
            Pay {"\u20B9"}{totalAmount}
          </h2>

          <div className="timer">{formatTime(timeLeft)}</div>
        </div>

        <div className="payment-card">
          <h3>UPI</h3>

          <label className="payment-option">
            <input
              type="radio"
              checked={paymentMethod === "UPI_QR"}
              onChange={() => setPaymentMethod("UPI_QR")}
            />
            Pay via QR Code
          </label>

          {paymentMethod === "UPI_QR" && (
            <div className="qr-container">
              <QRCode value={upiPaymentString} size={180} />
              <div>Scan using GPay / PhonePe</div>
            </div>
          )}

          <label className="payment-option">
            <input
              type="radio"
              checked={paymentMethod === "UPI_ID"}
              onChange={() => setPaymentMethod("UPI_ID")}
            />
            Pay via UPI ID
          </label>

          {paymentMethod === "UPI_ID" && (
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="upi-input"
            />
          )}
        </div>

        <div className="payment-card">
          <h3>Credit / Debit Card</h3>
          <label className="payment-option">
            <input
              type="radio"
              checked={paymentMethod === "CARD"}
              onChange={() => setPaymentMethod("CARD")}
            />
            Add New Card
          </label>
        </div>

        <div className="payment-card">
          <h3>Netbanking</h3>
          <label className="payment-option">
            <input
              type="radio"
              checked={paymentMethod === "NETBANKING"}
              onChange={() => setPaymentMethod("NETBANKING")}
            />
            Select Bank
          </label>
        </div>

        <button className="pay-button" onClick={handlePayment}>
          Pay {"\u20B9"}{totalAmount}
        </button>
      </div>

      <div className="payment-right">
        <div className="fare-card">
          <h3>Fare Summary</h3>

          <div>
            Base Fare
            <span>{"\u20B9"}{(totalAmount / 1.18).toFixed(2)}</span>
          </div>

          <div>
            GST
            <span>{"\u20B9"}{(totalAmount - totalAmount / 1.18).toFixed(2)}</span>
          </div>

          <hr />

          <div className="total">Total {"\u20B9"}{totalAmount}</div>
        </div>
      </div>
    </div>
  );
}