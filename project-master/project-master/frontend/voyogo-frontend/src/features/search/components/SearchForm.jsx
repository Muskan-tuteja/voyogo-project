import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";
import "../../../shared/styles/home.css";

export default function SearchForm() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    from: "",
    to: "",
    date: ""
  });

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  // Handle input change
  const handleChange = async (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    // Fetch suggestions for FROM
    if (name === "from" && value.length >= 2) {

      const response = await api.get(
        `buses/suggestions/source?keyword=${value}`
      );

      setFromSuggestions(response.data);

    } else if (name === "to" && value.length >= 2) {

      // Fetch suggestions for TO
      const response = await api.get(
        `buses/suggestions/destination?keyword=${value}`
      );

      setToSuggestions(response.data);

    } else {

      setFromSuggestions([]);
      setToSuggestions([]);

    }

  };

  // Select suggestion
  const selectSuggestion = (type, value) => {

    setForm({
      ...form,
      [type]: value
    });

    if (type === "from") setFromSuggestions([]);
    if (type === "to") setToSuggestions([]);

  };

  // Search submit
  const handleSearch = (e) => {

    e.preventDefault();

    if (!form.from || !form.to || !form.date) {

      alert("Please fill all fields");
      return;

    }

    navigate("/search", {
      state: form
    });

  };

  return (

    <form className="search-form" onSubmit={handleSearch}>

      {/* FROM */}
      <div className="search-group">

        <label>From</label>
         <div className="autocomplete-wrapper">

        <input
          name="from"
          value={form.from}
          placeholder="Enter city"
          onChange={handleChange}
          autoComplete="off"
        />

        {fromSuggestions.length > 0 && (
         
          <div className="suggestion-dropdown">

            {fromSuggestions.map((item, index) => (

              <div
                key={index}
                className="suggestion-item"
                onClick={() => selectSuggestion("from", item)}
              >
                {item}
              </div>

            ))}

          </div>

        )}

      </div>
     </div>
      {/* TO */}
      <div className="search-group">

        <label>To</label>
         <div className="autocomplete-wrapper">
        <input
          name="to"
          value={form.to}
          placeholder="Enter destination"
          onChange={handleChange}
          autoComplete="off"
        />

        {toSuggestions.length > 0 && (

          <div className="suggestion-dropdown">

            {toSuggestions.map((item, index) => (

              <div
                key={index}
                className="suggestion-item"
                onClick={() => selectSuggestion("to", item)}
              >
                {item}
              </div>

            ))}

          </div>

        )}

      </div>
</div>
      {/* DATE */}
      <div className="search-group">

        <label>Date</label>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

      </div>

      <button className="search-button">
        Search Buses
      </button>

    </form>

  );

}
