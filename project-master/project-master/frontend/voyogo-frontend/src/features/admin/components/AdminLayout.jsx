import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-content">

        <Outlet />

      </main>

    </div>

  );

}
