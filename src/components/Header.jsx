function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="app-header">
      <div>
        <h1>BeaverParks</h1>
        <p>Find open parking around OSU.</p>
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