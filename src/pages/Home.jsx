import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [recipes] = useState([
    { title: "Jollof Rice", ingredients: ["Rice", "Tomato", "Pepper"] },
    { title: "Egusi Soup", ingredients: ["Egusi", "Spinach", "Palm oil"] },
  ]);
  const [query, setQuery] = useState("");

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={setQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((r, i) => (
          <RecipeCard key={i} recipe={r} />
        ))}
      </div>
    </div>
  );
}

export default Home;
