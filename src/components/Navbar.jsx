function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Recipe Finder 🍳</h1>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">Favorites</a></li>
          <li><a href="#" className="hover:underline">Add Recipe</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
