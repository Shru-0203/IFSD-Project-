import { useEffect, useState } from "react";
import api from "../services/api";
import "./Hotels.css";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await api.get("/hotels");
      setHotels(res.data.hotels);
    }
    load();
  }, []);

  return (
    <section id="hotels">
      <h2 className="section-title">Explore Our Luxury Hotels</h2>

      <div className="hotel-grid">
        {hotels.length === 0 ? (
          <p>Loading hotels...</p>
        ) : (
          hotels.map(hotel => (
            <div className="hotel-card" key={hotel._id}>
              <img src={hotel.images[0]} alt={hotel.name} />
              <h3>{hotel.name}</h3>
              <p>{hotel.city}</p>
              <p>⭐ {hotel.rating}</p>
              <p><b>₹ {hotel.price}</b> / night</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
