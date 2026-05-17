import SearchForm from "../components/SearchForm";

import busBg from "../../../shared/assets/bus-bg.jpg";

import "../../../shared/styles/home.css";
import "../../../shared/styles/auth.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

   const navigate = useNavigate();

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role === "ADMIN") {

      navigate("/admin");

    }

  }, []);

  return (

    <div
      className="home-container"
      style={{
        backgroundImage: `url(${busBg})`
      }}
    >

      {/* Dark overlay */}

      <div className="home-overlay">

        {/* Hero content */}

        <div className="home-content">

          <h1 className="home-title">

            Book Your Journey with Voyogo

          </h1>

          <p className="home-subtitle">

            Fast • Secure • Reliable Bus Booking

          </p>

          {/* Search Form */}

          <SearchForm />

        </div>

      </div>

    </div>

  );

}
