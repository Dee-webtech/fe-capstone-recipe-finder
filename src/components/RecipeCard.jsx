function RecipeCard({ recipe }) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
      <p className="text-sm text-gray-600">{recipe.ingredients.join(", ")}</p>
      <button className="mt-2 text-sm text-blue-600 hover:underline">
        View Details
      </button>
    </div>
  );
}

export default RecipeCard;
