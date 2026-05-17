import { useEffect, useState } from "react";
import api from "../../../api/axios";
import "../../../shared/styles/admin.css";

export default function TripTable() {
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
  const [seatModalOpen, setSeatModalOpen] = useState(false);
  const [seatLayout, setSeatLayout] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [formData, setFormData] = useState({
    travelDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    fare: "",
  });

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const res = await api.get("/admin/trips");

      setTrips(res.data);
    } catch (error) {
      console.error(error);
    }
  };
//view seat model
  const openSeatModal = async (tripId) => {

  try {

    setSelectedTripId(tripId);

    const res = await api.get(`/admin/trips/${tripId}/seats`);

    setSeatLayout(res.data);

    setSeatModalOpen(true);

  } catch (error) {

    console.error(error);
    alert("Failed to load seat layout");

  }
};

const closeSeatModal = () => {
  setSeatModalOpen(false);
};
  // OPEN DRAWER
  const openDrawer = (trip) => {
    setEditingTrip(trip);

    setFormData({
      travelDate: trip.travelDate,
      departureTime: trip.departureTime,
      arrivalDate: trip.arrivalDate,
      arrivalTime: trip.arrivalTime,
      fare: trip.fare,
    });
  };

  // CLOSE DRAWER
  const closeDrawer = () => {
    setEditingTrip(null);
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE TRIP
  const updateTrip = async () => {
    try {
      await api.put(`/admin/trips/${editingTrip.tripId}`, formData);

      // optimistic UI update
      setTrips((prev) =>
        prev.map((trip) =>
          trip.tripId === editingTrip.tripId ? { ...trip, ...formData } : trip,
        ),
      );

      closeDrawer();
    } catch {
      alert("Update failed");
    }
  };

  const deleteTrip = async (tripId) => {
    if (!window.confirm("Delete this trip?")) return;

    try {
      await api.delete(`/admin/trips/${tripId}`);

      // Optimistic UI update
      setTrips((prev) => prev.filter((trip) => trip.tripId !== tripId));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="trip-container">
      <h2 className="admin-title">Trip Management</h2>

      {trips.map((trip) => (
        <div key={trip.tripId} className="trip-card">
          <div>
            <div className="trip-route">
              {trip.source} → {trip.destination}
            </div>

            <div>{trip.travelDate}</div>

            <div>
              {trip.departureTime} → {trip.arrivalTime}
            </div>
          </div>

          <div className="trip-actions">
            <div className="trip-fare">₹{trip.fare}</div>

            <button className="btn-edit" onClick={() => openDrawer(trip)}>
              Edit
            </button>

            <button
              className="btn-delete"
              onClick={() => deleteTrip(trip.tripId)}
            >
              Delete
            </button>
            <button
              className="btn-view"
              onClick={() => openSeatModal(trip.tripId)}
            >
              View Seats
            </button>
          </div>
        </div>
      ))}

      {/* RIGHT DRAWER */}
      <div className={`drawer ${editingTrip ? "open" : ""}`}>
        {editingTrip && (
          <div className="drawer-content">
            <h3>Edit Trip</h3>

            <label>Travel Date</label>
            <input
              type="date"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
            />

            <label>Departure Time</label>
            <input
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
            />

            <label>Arrival Date</label>
            <input
              type="date"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
            />

            <label>Arrival Time</label>
            <input
              type="time"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
            />

            <label>Fare</label>
            <input
              type="number"
              name="fare"
              value={formData.fare}
              onChange={handleChange}
            />

            <div className="drawer-buttons">
              <button className="btn-save" onClick={updateTrip}>
                Update
              </button>

              <button className="btn-cancel" onClick={closeDrawer}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BACKDROP */}
      {editingTrip && (
        <div className="drawer-backdrop" onClick={closeDrawer}></div>
      )}
      {seatModalOpen && (

  <>
    <div className="seat-modal">

      <div className="seat-modal-content">

        <h3>Seat Layout</h3>

        <div className="seat-grid">

          {seatLayout.map((seat) => (

            <div
              key={seat.seatId}
              className={`seat-box ${
                seat.booked ? "seat-booked" : "seat-empty"
              }`}
              title={
                seat.booked
                  ? `Passenger: ${seat.passengerName}
Fare: ₹${seat.price}`
                  : "Empty Seat"
              }
            >

              {seat.seatNumber}

            </div>

          ))}

        </div>

        <button
          className="btn-cancel"
          onClick={closeSeatModal}
        >
          Close
        </button>

      </div>

    </div>

    <div
      className="drawer-backdrop"
      onClick={closeSeatModal}
    />

  </>

)}
    </div>
  );
}
