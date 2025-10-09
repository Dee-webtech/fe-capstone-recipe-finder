import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setShowThankYou(true);

    // Hide thank-you after 2 seconds, then close popup
    setTimeout(() => {
      setShowThankYou(false);
      setShowFeedback(false);
    }, 2000);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link to="/" className="text-orange-500 font-bold text-xl">
            RSF
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>
            <Link to="/favorites" className="hover:text-orange-500">
              Favorites
            </Link>
            <button
              onClick={() => setShowFeedback(true)}
              className="hover:text-orange-500"
            >
              Feedback
            </button>
          </div>
        </div>
      </header>

      {/* Feedback Popup */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowFeedback(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-orange-500"
            >
              ✕
            </button>

            {!showThankYou ? (
              <>
                <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">
                  We value your feedback 💬
                </h2>

                <form
                  action="https://formspree.io/f/mgvnlqqb"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-4"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <textarea
                    name="message"
                    placeholder="Write your feedback..."
                    rows="4"
                    required
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-2"
                  >
                    Submit Feedback
                  </button>
                </form>
              </>
            ) : (
              <p className="text-green-600 font-semibold text-center mt-6 text-lg">
                 Your feedback is well appreciated!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
