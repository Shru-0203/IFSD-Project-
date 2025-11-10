import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function BookingModal({ room, hotelId, onClose, onBooked }) {
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleCheck = async () => {
    setError('');
    if (!checkin || !checkout) return setError('Select check-in and check-out');
    try {
      const resp = await api.get(`/bookings/availability`, { params: { roomId: room._id, checkin, checkout }});
      return resp.data;
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error checking availability');
    }
  };

  const handleBook = async () => {
    setError('');
    if (!user) return setError('Please login to book');
    setLoading(true);
    try {
      // re-check availability before booking
      const avail = await handleCheck();
      if (!avail || avail.available <= 0) {
        setError('No availability for selected dates');
        setLoading(false);
        return;
      }
      const resp = await api.post('/bookings', {
        roomId: room._id,
        hotelId,
        checkinDate: checkin,
        checkoutDate: checkout
      });
      setLoading(false);
      onBooked(resp.data);
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div style={{ position:'fixed', inset:0, display:'flex',alignItems:'center',justifyContent:'center', background:'rgba(0,0,0,0.4)' }}>
      <div style={{ width: 520, background:'#fff', padding:20, borderRadius:8 }}>
        <h3>Book: {room.name}</h3>
        <p>Price per night: ₹{room.pricePerNight}</p>
        <label>Check-in</label>
        <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} />
        <label>Check-out</label>
        <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} />
        {error && <p style={{ color:'crimson' }}>{error}</p>}
        <div style={{ display:'flex', gap:10, marginTop:12 }}>
          <button onClick={handleBook} disabled={loading}>{loading ? 'Booking...' : 'Confirm booking'}</button>
          <button onClick={onClose} style={{ background:'#eee' }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
