import { useState } from "react";

export default function IngredientsTag({ onSearch }) {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = (e) => {
    e.preventDefault();
    if (input.trim() && !ingredients.includes(input.trim())) {
      setIngredients([...ingredients, input.trim()]);
      setInput("");
    }
  };

  const removeIngredient = (item) => {
    setIngredients(ingredients.filter((ing) => ing !== item));
  };

  const searchRecipes = () => {
    if (ingredients.length > 0) {
      onSearch(ingredients);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <form
        onSubmit={addIngredient}
        className="flex items-center border rounded-lg overflow-hidden"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter an ingredient (e.g., egg)"
          className="flex-1 px-4 py-2 outline-none"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
        >
          Add
        </button>
      </form>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {ingredients.map((item, index) => (
          <span
            key={index}
            className="bg-green-200 text-green-800 px-3 py-1 rounded-full flex items-center"
          >
            {item}
            <button
              onClick={() => removeIngredient(item)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      <button
        onClick={searchRecipes}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Search Recipes
      </button>
    </div>
  );
}
