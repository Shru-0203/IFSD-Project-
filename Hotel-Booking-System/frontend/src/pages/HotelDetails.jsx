import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HotelDetails(){
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    if(!id) return;
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/hotels/${id}`);
        if(!res.ok) throw new Error("Hotel not found");
        setHotel(await res.json());
      } catch(err) {
        console.error(err);
      }
    })();
  }, [id]);

  if(!hotel) return <div style={{padding:20}}>Loading hotel...</div>;

  return (
    <section style={{ paddingTop:100 }}>
      <h2>{hotel.name}</h2>
      <img src={hotel.image} alt={hotel.name} style={{ maxWidth:"100%", height:300, objectFit:"cover" }} />
      <p>{hotel.description}</p>
      {/* rooms / booking UI will go here */}
    </section>
  );
}
