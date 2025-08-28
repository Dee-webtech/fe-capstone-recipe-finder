import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setRecipe(data.meals[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <p className="p-6">Loading recipe...</p>;
  if (!recipe) return <p className="p-6">Recipe not found!</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate("/home")}
        className="mb-4 text-blue-600 hover:underline"
      >
        &lt; Back to recipes
      </button>
      <h2 className="text-2xl font-bold mb-4">{recipe.strMeal}</h2>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="rounded-lg mb-6 w-full"
      />
      <p className="mb-4">
        <strong>Category:</strong> {recipe.strCategory}
      </p>
      <p className="mb-4">
        <strong>Area:</strong> {recipe.strArea}
      </p>

      <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc list-inside mb-6">
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];
          return (
            ingredient && (
              <li key={i}>
                {ingredient} - {measure}
              </li>
            )
          );
        })}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Instructions</h3>
      <p className="whitespace-pre-line">{recipe.strInstructions}</p>
    </div>
  );
}
