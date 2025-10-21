import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import bg from "../assets/background.png";
import Header from "../components/Header";


export default function Home() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    fetchMeals("chicken");
  }, []);

  const fetchMeals = async (q) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      console.error("MealDB error:", err);
      setRecipes([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    fetchMeals(search.trim());
  };

  const handleFavorite = (recipe) => {
    const exists = favorites.some((f) => f.idMeal === recipe.idMeal);
    let updated;
    if (exists) {
      updated = favorites.filter((f) => f.idMeal !== recipe.idMeal);
    } else {
      updated = [...favorites, recipe];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (id) => favorites.some((f) => f.idMeal === id);

  return (
  <div>
    {/* Hero Section */}
    <header
      className="relative h-[56vh] md:h-[63vh] flex items-center pt-10"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.75)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-4xl mx-auto text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
          Recipe Finder
        </h1>
        <p className="text-white mt-3 mb-6 max-w-2xl mx-auto leading-relaxed">
          Not sure what to make today? Discover recipes with what you already have.
          Search by ingredient or recipe name to get started.
        </p>
        
       <form
  onSubmit={handleSearch}
  className="mx-auto max-w-xl flex flex-col sm:flex-row items-center rounded-full overflow-hidden shadow-md bg-white/90"
>
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search recipes (e.g., chicken, pasta, curry)..."
    className="flex-1 w-full sm:w-auto min-w-[150px] px-4 py-3 text-sm sm:text-base bg-transparent focus:outline-none rounded-t-full sm:rounded-t-none sm:rounded-l-full"
  />
  <button
    type="submit"
    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold flex items-center justify-center gap-2 w-full sm:w-auto rounded-b-full sm:rounded-b-none sm:rounded-r-full"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
    Search
  </button>
</form>

</div>
 </header>

      {/* Recipe Cards Section */}
      <main className="max-w-6xl mx-auto px-6 -mt-8"> {/* pull up cards */} 
        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {recipes.length === 0 ? (
            <div className="col-span-full text-center p-8 bg-white/90 rounded-2xl shadow">
              <p className="text-gray-600">No recipes found. Try another search.</p>
            </div>
          ) : (
            recipes.map((r) => (
              <RecipeCard
                key={r.idMeal}
                recipe={r}
                onFavorite={handleFavorite}
                isFavorite={isFavorite(r.idMeal)}
              />
            ))
          )}
        </section>

        {/* Favorites Section */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-teal-700">Favorites</h2>
            <a href="/favorites" className="text-sm text-orange-500 font-medium hover:underline">
              View all
            </a>
          </div>

          {favorites.length === 0 ? (
            <p className="text-gray-600">You have no saved recipes yet.</p>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {favorites.slice(0, 6).map((f) => (
                <div key={f.idMeal} className="rounded-xl overflow-hidden shadow bg-white/95">
                  <img src={f.strMealThumb} alt={f.strMeal} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <div className="font-medium text-teal-700">{f.strMeal}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      {/* Footer */}
<footer className="bg-gray-800 text-gray-200 mt-16 py-2">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h3 className="text-lg font-semibold text-orange-400">Recipe Finder</h3>
    <p className="mt-2 text-sm text-gray-400">
      Carefully Created by Dev. Delight Chinecherem — Powered by TheMealDB API
    </p>
    <p className="mt-2 text-xs text-gray-500">
      © {new Date().getFullYear()} All rights reserved.
    </p>
  </div>
</footer>

    </div>
  );
}
