import React from "react";

function Search({ onSearchQueryChange }) {
  const handleSearchQueryChange = (event) => {
    onSearchQueryChange(event);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search exams"
        onChange={handleSearchQueryChange}
      />
    </div>
  );
}

export default Search;
