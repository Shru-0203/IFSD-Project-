import React from 'react';
import { Link } from 'react-router-dom';

export default function HotelCard({ hotel }) {
  return (
    <div className="hotel-card" style={{
      border: '1px solid #e6e6e6', borderRadius: 8, padding: 14, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, alignItems: 'center'
    }}>
      <div style={{ minWidth: 140, height: 100, background:'#f8f8f8', borderRadius:6, display:'flex',alignItems:'center',justifyContent:'center' }}>
        {hotel.images && hotel.images[0] ? <img src={hotel.images[0]} alt={hotel.name} style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:6 }} /> : <div style={{color:'#999'}}>No Image</div>}
      </div>
      <div>
        <h3 style={{ margin: 0 }}>{hotel.name}</h3>
        <p style={{ margin: '6px 0' }}>{hotel.city} • {hotel.address}</p>
        <p style={{ margin: '6px 0', color:'#555' }}>{hotel.description?.slice(0,160)}</p>
        <div style={{ marginTop: 8 }}>
          <Link to={`/hotels/${hotel._id}`} style={{ textDecoration:'none', color:'#0b6efd' }}>View rooms & book →</Link>
        </div>
      </div>
    </div>
  );
}
