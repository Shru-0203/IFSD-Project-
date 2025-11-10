import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Hotels /> {/* ✅ Hotels now shows dynamically */}
      <Booking />
      <About />
      <Contact />
    </>
  );
}
