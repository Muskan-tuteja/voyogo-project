import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import "../../../shared/styles/admin.css";

export default function BusTable({refreshTrigger}) {

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchBuses();

  }, [refreshTrigger]);

  const fetchBuses = async () => {

    try {

      const res = await axios.get("/admin/buses");
     
      setBuses(res.data);

    }
    catch (err) {

      console.error("Failed to fetch buses", err);

    }
    finally {

      setLoading(false);

    }

  };

  const deleteBus = async (busNo) => {

    if (!window.confirm("Delete this bus?")) return;

    try {

      await axios.delete(`/admin/buses/${busNo}`);

      setBuses(prev =>
        prev.filter(bus => bus.busNo !== busNo)
      );

    }
    catch {

      alert("Failed to delete bus");

    }

  };

  if (loading) {

    return <div className="card">Loading buses...</div>;

  }

  return (

    <div className="card bus-table-container">

      <h3>Bus List</h3>

      <table className="bus-table">

        <thead>

          <tr>

            <th>Bus No</th>
            <th>Bus Name</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {buses.map(bus => (

            <tr key={bus.busNo}>

              <td>{bus.busNo}</td>

              <td>{bus.busName}</td>

              <td>{bus.busType}</td>

              <td>{bus.capacity}</td>

              <td>

                <button
                  className="btn-delete"
                  onClick={() =>
                    deleteBus(bus.busNo)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
