import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f.idMeal !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="pt-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">My Favorites ❤️</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">You have no favorites yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((f) => (
            <div key={f.idMeal} className="relative">
              <RecipeCard
                recipe={f}
                onFavorite={() => {}}
                isFavorite={true}
              />
              <button
                onClick={() => removeFavorite(f.idMeal)}
                className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
