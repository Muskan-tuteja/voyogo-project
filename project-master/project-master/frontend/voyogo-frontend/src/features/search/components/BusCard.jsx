import { useNavigate } from "react-router-dom";

export default function BusCard({ bus }) {

  const navigate = useNavigate();

  return (

    <div className="bg-white shadow p-4 rounded mb-4">

      <div className="flex justify-between">

        <div>

          <h2 className="font-bold text-lg">
            {bus.name}
          </h2>

          <p>
            {bus.from} → {bus.to}
          </p>

          <p>
            {bus.departureTime} - {bus.arrivalTime}
          </p>

        </div>

        <div className="text-right">

          <p className="text-xl font-bold">
            ₹{bus.price}
          </p>

          <button
            className="bg-red-600 text-white px-4 py-2 mt-2"
            onClick={() =>
              navigate(`/seats/${bus.id}`)}
          >
            View Seats
          </button>

        </div>

      </div>

    </div>

  );

}
