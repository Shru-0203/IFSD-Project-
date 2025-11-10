export default function Navbar() {
  return (
    <header>
      <div className="logo">
        <img src="https://cdn-icons-png.flaticon.com/512/235/235861.png" alt="logo" />
        <h1>StayScape</h1>
      </div>
      <nav>
        <a href="#home">Home</a>
        <a href="#hotels">Hotels</a>
        <a href="#booking">Book</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
