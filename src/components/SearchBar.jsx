export default function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e.target.elements.ingredients.value);
  };

  return (
    <form className="flex mb-6" onSubmit={handleSubmit}>
      <input
        name="ingredients"
        type="text"
        placeholder="Enter ingredients separated by comma..."
        className="flex-grow p-2 border rounded-l-lg focus:outline-none"
      />
      <button className="bg-yellow-400 text-gray-900 px-4 rounded-r-lg hover:bg-yellow-500">
        Search
      </button>
    </form>
  );
}
