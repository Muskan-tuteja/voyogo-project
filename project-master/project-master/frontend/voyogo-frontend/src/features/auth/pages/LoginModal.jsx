import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import "../../../shared/styles/auth-modal.css";

export default function LoginModal({ isOpen, onClose }) {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.role;

      onClose(); // close modal

      if (role === "ADMIN")
        navigate("/admin");
      else
        navigate("/");

    }
    catch (err) {

      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );

    }
    finally {
      setLoading(false);
    }
  };

  return (

    <div className="modal-overlay">

      <div className="modal-card">

        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Login to Voyogo</h2>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>

  );
}