import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

import "../../../shared/styles/auth.css";

import busBg from "../../../shared/assets/bus-bg.jpg";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    email: "",
    password: ""

  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
       console.log(res)
      // Store JWT token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      // Store user info
      localStorage.setItem("user", JSON.stringify(res.data.user));

       const role = res.data.role;
       console.log(role)
       if (role === "ADMIN") {

      navigate("/admin", { replace: true });

    }
    else {

      navigate("/", { replace: true });

    }
     

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

    <div
      className="auth-bg"
      style={{
        backgroundImage: `url(${busBg})`
      }}
    >

      <div className="auth-overlay">

        <div className="auth-card">

          <h2 className="auth-title">
            Welcome to Voyogo
          </h2>

          {error &&
            <div className="auth-error">
              {error}
            </div>
          }

          <form
            className="modern-form"
            onSubmit={handleLogin}
          >

            {/* Email */}

            <div className="form-group">

              <input
                type="email"
                name="email"
                required
                className="form-input"
                onChange={handleChange}
              />

              <label className="form-label">
                Email Address
              </label>

            </div>

            {/* Password */}

            <div className="form-group">

              <input
                type="password"
                name="password"
                required
                className="form-input"
                onChange={handleChange}
              />

              <label className="form-label">
                Password
              </label>

            </div>

            {/* Button */}

            <button
              className="modern-button"
              disabled={loading}
            >

              {loading
                ? "Logging in..."
                : "Login"}

            </button>

          </form>

          {/* Footer */}

          <p className="auth-footer">

            Don't have account?

            <span
              className="auth-link"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>

          </p>

        </div>

      </div>

    </div>

  );

}
