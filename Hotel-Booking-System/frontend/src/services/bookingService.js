import api from "./api";

// ✅ Function to send booking to backend API
export const createBooking = async (bookingData) => {
  return await api.post("/bookings", bookingData);
};
