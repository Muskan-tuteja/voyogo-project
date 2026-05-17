import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import api from "../../../api/axios";
import "../../../shared/styles/seats.css";

export default function SeatSelection() {

  const location = useLocation();
  const navigate = useNavigate();

  const { tripId, trip } = location.state || {};

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatDetails, setSelectedSeatDetails] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  const [baseAmount, setBaseAmount] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [loading, setLoading] = useState(true);

  const GST_RATE = 0.18;
  const seatPrice = trip?.fare || 0;


  /* ================================
     FETCH SEATS (useCallback)
     ================================ */

  const fetchSeats = useCallback(async () => {

    if (!tripId) return;

    try {

      const res =
        await api.get(
          `/buses/seats/trip/${tripId}`
        );

      setSeats(res.data);

    }
    catch (error) {

      console.error(
        "Seat fetch failed:",
        error
      );

    }
    finally {

      setLoading(false);

    }

  }, [tripId]);


  /* ================================
     REAL-TIME POLLING
     ================================ */

  useEffect(() => {

    if (!tripId) return;

    fetchSeats();

    const interval =
      setInterval(
        fetchSeats,
        5000
      );

    return () =>
      clearInterval(interval);

  }, [fetchSeats]);


  /* ================================
     PRICE CALCULATION
     ================================ */

  const calculatePrice = (seatDetails) => {

    const base =
      seatDetails.reduce(
        (sum, seat) =>
          sum + seat.price,
        0
      );

    const gst =
      base * GST_RATE;

    const total =
      base + gst;

    setBaseAmount(base);
    setGstAmount(gst);
    setTotalAmount(total);

  };


  /* ================================
     TOGGLE SEAT
     ================================ */

 const toggleSeat = async (seat) => {

  const exists =
    selectedSeats.includes(
      seat.seatId
    );

  // prevent selecting booked seat
  if (seat.booked)
    return;

  // prevent selecting locked seat by OTHER user
  if (seat.locked && !exists)
    return;

  try {

    if (exists) {

      // UNLOCK SEAT
      await api.delete(
        "/seats/unlock",
        {
          data: {
            tripId,
            seatId: seat.seatId
          }
        }
      );

      const updatedSeats =
        selectedSeats.filter(
          id => id !== seat.seatId
        );

      const updatedDetails =
        selectedSeatDetails.filter(
          s => s.seatId !== seat.seatId
        );

      setSelectedSeats(updatedSeats);

      setSelectedSeatDetails(
        updatedDetails
      );

      calculatePrice(
        updatedDetails
      );

      fetchSeats();

    }
    else {

      // LOCK SEAT
      await api.post(
        "/seats/lock",
        {
          tripId,
          seatId: seat.seatId
        }
      );

      const newDetails = [

        ...selectedSeatDetails,

        {
          seatId: seat.seatId,
          seatNumber: seat.seatNumber,
          price: seatPrice
        }

      ];

      setSelectedSeats([
        ...selectedSeats,
        seat.seatId
      ]);

      setSelectedSeatDetails(
        newDetails
      );

      calculatePrice(
        newDetails
      );

      fetchSeats();

    }

  }
  catch (error) {

    console.error(error);

    fetchSeats();

  }

};



  /* ================================
     SEAT RENDER
     ================================ */

  const renderSeat = (seat) => {

    const isSelected =
      selectedSeats.includes(
        seat.seatId
      );

    let className =
      "seat ";

    if (isSelected)
      className += "selected";
    else if (seat.booked)
      className += "booked";
    else if (seat.locked)
      className += "locked";
    else
      className += "available";


    return (

      <div
        key={seat.seatId}
        className="seat-wrapper"
        onMouseEnter={() =>
          setHoveredSeat(seat)
        }
        onMouseLeave={() =>
          setHoveredSeat(null)
        }
      >

        <div
          className={className}
          onClick={() =>
            toggleSeat(seat)
          }
        >
          {seat.seatNumber}
        </div>


        {hoveredSeat?.seatId ===
          seat.seatId && (

          <div className="seat-tooltip">

            <div>
              Seat:
              {seat.seatNumber}
            </div>

            <div>
              Fare:
              ₹{seatPrice}
            </div>

            <div>
              Status:

              {seat.booked
                ? " Booked"
                : seat.locked
                ? " Locked"
                : " Available"}
            </div>

          </div>

        )}

      </div>

    );

  };


  /* ================================
     SORT SEATS
     ================================ */

  const extractNumber = (s) =>
    parseInt(
      s.seatNumber.substring(1),
      10
    );


  const lowerSeats =
    seats
      .filter(
        s =>
          s.seatType === "LOWER"
      )
      .sort(
        (a, b) =>
          extractNumber(a)
          -
          extractNumber(b)
      );


  const upperSeats =
    seats
      .filter(
        s =>
          s.seatType === "UPPER"
      )
      .sort(
        (a, b) =>
          extractNumber(a)
          -
          extractNumber(b)
      );


  /* ================================
     LOADING
     ================================ */

  if (loading)
    return <h2>
      Loading seats...
    </h2>;


  /* ================================
     UI
     ================================ */

  return (

    <div className="seat-container">

      <div className="seat-left">

        <h2>
          {trip?.source}
          →
          {trip?.destination}
        </h2>


        <div className="bus-layout-horizontal">

          <div className="deck-column">

            <h3>
              Lower Deck
            </h3>

            <div className="deck-grid-2x2">

              {lowerSeats.map(
                renderSeat
              )}

            </div>

          </div>


          <div className="bus-aisle"></div>


          <div className="deck-column">

            <h3>
              Upper Deck
            </h3>

            <div className="deck-grid-2x2">

              {upperSeats.map(
                renderSeat
              )}

            </div>

          </div>

        </div>


        <div className="selected-info">

          <h3>
            Selected Seats
          </h3>

          {selectedSeatDetails.map(
            seat => (

              <div
                key={seat.seatId}
              >

                Seat
                {seat.seatNumber}
                —
                ₹{seat.price}

              </div>

            )
          )}

        </div>

      </div>


      <div className="seat-right">

        <div className="fare-card">

          <h3>
            Fare Summary
          </h3>

          <div>
            Base:
            ₹{baseAmount.toFixed(2)}
          </div>

          <div>
            GST:
            ₹{gstAmount.toFixed(2)}
          </div>

          <div className="fare-total">

            Total:
            ₹{totalAmount.toFixed(2)}

          </div>


          <button
            className="booking-btn"
            disabled={
              selectedSeats.length === 0
            }
            onClick={() =>
              navigate(
                "/passenger",
                {
                  state: {
                    tripId,
                    selectedSeatDetails,
                    totalAmount
                  }
                }
              )
            }
          >

            Enter Passenger Details

          </button>

        </div>

      </div>

    </div>

  );

}
