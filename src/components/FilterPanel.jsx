function FilterPanel({ typeFilter, setTypeFilter }) {
  return (
    <aside className="filter-panel">
      <h2>Filters</h2>

      <label>
        Parking Type
        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
        >
          <option value="all">All Lots</option>
          <option value="A">A Lots</option>
          <option value="B">B Lots</option>
          <option value="C">C Lots</option>
        </select>
      </label>

      <label>
        Location
        <select disabled>
          <option>Reser Stadium Area</option>
        </select>
      </label>

      <label>
        Capacity
        <select disabled>
          <option>Any Capacity</option>
        </select>
      </label>
    </aside>
  );
}

export default FilterPanel;