import React from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe, onFavorite, isFavorite }) => {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-xl overflow-hidden shadow-lg bg-white/95 hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg">{recipe.strMeal}</h3>

        <div className="flex justify-between items-center mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              onFavorite(recipe);
            }}
            className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition"
          >
            <Heart fill={isFavorite ? "red" : "transparent"} />
            <span className="text-sm font-medium">Favorites</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/recipe/${recipe.idMeal}`);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded-md font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
