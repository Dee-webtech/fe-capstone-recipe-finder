import React from "react";
import Header from "../components/Header";

const Favorites = ({ favorites, onRecipeClick, removeFavorite }) => {
  if (!favorites || favorites.length === 0) {
    return (
      <div>
        <Header />
        <p className="text-center text-gray-600 mt-24">
          You haven’t added any favorites yet ❤️
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="mt-24 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Your Favorite Recipes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favorites.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-56 object-cover"
                onClick={() => onRecipeClick(recipe.idMeal)}
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  {recipe.strMeal}
                </h3>
                <button
                  onClick={() => removeFavorite(recipe.idMeal)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Remove 💔
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
