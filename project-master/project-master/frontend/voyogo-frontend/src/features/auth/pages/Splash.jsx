import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../../shared/assets/anv.png";

import "../../../shared/styles/splash.css";

export default function Splash() {

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {

      navigate("/");

    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);

  }, [navigate]);

  return (

    <div className="splash-container">

      <img
        src={logo}
        alt="Voyogo"
        className="splash-logo"
      />

      <h1 className="splash-text">

        VOYOGO

      </h1>

    </div>

  );

}
