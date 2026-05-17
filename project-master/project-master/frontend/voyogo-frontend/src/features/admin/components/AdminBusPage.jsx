import { useState } from "react";
import BusForm from "./BusForm";
import BusTable from "./BusTable.jsx";

export default function AdminBusPage() {

  const [refreshTrigger, setRefreshTrigger] = useState(false);

   const handleBusAdded = () => {
    setRefreshTrigger(prev => !prev);
  };
  return (
    <div className="bus-page-container">

  <BusForm onBusAdded={handleBusAdded}/>

  <div className="bus-table-container">

    <BusTable refreshTrigger={refreshTrigger}/>

  </div>

</div>
  );
}
