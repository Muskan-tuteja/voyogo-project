import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

import busBg from "../../../shared/assets/bus-bg.jpg";
import "../../../shared/styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.password)
      return "All fields are required";

    if (form.password.length < 6)
      return "Password must be at least 6 characters";

    if (form.password !== form.confirmPassword)
      return "Passwords do not match";

    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await axios.post("/auth/signup", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg" style={{ backgroundImage: `url(${busBg})` }}>
      <div className="auth-overlay">
        <div className="auth-card">
          <h2 className="auth-title">Join Voyogo</h2>

          {error && <div className="auth-error">{error}</div>}

          <form className="modern-form" onSubmit={handleSignup}>
            <div className="form-group">
              <input type="text" name="name" required className="form-input" onChange={handleChange} />
              <label className="form-label">Full Name</label>
            </div>

            <div className="form-group">
              <input type="email" name="email" required className="form-input" onChange={handleChange} />
              <label className="form-label">Email Address</label>
            </div>

            <div className="form-group">
              <input type="text" name="phone" required className="form-input" onChange={handleChange} />
              <label className="form-label">Phone Number</label>
            </div>

            <div className="form-group">
              <input type="password" name="password" required className="form-input" onChange={handleChange} />
              <label className="form-label">Password</label>
            </div>

            <div className="form-group">
              <input type="password" name="confirmPassword" required className="form-input" onChange={handleChange} />
              <label className="form-label">Confirm Password</label>
            </div>

            <button className="modern-button" disabled={loading}>
              {loading ? "Creating Account..." : "Signup"}
            </button>
          </form>

          <p className="auth-footer">
            Already have account?
            <span onClick={() => navigate("/login")} className="auth-link">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}