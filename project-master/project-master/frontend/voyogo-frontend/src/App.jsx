import "./shared/styles/global.css";
import "./shared/styles/layout.css";
import "./shared/styles/components.css";
import "./shared/styles/timeline.css";
import "./shared/styles/admin.css";

import Navbar from "./shared/components/layout/Navbar";

import AdminBusPage from "./features/admin/components/AdminBusPage";
import RouteManagement from "./features/admin/pages/RouteManagement";
import CreateTrip from "./features/admin/pages/CreateTrip";
import BookingManagement from "./features/admin/pages/BookingManagement";
import AdminDashboard from "./features/admin/pages/AdminDashboard";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./features/auth/pages/SignUp";
import Login from "./features/auth/pages/Login";
import Profile from "./features/profile/pages/Profile";
import Home from "./features/search/pages/Home";
import Splash from "./features/auth/pages/Splash";

import AdminLayout from "./features/admin/components/AdminLayout";
import TripTable from "./features/admin/pages/TripTable";
import SearchResults from "./features/search/pages/SearchResults";
import SeatSelection from "./features/booking/components/SeatSelection";
import PassengerDetails from "./features/booking/components/PassengerDetails";
import PaymentPage from "./features/booking/components/PaymentPage";
import BookingSuccess from "./features/booking/pages/BookingSuccess";
import ViewMyBookings from "./features/booking/pages/ViewMyBookings";
import Ticket from "./features/booking/pages/Ticket";

import "react-toastify/dist/ReactToastify.css";
import AboutPage from "./shared/components/layout/AboutPage";
import HelpPage from "./shared/components/layout/HelpPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}

        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/search" element={<SearchResults />} />

        <Route path="/splash" element={<Splash />} />

        <Route path="/seats" element={<SeatSelection />} />

        <Route path="/passenger" element={<PassengerDetails />} />

        <Route path="/payment" element={<PaymentPage />} />

        <Route path="/booking-success" element={<BookingSuccess />} />

        <Route path="/booking-history" element={<ViewMyBookings />} />
        <Route path="/cancel-ticket" element={<Ticket />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />
        {/* ADMIN ROUTES (SIMPLE VERSION) */}

        <Route path="/admin" element={<AdminLayout />}>
          {/* Dashboard */}
          <Route index element={<AdminDashboard />} />

          {/* Sidebar pages */}
          <Route path="buses" element={<AdminBusPage />} />

          <Route path="routes" element={<RouteManagement />} />

          <Route path="trips" element={<CreateTrip />} />
          <Route path="trips/table" element={<TripTable />} />

          <Route path="bookings" element={<BookingManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
