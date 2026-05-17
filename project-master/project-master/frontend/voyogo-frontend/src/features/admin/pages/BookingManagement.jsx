import { useEffect, useState } from "react";
import api from "../../../api/axios";
import "../../../shared/styles/adminBookings.css";

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] =
    useState([]);
  const [selectedBooking, setSelectedBooking] =
    useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [busFilter, setBusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: ""
  });
  const recordsPerPage = 5;

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, busFilter]);

  useEffect(() => {
    if (!toast.open) return;
    const timer = setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        open: false
      }));
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.open]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/admin/bookings");
      setBookings(res.data || []);
      setCurrentPage(1);
      setDateFilter("");
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings.");
      setToast({
        open: true,
        severity: "error",
        message: "Failed to load bookings."
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (forcedDate) => {
    const effectiveDate =
      forcedDate ?? dateFilter;

    const filtered = bookings.filter((b) => {
      const busMatch =
        (b.busNo || "")
          .toLowerCase()
          .includes(busFilter.toLowerCase());
      const dateMatch = !effectiveDate
        ? true
        : (b.bookingDate || "").includes(
            effectiveDate
          );
      return busMatch && dateMatch;
    });

    setFilteredBookings(filtered);
    setCurrentPage(1);
  };

  const searchByDate = () => {
    applyFilters(dateFilter);
  };

  const clearFilters = () => {
    setBusFilter("");
    setDateFilter("");
    setFilteredBookings(bookings);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentBookings =
    filteredBookings.slice(indexOfFirst, indexOfLast);
  const totalPages =
    Math.ceil(
      filteredBookings.length / recordsPerPage
    );

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Cancel booking?")) return;

    try {
      setCancellingId(bookingId);
      await api.put(`/bookings/cancel/${bookingId}`);
      await fetchBookings();
      setToast({
        open: true,
        severity: "success",
        message: "Booking cancelled successfully."
      });
    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        severity: "error",
        message: "Cancel failed. Please try again."
      });
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="admin-bookings admin-container">
      <h1>All Bookings</h1>

      <div className="admin-bookings-toolbar">
        <span className="admin-bookings-label">Filter</span>
        <input
          type="text"
          placeholder="Filter by Bus Number"
          value={busFilter}
          onChange={(e) => setBusFilter(e.target.value)}
          className="filter-input"
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) =>
            setDateFilter(e.target.value)
          }
          className="date-input"
        />

        <button onClick={searchByDate}>
          Search
        </button>
        <button onClick={clearFilters}>Clear</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bus</th>
            <th>Route</th>
            <th>BookingDate</th>
            <th>Amount</th>
            <th>Status</th>
            <th>View</th>
            <th>Cancel</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan="8" className="status-cell">
                Loading bookings...
              </td>
            </tr>
          )}

          {!loading && currentBookings.length === 0 && (
            <tr>
              <td colSpan="8" className="status-cell">
                No bookings found.
              </td>
            </tr>
          )}

          {currentBookings.map(booking => (
            <tr key={booking.bookingId}>
              <td>{booking.bookingId}</td>
              <td>{booking.busNo}</td>
              <td>
                {booking.source} {" -> "} {booking.destination}
              </td>
              <td>
                {booking.bookingDate}
              </td>
              <td>Rs. {booking.totalAmount}</td>
              <td>{booking.status}</td>

              <td>
                <button
                  className="view-btn"
                  onClick={() =>
                    setSelectedBooking(booking)
                  }
                >
                  View
                </button>
              </td>

              <td>
                {booking.status === "CONFIRMED" && (
                  <button
                    className="cancel-btn"
                    disabled={cancellingId === booking.bookingId}
                    onClick={() =>
                      cancelBooking(
                        booking.bookingId
                      )
                    }
                  >
                    {cancellingId === booking.bookingId
                      ? "Cancelling..."
                      : "Cancel"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={
              currentPage === i + 1 ? "active-page" : ""
            }
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedBooking && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Booking Details</h2>

            <h3>Seats:</h3>
            <div className="seat-list">
              {selectedBooking.seatNumbers?.map(seat => (
                <span key={seat} className="seat">
                  {seat}
                </span>
              ))}
            </div>

            <h3>Passengers:</h3>
            <table className="passenger-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                </tr>
              </thead>

              <tbody>
                {selectedBooking.passenger?.map(p => (
                  <tr key={p.passengerId}>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="close-btn"
              onClick={() => setSelectedBooking(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {toast.open && (
        <div
          className={`toast toast-${toast.severity}`}
          role="status"
          aria-live="polite"
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() =>
              setToast((prev) => ({
                ...prev,
                open: false
              }))
            }
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}
