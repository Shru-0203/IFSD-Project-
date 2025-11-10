import { useState, useEffect } from "react";
import api from "../services/api";

export default function Booking() {
  const [hotels, setHotels] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    hotel: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadHotels() {
      try {
        const res = await api.get("/hotels"); // ✅ FIXED
        setHotels(res.data.hotels);
        console.log("Hotels Loaded:", res.data.hotels);
      } catch (error) {
        console.error("Error loading hotels:", error);
      }
    }
    loadHotels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/bookings", form); // ✅ FIXED
      setMessage("🎉 Booking Successful ✅");
      setForm({
        name: "",
        email: "",
        checkIn: "",
        checkOut: "",
        hotel: ""
      });
    } catch (err) {
      setMessage("❌ Booking Failed");
    }
  };

  return (
    <section id="booking">
      <h2 className="section-title">Book Your Stay</h2>

      {message && <p className="booking-msg">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="date"
          required
          value={form.checkIn}
          onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
        />

        <input
          type="date"
          required
          value={form.checkOut}
          onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
        />

        <select
          required
          value={form.hotel}
          onChange={(e) => setForm({ ...form, hotel: e.target.value })}
        >
          <option value="">Select Hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel._id} value={hotel._id}>
              {hotel.name}
            </option>
          ))}
        </select>

        <button className="btn" type="submit">
          Confirm Booking
        </button>
      </form>
    </section>
  );
}

