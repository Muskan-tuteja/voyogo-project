import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../../../api/axios";

export default function AddBus() {
  const [bus, setBus] = useState({
    busNo: "",
    busName: "",
    busType: "AC",
    capacity: 25,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/admin/buses", bus);

    alert("Bus added successfully");
  };

  return (
    <AdminLayout>
      <h2>Add Bus</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          placeholder="Bus Number"
          onChange={(e) => setBus({ ...bus, busNo: e.target.value })}
        />

        <input
          placeholder="Bus Name"
          onChange={(e) => setBus({ ...bus, busName: e.target.value })}
        />

        <button type="submit">Add Bus</button>
      </form>
    </AdminLayout>
  );
}
