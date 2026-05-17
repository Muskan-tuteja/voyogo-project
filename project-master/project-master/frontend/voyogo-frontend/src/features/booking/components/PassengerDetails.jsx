import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../../shared/styles/passenger.css";

export default function PassengerDetails() {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    tripId,
    selectedSeatDetails,
    totalAmount
  } = location.state || {};

  const [passengers, setPassengers] = useState(

    selectedSeatDetails.map(seat => ({
      seatId: seat.seatId,
      seatNumber: seat.seatNumber,
      name: "",
      age: "",
      gender: "MALE"
    }))

  );


  // Handle input change
  const handleChange = (
    index,
    field,
    value
  ) => {

    const updated = [...passengers];

    updated[index][field] = value;

    setPassengers(updated);

  };


  // Validate
  const validate = () => {

    for (let p of passengers) {

      if (!p.name || !p.age)
        return false;

    }

    return true;

  };


  // Continue to payment
  const handleContinue = () => {

    if (!validate()) {

      alert(
        "Please fill all passenger details"
      );

      return;

    }

    navigate("/payment", {

      state: {
        tripId,
        passengers,
        totalAmount
      }

    });

  };


  return (

    <div className="passenger-container">


      {/* LEFT SIDE */}
      <div className="passenger-left">

        <h2>
          Passenger Details
        </h2>


        {passengers.map((p, index) => (

          <div
            key={p.seatId}
            className="passenger-card"
          >

            <div className="seat-title">

              Seat {p.seatNumber}

            </div>


            <input
              type="text"
              placeholder="Passenger Name"
              value={p.name}
              onChange={(e) =>
                handleChange(
                  index,
                  "name",
                  e.target.value
                )
              }
            />


            <input
              type="number"
              placeholder="Age"
              value={p.age}
              onChange={(e) =>
                handleChange(
                  index,
                  "age",
                  e.target.value
                )
              }
            />


            <select
              value={p.gender}
              onChange={(e) =>
                handleChange(
                  index,
                  "gender",
                  e.target.value
                )
              }
            >

              <option value="MALE">
                Male
              </option>

              <option value="FEMALE">
                Female
              </option>

              <option value="OTHER">
                Other
              </option>

            </select>

          </div>

        ))}

      </div>



      {/* RIGHT SIDE SUMMARY */}
      <div className="passenger-right">

        <div className="fare-card">

          <h3>Booking Summary</h3>


          {selectedSeatDetails.map(seat => (

            <div key={seat.seatId}
                 className="seat-item">

              Seat {seat.seatNumber}

              <span>
                ₹{seat.price}
              </span>

            </div>

          ))}


          <hr />


          <div className="fare-total">

            Total: ₹{totalAmount}

          </div>


          <button
            className="booking-btn"
            onClick={handleContinue}
          >

            Continue to Payment

          </button>

        </div>

      </div>


    </div>

  );

}
