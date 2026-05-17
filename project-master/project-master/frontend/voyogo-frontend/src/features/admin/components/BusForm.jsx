import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import "../../../shared/styles/admin.css";

export default function BusForm({ onBusAdded }) {

  const [busTypes, setBusTypes] = useState([]);

  const [bus, setBus] = useState({

    busNo: "",
    busName: "",
    busType: "",
    capacity: ""

  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* Load enum values */

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/admin/bus-types");
        setBusTypes(res.data);

        if (res.data.length > 0) {
          setBus((prev) => ({
            ...prev,
            busType: res.data[0],
          }));
        }
      } catch (error) {
        console.error(error);
      }
    })();

  }, []);

  const handleChange = (e) => {

    setBus({

      ...bus,
      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post("/admin/buses", bus);

      setMessage("Bus added successfully");
      setError("");
      onBusAdded();

    }
    catch(err) {
      console.log(err)
      setError(err.data);
      setMessage("");

    }

  };

  return (

    <div className="card">

      <h3>Add Bus</h3>

      {message && <div className="success-msg">{message}</div>}
      {error && <div className="error-msg">{error}</div>}

      <form onSubmit={handleSubmit}>

        <input
          name="busNo"
          placeholder="Bus Number"
          value={bus.busNo}
          onChange={handleChange}
          required
        />

        <input
          name="busName"
          placeholder="Bus Name"
          value={bus.busName}
          onChange={handleChange}
          required
        />

        {/* Dynamic Enum Dropdown */}

        <select
          name="busType"
          value={bus.busType}
          onChange={handleChange}
          required
        >

          {busTypes.map(type => (

            <option key={type} value={type}>

              {type}

            </option>

          ))}

        </select>

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={bus.capacity}
          onChange={handleChange}
          required
        />

        <button className="btn-primary">

          Add Bus

        </button>

      </form>

    </div>

  );

}
