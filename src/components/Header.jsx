import beaverparkslogo from "../assets/images/beaverparkslogo.png"; // Import local image

function Header({ searchTerm, setSearchTerm }) {
  return (
  <header className="app-header">
  <div className="left-section">
    <div className="logo-container">
      <h1>BeaverParks</h1>
      <img 
        src={beaverparkslogo} 
        alt="logo for BeaverParks" 
        className="logo-img"
      />
    </div>

    <p className="tagline">Find open parking at OSU.</p>
  </div>

  <input
    className="search-input"
    type="text"
    placeholder="Search for a parking lot..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />
  </header>
  );
}

export default Header;