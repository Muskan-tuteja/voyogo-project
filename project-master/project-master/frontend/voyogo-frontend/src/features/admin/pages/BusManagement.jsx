import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../../../api/axios";

export default function BusManagement() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get("/admin/buses");
      setBuses(res.data);
    })();
  }, []);

  return (
    <AdminLayout>
      <h2>Bus Management</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Bus No</th>
            <th>Name</th>
            <th>Type</th>
            <th>Capacity</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((bus) => (
            <tr key={bus.busNo}>
              <td>{bus.busNo}</td>
              <td>{bus.busName}</td>
              <td>{bus.busType}</td>
              <td>{bus.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
