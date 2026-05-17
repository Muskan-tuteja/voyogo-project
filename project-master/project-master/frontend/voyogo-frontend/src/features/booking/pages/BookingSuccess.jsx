import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";

import "../../../shared/styles/bookingSuccess.css";

export default function BookingSuccess() {

  const location = useLocation();
  const navigate = useNavigate();

  const ticketRef = useRef();

  // Correct destructuring from DTO
  const {
    bookingId,
    busNo,
    source,
    destination,
    bookingTime,
    totalAmount,
    status,
    passengers,
    seatNumbers
  } = location.state || {};


  // PDF download
  const downloadPDF = async () => {

    const element = ticketRef.current;

    const canvas =
      await html2canvas(element);

    const imgData =
      canvas.toDataURL("image/png");

    const pdf =
      new jsPDF("p", "mm", "a4");

    const width =
      pdf.internal.pageSize.getWidth();

    const height =
      (canvas.height * width) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      10,
      width,
      height
    );

    pdf.save(
      `Voyago-Ticket-${bookingId}.pdf`
    );

  };


  return (

    <div className="success-container">

      <h1 className="success-title">
        Booking Confirmed 🎉
      </h1>


      {/* TICKET */}
      <div
        className="ticket"
        ref={ticketRef}
      >

        {/* HEADER */}
        <div className="ticket-header">

          <div>

            <h2>
              Voyago
            </h2>

            <div>
              Booking ID:
              <strong>
                {bookingId}
              </strong>
            </div>

            <div>
              Bus No:
              <strong>
                {busNo}
              </strong>
            </div>

          </div>

          <QRCode
            value={`BOOKING:${bookingId}`}
            size={90}
          />

        </div>



        {/* ROUTE INFO */}
        <div className="ticket-section">

          <div className="route">

            <strong>
              {source}
            </strong>

            <span className="arrow">
              →
            </span>

            <strong>
              {destination}
            </strong>

          </div>

          <div>
            Booking Time:
            {new Date(
              bookingTime
            ).toLocaleString()}
          </div>

          <div>
            Status:
            <span className="status">
              {status}
            </span>
          </div>

        </div>



        {/* SEAT NUMBERS */}
        <div className="ticket-section">

          <h3>
            Seats
          </h3>

          <div className="seat-list">

            {seatNumbers?.map(
              (seat, index) => (

                <span
                  key={index}
                  className="seat-badge"
                >
                  {seat}
                </span>

              )
            )}

          </div>

        </div>



        {/* PASSENGERS */}
        <div className="ticket-section">

          <h3>
            Passengers
          </h3>

          {passengers?.map(
            (p, index) => (

              <div
                key={index}
                className="passenger-row"
              >

                <div>
                  {p.name}
                </div>

                <div>
                  {p.gender}
                </div>

                <div>
                  Age: {p.age}
                </div>

              </div>

            )
          )}

        </div>



        {/* TOTAL */}
        <div className="ticket-total">

          Total Paid:
          <strong>
            ₹{totalAmount}
          </strong>

        </div>

      </div>



      {/* BUTTONS */}
      <div className="button-group">

        <button
          className="download-btn"
          onClick={downloadPDF}
        >
          Download Ticket PDF
        </button>

        <button
          className="home-btn"
          onClick={() =>
            navigate("/")
          }
        >
          Go Home
        </button>

      </div>

    </div>

  );

}
