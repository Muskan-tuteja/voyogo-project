import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function RouteManagement() {

  const [routes, setRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [newRoute, setNewRoute] = useState({
    source: "",
    destination: "",
    distance: "",
  });

  const [loading, setLoading] = useState(false);

  // server pagination state
  const [currentPage, setCurrentPage] = useState(0); // Spring starts from 0
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  // LOAD ROUTES FROM SERVER
  const loadRoutes = async (page = 0, search = "") => {

    try {

      const res = await api.get("/admin/routes", {
        params: {
          page: page,
          size: pageSize,
          search: search
        }
      });

      setRoutes(res.data.content);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.number);

    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    loadRoutes(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  // FORM CHANGE
  const handleChange = (e) => {

    setNewRoute({
      ...newRoute,
      [e.target.name]: e.target.value,
    });

  };

  // SUBMIT NEW ROUTE
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post("/admin/routes", newRoute);

      setNewRoute({
        source: "",
        destination: "",
        distance: "",
      });

      loadRoutes(0, searchTerm); // reload first page

    } catch {
      alert("Failed to add route");
    } finally {
      setLoading(false);
    }

  };

  // DELETE ROUTE
  const deleteRoute = async (routeId) => {

    if (!window.confirm("Delete this route?")) return;

    await api.delete(`/admin/routes/${routeId}`);

    loadRoutes(currentPage, searchTerm);

  };

  // SEARCH INPUT
  const handleSearch = (e) => {

    setSearchTerm(e.target.value);
    setCurrentPage(0);

  };

  // PAGE CHANGE
  const goToPage = (page) => {

    setCurrentPage(page);

  };

  return (

    <div className="bus-page-container">

      {/* ADD ROUTE */}
      <div className="card">

        <h3>Add Route</h3>

        <form onSubmit={handleSubmit}>

          <input
            name="source"
            placeholder="Source"
            value={newRoute.source}
            onChange={handleChange}
            required
          />

          <input
            name="destination"
            placeholder="Destination"
            value={newRoute.destination}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="distance"
            placeholder="Distance (km)"
            value={newRoute.distance}
            onChange={handleChange}
            required
          />

          <button className="btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Route"}
          </button>

        </form>

      </div>

      {/* ROUTE TABLE */}
      <div className="bus-table-container">

        <div className="card">

          <h3>Route List</h3>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search source or destination"
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: "10px", width: "100%" }}
          />

          <table className="bus-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Distance</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {routes.length > 0 ? (

                routes.map(route => (

                  <tr key={route.routeId}>
                    <td>{route.routeId}</td>
                    <td>{route.source}</td>
                    <td>{route.destination}</td>
                    <td>{route.distance} km</td>
                    <td>

                      <button
                        className="btn-delete"
                        onClick={() => deleteRoute(route.routeId)}
                      >
                        Delete
                      </button>

                    </td>
                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="5">No routes found</td>
                </tr>

              )}

            </tbody>

          </table>

          {/* PAGINATION */}
          <div style={{ marginTop: "15px" }}>

            {[...Array(totalPages)].map((_, index) => (

              <button
                key={index}
                onClick={() => goToPage(index)}
                style={{
                  margin: "5px",
                  padding: "5px 10px",
                  background:
                    currentPage === index ? "#007bff" : "#ccc",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </button>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}
