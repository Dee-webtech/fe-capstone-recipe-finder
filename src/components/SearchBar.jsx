function SearchBar({ onSearch }) {
  return (
    <div className="flex mb-6">
      <input
        type="text"
        placeholder="Search recipes by ingredient..."
        className="flex-grow p-2 border rounded-l-lg focus:outline-none"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
