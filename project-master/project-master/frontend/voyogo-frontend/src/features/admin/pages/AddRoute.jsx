import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../../../api/axios";

export default function AddRoute() {
  const [route, setRoute] = useState({
    source: "",
    destination: "",
    distance: 0,
    durationMinutes: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/admin/routes", route);

    alert("Route added");
  };

  return (
    <AdminLayout>
      <h2>Add Route</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          placeholder="Source"
          onChange={(e) => setRoute({ ...route, source: e.target.value })}
        />

        <input
          placeholder="Destination"
          onChange={(e) => setRoute({ ...route, destination: e.target.value })}
        />

        <button type="submit">Add Route</button>
      </form>
    </AdminLayout>
  );
}
