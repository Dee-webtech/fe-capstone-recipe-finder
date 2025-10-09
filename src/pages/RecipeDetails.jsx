import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setRecipe(data.meals ? data.meals[0] : null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="p-10 text-center">Loading recipe...</p>;

  // Build ingredients list
  const ingredients = Array.from({ length: 20 })
    .map((_, i) => ({
      ingredient: recipe[`strIngredient${i + 1}`],
      measure: recipe[`strMeasure${i + 1}`],
    }))
    .filter((x) => x.ingredient && x.ingredient.trim() !== "");

  // Split instructions into numbered steps by periods and newlines
  const raw = recipe.strInstructions || "";
  const instructions = raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .flatMap((line) => line.split(/(?<=\.)\s+/)) // split sentences
    .filter(Boolean);

  return (
    <div className="pt-20 px-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-teal-600 text-white px-4 py-2 rounded-md"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-teal-700 mb-4">{recipe.strMeal}</h1>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full max-w-3xl mx-auto rounded-2xl mb-6 object-cover shadow-lg"
      />

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-orange-600 mb-3">Ingredients</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          {ingredients.map((it, idx) => (
            <li key={idx}>
              {it.ingredient} {it.measure ? `- ${it.measure}` : ""}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-orange-600 mb-3">Instructions</h2>
        <ol className="list-decimal pl-6 text-gray-700 space-y-3">
          {instructions.map((step, i) => (
            <li key={i} className="leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
