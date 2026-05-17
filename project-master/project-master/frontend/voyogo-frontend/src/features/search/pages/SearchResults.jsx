import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../../api/axios";

import "../../../shared/styles/search.css";
import SearchForm from "../components/SearchForm";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const { from, to, date } = location.state || {};

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      if (!from || !to || !date) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(
          `/buses/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`
        );

        setTrips(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [from, to, date]);

  const calculateDuration = (depTime, arrTime) => {
    const dep = new Date(`1970-01-01T${depTime}`);
    const arr = new Date(`1970-01-01T${arrTime}`);

    let diff = (arr - dep) / (1000 * 60);
    if (diff < 0) diff += 24 * 60;

    const hours = Math.floor(diff / 60);
    const mins = diff % 60;

    return `${hours}h ${mins}m`;
  };

  const handleCardClick = (trip) => {
    navigate("/seats", {
      state: {
        tripId: trip.tripId,
        trip,
      },
    });
  };

  if (loading) return <h2>Loading trips...</h2>;

  return (
    <div className="search-container">
      <SearchForm />

      <h2>{from} {"\u2192"} {to}</h2>

      {trips.length === 0 ? (
        <p>No trips found</p>
      ) : (
        trips.map((trip) => (
          <div
            key={trip.tripId}
            className="trip-card"
            onClick={() => handleCardClick(trip)}
          >
            <div className="trip-main">
              <div className="trip-route">
                <span className="trip-city">{trip.source}</span>
                <span className="trip-arrow">{"\u2192"}</span>
                <span className="trip-city">{trip.destination}</span>
              </div>

              <div className="trip-bus">
                {trip.busName}({trip.busNo})
              </div>
            </div>

            <div className="trip-time">
              <div>
                <strong>{trip.departureTime}</strong>
                <div className="trip-date">{trip.travelDate}</div>
              </div>

              <div className="trip-duration">
                {calculateDuration(trip.departureTime, trip.arrivalTime)}
              </div>

              <div>
                <strong>{trip.arrivalTime}</strong>
                <div className="trip-date">{trip.arrivalDate}</div>
              </div>
            </div>

            <div className="trip-price">
              {"\u20B9"}{trip.fare}
              <div className="trip-seats">{trip.availableSeats} seats available</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}