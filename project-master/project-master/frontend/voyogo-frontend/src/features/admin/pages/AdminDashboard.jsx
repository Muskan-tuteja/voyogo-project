import { useEffect, useState } from "react";
import api from "../../../api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import "../../../shared/styles/adminAnalytics.css";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({});
  const [revenueByTrip, setRevenueByTrip] =
    useState([]);
  const [revenueByDate, setRevenueByDate] =
    useState([]);
  const [seatMap, setSeatMap] =
    useState([]);
  const [dateFilter, setDateFilter] =
    useState("");
  const [selectedTripId, setSelectedTripId] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: ""
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  useEffect(() => {
    if (!selectedTripId) {
      setSeatMap([]);
      return;
    }
    fetchSeatMap(selectedTripId);
  }, [selectedTripId]);

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

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");
      const res =
        await api.get(
          "/admin/analytics"
        );

      setAnalytics(res.data.summary || {});
      setRevenueByTrip(
        res.data.revenueByTrip || []
      );
      setRevenueByDate(
        res.data.revenueByDate || []
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load analytics.");
      setToast({
        open: true,
        severity: "error",
        message: "Failed to load analytics."
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSeatMap = async (tripId) => {
    try {
      const res =
        await api.get(
          `/seats/trip/${tripId}`
        );
      setSeatMap(res.data || []);
    } catch (err) {
      console.error(err);
      setSeatMap([]);
      setToast({
        open: true,
        severity: "error",
        message: "Failed to load seat map."
      });
    }
  };

  const exportCSV = () => {
    let csv = "Trip,Revenue\n";

    revenueByTrip.forEach(r => {
      csv += `${r.tripId},${r.revenue}\n`;
    });

    const blob =
      new Blob([csv], {
        type: "text/csv"
      });

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "voyago_revenue.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const filterByDate = async () => {
    if (!dateFilter) {
      fetchAnalytics();
      return;
    }

    try {
      setFilterLoading(true);
      setError("");
      const res =
        await api.get(
          `/admin/analytics?date=${dateFilter}`
        );

      setAnalytics(res.data.summary || {});
      setRevenueByTrip(
        res.data.revenueByTrip || []
      );
      setRevenueByDate(
        res.data.revenueByDate || []
      );
    } catch (err) {
      console.error(err);
      setError("Failed to filter analytics by date.");
      setToast({
        open: true,
        severity: "error",
        message: "Failed to filter analytics."
      });
    } finally {
      setFilterLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Analytics Dashboard</h1>

      <div className="dashboard-actions">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) =>
            setDateFilter(e.target.value)
          }
        />

        <button
          onClick={filterByDate}
          disabled={filterLoading}
        >
          {filterLoading ? "Filtering..." : "Filter"}
        </button>

        <button onClick={exportCSV}>
          Export CSV
        </button>
      </div>

      <div className="summary-cards">
        {loading ? (
          <div className="status-card">
            Loading analytics...
          </div>
        ) : (
          <>
            <div className="card">
              <h3>Total Revenue</h3>
              <p>Rs. {analytics.totalRevenue ?? 0}</p>
            </div>

            <div className="card">
              <h3>Occupancy Rate</h3>
              <p>
                {analytics.occupancyRate ?? 0}%
              </p>
            </div>

            <div className="card">
              <h3>Seat Utilization</h3>
              <p>
                {analytics.seatUtilization ?? 0}%
              </p>
            </div>

            <div className="card">
              <h3>Cancellation Rate</h3>
              <p>
                {analytics.cancellationRate ?? 0}%
              </p>
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      <div className="chart-container">
        <h2>Revenue per Trip</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={revenueByTrip}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />
            <XAxis dataKey="tripId" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="revenue"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2>Revenue per Day</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={revenueByDate}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="revenue"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="seat-map">
        <h2>Seat Map Viewer</h2>

        <select
          value={selectedTripId}
          onChange={(e) =>
            setSelectedTripId(e.target.value)
          }
        >
          <option value="">
            Select a trip
          </option>
          {revenueByTrip.map((trip) => (
            <option
              key={trip.tripId}
              value={trip.tripId}
            >
              {trip.tripId}
            </option>
          ))}
        </select>

        <div className="seats">
          {seatMap.map(seat => (
            <div
              key={seat.seatNumber}
              className={
                seat.booked
                  ? "seat booked"
                  : "seat available"
              }
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>
      </div>

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
