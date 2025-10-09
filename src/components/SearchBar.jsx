import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
