import { useState } from "react";
import IngredientsTag from "../components/IngredientsTag";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (ingredients) => {
    setLoading(true);
    try {
      // Fetch recipes for each ingredient
      const allResults = await Promise.all(
        ingredients.map(async (ing) => {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
          );
          const data = await res.json();
          return data.meals || [];
        })
      );

      // Find intersection (recipes containing all ingredients)
      const intersection = allResults.reduce((acc, list) => {
        if (acc === null) return list;
        return acc.filter((recipe) =>
          list.some((r) => r.idMeal === recipe.idMeal)
        );
      }, null);

      setRecipes(intersection || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <IngredientsTag onSearch={handleSearch} />
      {loading && <p className="text-gray-600 mt-4">Loading recipes...</p>}
      {!loading && recipes.length === 0 && (
        <p className="text-gray-500 mt-6">No recipes found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
