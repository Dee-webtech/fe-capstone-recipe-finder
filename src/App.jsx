import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

// ---------------- Landing Page ----------------
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div
      className="h-screen flex flex-col justify-center items-center text-white bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('src/assets/background.png')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-serif mb-4">Recipe Finder</h1>
        <p className="text-lg mb-6">Find recipes with what you already have</p>
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl shadow-lg"
        >
          Start Cooking
        </button>
      </div>
    </div>
  );
}

// ---------------- Home Page ----------------
function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Default recipes (samples to always display)
  const sampleRecipes = [
    {
      id: "1",
      title: "Veggie Pasta",
      image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    },
    {
      id: "2",
      title: "Chicken Curry",
      image: "https://www.themealdb.com/images/media/meals/1529446352.jpg",
    },
    {
      id: "3",
      title: "Chocolate Cake",
      image: "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg",
    },
    {
      id: "4",
      title: "Avocado Salad",
      image: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
    },
  ];

  // Fetch from API
  const fetchRecipes = async (ingredient) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await res.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]); // No results
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchRecipes(query);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recipe Finder</h2>
        <Link
          to="/"
          className="text-sm px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          Back to Landing
        </Link>
      </div>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 mb-6 max-w-lg mx-auto"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter some ingredients"
          className="flex-1 p-3 border rounded-lg shadow-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Search
        </button>
      </form>

      {/* Recipes Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(recipes.length > 0 ? recipes : sampleRecipes).map((recipe) => (
          <div
            key={recipe.idMeal || recipe.id}
            className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/recipe/${recipe.idMeal || recipe.id}`)}
          >
            <img
              src={recipe.strMealThumb || recipe.image}
              alt={recipe.strMeal || recipe.title}
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="p-3 text-center font-medium">
              {recipe.strMeal || recipe.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- Recipe Details ----------------
function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setRecipe(data.meals ? data.meals[0] : null);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div className="p-6">Loading recipe...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        ← Back
      </button>
      <h2 className="text-3xl font-bold mb-4">{recipe.strMeal}</h2>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full max-w-md rounded-xl mb-6"
      />
      <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc list-inside mb-6">
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];
          if (ingredient) {
            return (
              <li key={i}>
                {ingredient} - {measure}
              </li>
            );
          }
          return null;
        })}
      </ul>
      <h3 className="text-xl font-semibold mb-2">Instructions</h3>
      <p className="whitespace-pre-line">{recipe.strInstructions}</p>
    </div>
  );
}

// ---------------- App Wrapper ----------------
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
