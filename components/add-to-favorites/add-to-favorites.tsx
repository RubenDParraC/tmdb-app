import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

// types
import type { MovieInterface } from "@/app/interfaces";
import type { AddToFavoritesType } from "./types";

// external components
import { FaHeart } from "react-icons/fa";

function AddToFavorites({ movie }: AddToFavoritesType) {
  // State to check if the movie is already in favorites
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Retrieve the list of favorite movies from localStorage (if available)
    const existingFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    // Check if the movie is already in the list
    const isAlreadyFavorite = existingFavorites.some(
      (fav: MovieInterface) => fav.id === movie.id
    );

    // Update the state
    setIsFavorite(isAlreadyFavorite);
  }, [movie]);

  const handleAddToFavorites = () => {
    // Retrieve the list of favorite movies from localStorage (if available)
    const existingFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (isFavorite) {
      // If the movie is in favorites, remove it
      const updatedFavorites = existingFavorites.filter(
        (fav: MovieInterface) => fav.id !== movie.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false); // Update the state
    } else {
      // If the movie is not in favorites, add it
      existingFavorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(existingFavorites));
      setIsFavorite(true);
    }
  };

  return (
    <div className="w-min h-9 bg-slate-200 p-2 rounded-full hover:shadow-md hover:shadow-purple-600">
      <button type="button" onClick={handleAddToFavorites}>
        <FaHeart
          className={twMerge(
            isFavorite ? "text-red-600" : "text-zinc-500", // Conditional classes based on favorite status
            "h-5 w-5"
          )}
        />
      </button>
    </div>
  );
}

export default AddToFavorites;
