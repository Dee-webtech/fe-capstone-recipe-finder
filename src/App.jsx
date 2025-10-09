import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import RecipeDetails from "./pages/RecipeDetails";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-teal-50 to-white">
      <Header /> {/* Global Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}
