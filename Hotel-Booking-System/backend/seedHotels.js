import mongoose from "mongoose";
import dotenv from "dotenv";
import Hotel from "./models/Hotel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Hotel.deleteMany();

  await Hotel.insertMany([
    {
      name: "Taj Palace",
      city: "Delhi",
      rating: 4.7,
      images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"]
    },
    {
      name: "The Oberoi",
      city: "Delhi",
      rating: 4.8,
      images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"]
    },
    {
      name: "Leela Palace",
      city: "Bangalore",
      rating: 4.9,
      images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461"]
    },
    {
      name: "Marriott",
      city: "Pune",
      rating: 4.6,
      images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32"]
    },
    {
      name: "Hyatt Regency",
      city: "Kolkata",
      rating: 4.5,
      images: ["https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc="]
    },
    {
      name: "ITC Grand Chola",
      city: "Chennai",
      rating: 4.8,
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjD4MlMirRYKTcvEAVigz2eyoMVFJbCt2Zrg&s"]
    },
    {
      name: "Trident",
      city: "Jaipur",
      rating: 4.6,
      images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427"]
    },
    {
      name: "Novotel",
      city: "Hyderabad",
      rating: 4.4,
      images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d"]
    },
    {
      name: "Holiday Inn Resort",
      city: "Goa",
      rating: 4.7,
      images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be"]
    },
    {
      name: "Radisson Blu",
      city: "Ahmedabad",
      rating: 4.3,
      images: ["https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2023/07/ROYAL-SUITE-AT-HOTEL-PLAZA-ATHENEE.jpg"]
    },
    {
      name: "JW Marriott",
      city: "Chandigarh",
      rating: 4.8,
      images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"]
    },
    {
      name: "Lalit Ashok",
      city: "Bangalore",
      rating: 4.4,
      images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"]
    },
    {
      name: "The Park",
      city: "Vizag",
      rating: 4.2,
      images: ["https://cdn.luxe.digital/media/20230830105612/most-expensive-hotels-atlantis-the-royal-dubai-luxe-digital-780x520.jpg"]
    },
    {
      name: "Four Seasons",
      city: "Mumbai",
      rating: 4.9,
      images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"]
    },
    {
      name: "Vivanta",
      city: "Delhi",
      rating: 4.7,
      images: ["https://cdn.luxe.digital/media/20240606052713/most-expensive-hotels-luxe-digital-1-1200x600.jpg"]
    }
  ]);

  console.log("✅ 15 Hotels added successfully!");
  mongoose.connection.close();
});
