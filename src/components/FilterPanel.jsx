function FilterPanel({
    typeFilter,
    setTypeFilter,
    locationFilter,
    setLocationFilter,
    capacityFilter,
    setCapacityFilter,
    sortOption,
    setSortOption,
    onClearFilters,
}) {
    return (
        <aside className="filter-panel">
            <div className="filter-header">
                <h2>Filters</h2>
                <button className="clear-filters-button" onClick={onClearFilters}>
                    Clear
                </button>
            </div>

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
                <select
                    value={locationFilter}
                    onChange={(event) => setLocationFilter(event.target.value)}
                >
                    <option value="all">All Locations</option>
                    <option value="Reser Stadium">Reser Stadium</option>
                    <option value="LaSells Stewart Center">LaSells Stewart Center</option>
                </select>
            </label>

            <label>
                Capacity
                <select
                    value={capacityFilter}
                    onChange={(event) => setCapacityFilter(event.target.value)}
                >
                    <option value="all">Any Capacity</option>
                    <option value="small">Small: under 50</option>
                    <option value="medium">Medium: 50–150</option>
                    <option value="large">Large: 150+</option>
                </select>
            </label>

            <label>
                Sort By
                <select
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value)}
                >
                    <option value="highest-capacity">Highest Capacity</option>
                    <option value="az">A–Z</option>
                </select>
            </label>
        </aside>
    );
}

export default FilterPanel;
