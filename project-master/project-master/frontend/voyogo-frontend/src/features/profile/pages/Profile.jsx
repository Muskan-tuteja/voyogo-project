import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../api/axios";

import "../../../shared/styles/auth.css";
import "../../../shared/styles/profile.css";

import busBg from "../../../shared/assets/bus-bg.jpg";
import defaultAvatar from "../../../shared/assets/default-avatar.png";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          localStorage.clear();
          navigate("/login", { replace: true });
          return;
        }

        const response = await api.get("/users/profile");
        setUser(response.data);
        setError("");
      } catch (err) {
        console.error("Profile error:", err);

        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.clear();
          navigate("/login", { replace: true });
        } else {
          setError("Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="auth-bg" style={{ backgroundImage: `url(${busBg})` }}>
        <div className="auth-overlay">
          <div className="profile-card">
            <h2>Loading profile...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-bg" style={{ backgroundImage: `url(${busBg})` }}>
        <div className="auth-overlay">
          <div className="profile-card">
            <h2 className="profile-error">{error}</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-bg" style={{ backgroundImage: `url(${busBg})` }}>
      <div className="auth-overlay">
        <div className="profile-card">
          <div className="profile-avatar-container">
            <img src={user?.profilePic || defaultAvatar} className="profile-avatar" alt="profile" />
          </div>

          <h2 className="profile-name">{user?.name || "User"}</h2>

          <div className="profile-info">
            <div className="profile-row">
              <span>Email</span>
              <span>{user?.email || "-"}</span>
            </div>

            <div className="profile-row">
              <span>Phone</span>
              <span>{user?.phone || "-"}</span>
            </div>

            <div className="profile-row">
              <span>Role</span>
              <span>{user?.role || "-"}</span>
            </div>

            <div className="profile-row">
              <span>Member Since</span>
              <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</span>
            </div>
          </div>

          <button className="profile-button" onClick={() => alert("Edit profile coming soon")}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}