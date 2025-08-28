import { Link } from "react-router-dom";
import bg from "../assets/cooking-bg.jpg";

export default function Landing() {
  return (
    <div className="h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6">
        <h1 className="text-5xl font-bold mb-4">Recipe Finder</h1>
        <p className="text-xl mb-6">Find recipes with the ingredients you already have</p>
        <Link
          to="/home"
          className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-500"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
