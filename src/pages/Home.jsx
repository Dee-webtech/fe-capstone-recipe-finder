import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (ingredients) => {
    setLoading(true);
    try {
      const ingredient = ingredients.split(",")[0].trim();
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="text-gray-600">Loading recipes...</p>}
      {!loading && recipes.length === 0 && <p className="text-gray-500 mt-6">No recipes yet. Try searching!</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
