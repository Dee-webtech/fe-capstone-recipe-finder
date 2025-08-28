export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Recipe Finder</h1>
      <ul className="flex space-x-6">
        <li><a href="/" className="hover:text-yellow-400">Home</a></li>
        <li><a href="/home" className="hover:text-yellow-400">Recipes</a></li>
      </ul>
    </nav>
  );
}
