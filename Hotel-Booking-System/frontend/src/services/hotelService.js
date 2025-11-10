import api from "./api";

export const getHotels = async () => {
  const response = await api.get("/api/hotels");
  return response.data.hotels;
};
