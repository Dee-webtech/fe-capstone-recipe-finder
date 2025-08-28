import { useNavigate } from "react-router-dom";
import cookingBg from "../assets/cooking-bg.jpg";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${cookingBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative text-center text-white px-4">
        <h1 className="text-5xl font-serif mb-4">Recipe Finder</h1>
        <p className="text-lg mb-6">Find recipes with what you already have</p>
        <button
          onClick={() => navigate("/home")}
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
        >
          Start Cooking
        </button>
      </div>
    </div>
  );
}
