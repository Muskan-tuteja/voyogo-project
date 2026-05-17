import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import "../../../shared/styles/mybookings.css";

export default function ViewMyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/buses/bookings/my");
      console.log(res)
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTicket = (booking) => {
    navigate("/booking-success", {
      state: booking,
    });
  };

  const handleCancel = async (bookingId) => {
    const confirm = window.confirm("Cancel this booking?");

    if (!confirm) return;

    try {
      await api.put(`buses/booking/cancel/${bookingId}`);

      alert("Booking cancelled");

      fetchBookings();
    } catch (err) {
      alert("Cancel failed");
    }
  };

  if (loading) return <div className="loading">Loading bookings...</div>;

  return (
    <div className="mybookings-container">
      <h2 className="page-title">My Bookings </h2>

      {bookings.length === 0 ? (
        <div className="no-bookings">No bookings found</div>
      ) : (
        bookings.map((booking) => (
          <div key={booking.bookingId} className="booking-card">
            {/* LEFT */}
            <div className="booking-left">
              <div className="route">
                <span className="city">{booking.source}</span>

                <span className="arrow">→</span>

                <span className="city">{booking.destination}</span>
              </div>

              <div className="bus">
                Bus No:
                {booking.busNo}
              </div>

              <div className="seats">
                Seats:
                {booking.seatNumbers.map((seat, i) => (
                  <span key={i} className="seat-badge">
                    {seat}
                  </span>
                ))}
              </div>

              <div className="booking-time">
                Booked on:
                {new Date(booking.bookingTime).toLocaleString()}
              </div>
            </div>

            {/* RIGHT */}
            <div className="booking-right">
              <div className={`status ${booking.status}`}>{booking.status}</div>

              <div className="amount">₹{booking.totalAmount}</div>

              <button
                className="view-btn"
                onClick={() => handleViewTicket(booking)}
              >
                View Ticket
              </button>

              {booking.status === "CONFIRMED" && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(booking.bookingId)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
