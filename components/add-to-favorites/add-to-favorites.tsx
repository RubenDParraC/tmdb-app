import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

// types
import type { MovieInterface } from "@/app/interfaces";
import type { AddToFavoritesType } from "./types";

// external components
import { FaHeart } from "react-icons/fa";

function AddToFavorites({ movie }: AddToFavoritesType) {
  // Estado para verificar si la película está en favoritos
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Obtener el arreglo de películas del localStorage (si existe)
    const existingFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    // Verificar si la película ya está en el arreglo
    const isAlreadyFavorite = existingFavorites.some(
      (fav: MovieInterface) => fav.id === movie.id
    );

    // Actualizar el estado
    setIsFavorite(isAlreadyFavorite);
  }, [movie]);

  const handleAddToFavorites = () => {
    // Obtener el arreglo de películas del localStorage (si existe)
    const existingFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (isFavorite) {
      // Si la película está en favoritos, eliminarla
      const updatedFavorites = existingFavorites.filter(
        (fav: MovieInterface) => fav.id !== movie.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false); // Actualizar el estado
    } else {
      // Si no está en favoritos, agregarla
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
            isFavorite ? "text-red-600" : "text-zinc-500",
            "h-5 w-5"
          )}
        />
      </button>
    </div>
  );
}

export default AddToFavorites;
