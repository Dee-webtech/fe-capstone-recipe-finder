import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="rounded-lg mb-3" />
      <h3 className="font-bold text-lg mb-2">{recipe.strMeal}</h3>
      <Link
        to={`/recipe/${recipe.idMeal}`}
        className="text-blue-600 hover:underline text-sm"
      >
        View Recipe
      </Link>
    </div>
  );
}
