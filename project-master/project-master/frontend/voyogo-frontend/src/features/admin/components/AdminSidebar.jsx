import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../../shared/styles/admin.css";

export default function AdminSidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {

    localStorage.clear();
    navigate("/login");

  };

  const isActive = (path) =>
    location.pathname === path ? "admin-active" : "";

  return (

    <div className="admin-sidebar">

     

      <nav className="admin-nav">

        <Link className={isActive("/admin")}
              to="/admin">
          Dashboard
        </Link>

        <Link className={isActive("/admin/buses")}
              to="/admin/buses">
          Bus Management
        </Link>

        <Link className={isActive("/admin/routes")}
              to="/admin/routes">
          Route Management
        </Link>

        <Link className={isActive("/admin/trips")}
              to="/admin/trips">
          Create Trip
        </Link>

         <Link className={isActive("/admin/trips/table")}
              to="/admin/trips/table">
          Trips
        </Link>

        <Link className={isActive("/admin/bookings")}
              to="/admin/bookings">
          Bookings
        </Link>

      </nav>

   

    </div>

  );

}
