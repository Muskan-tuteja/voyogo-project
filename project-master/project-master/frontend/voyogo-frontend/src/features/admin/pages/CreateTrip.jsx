import { useState, useEffect } from "react";
import api from "../../../api/axios";

export default function CreateTrip() {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [trip, setTrip] = useState({
    busNo: "",
    routeId: "",
    travelDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    fare: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const busRes = await api.get("/admin/buses");
      const routeRes = await api.get("/admin/routes/search");
       console.log(routeRes)
      setBuses(busRes.data);
      setRoutes(routeRes.data);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/admin/trips", trip);

      alert("Trip created successfully");

      setTrip({
        busNo: "",
        routeId: "",
        travelDate: "",
        departureTime: "",
        arrivalDate: "",
        arrivalTime: "",
        fare: "",
      });
    } catch (err) {
      console.log(err);
      alert(err.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "500px" }}>
      <h3>Create Trip</h3>

      <form className="admin-form" onSubmit={handleSubmit}>
        {/* Bus Dropdown */}

        <select
          name="busNo"
          value={trip.busNo}
          onChange={handleChange}
          required
        >
          <option value="">Select Bus</option>

          {buses.map((bus) => (
            <option key={bus.busNo} value={bus.busNo}>
              {bus.busName} ({bus.busNo})
            </option>
          ))}
        </select>

        {/* Route Dropdown */}

        <select
          name="routeId"
          value={trip.routeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Route</option>

          {routes?.map((route) => (
            <option key={route.routeId} value={route.routeId}>
              {route.source} → {route.destination}
            </option>
          ))}
        </select>

        {/* Travel Date */}

        <input
          type="date"
          name="travelDate"
          value={trip.travelDate}
          onChange={handleChange}
          required
        />

        {/* Departure */}

        <input
          type="date"
          name="arrivalDate"
          value={trip.arrivalDate}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="departureTime"
          value={trip.departureTime}
          onChange={handleChange}
          required
        />

        {/* Arrival */}

        <input
          type="time"
          name="arrivalTime"
          value={trip.arrivalTime}
          onChange={handleChange}
          required
        />

        {/* Fare */}

        <input
          type="number"
          name="fare"
          placeholder="Fare"
          value={trip.fare}
          onChange={handleChange}
          required
        />

        <button className="btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Trip"}
        </button>
      </form>
    </div>
  );
}
