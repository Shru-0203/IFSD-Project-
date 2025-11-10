import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h2>Welcome to StayScape</h2>
        <p>Your next destination for comfort, luxury, and technology.</p>
        <a href="#hotels">
          <button className="btn explore">Explore Hotels</button>
        </a>
      </div>
    </section>
  );
}
