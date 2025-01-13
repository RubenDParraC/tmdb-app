// components
import Link from "next/link";
import Image from "next/image";
import AddToFavorites from "../add-to-favorites/add-to-favorites";

// types
import type { MovieItemTypes } from "./types";

// utils
import { formatDate } from "@/app/utils";

// external components
import { FaEye, FaStar } from "react-icons/fa";

function MovieItem({ movie }: MovieItemTypes) {
  return (
    <div className="relative w-full hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-md hover:shadow-purple-600">
      <div className="w-full">
        <div className="overflow-hidden rounded-lg">
          {/* Render movie poster or a fallback image if not available */}
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[417px] object-cover"
              width={220}
              height={330}
              quality={100}
              priority
            />
          ) : (
            <Image
              src="https://ih1.redbubble.net/image.4905811447.8675/cposter,large,product,750x1000.2.webp"
              alt={movie.title}
              className="w-full h-[417px] object-cover"
              width={220}
              height={330}
              quality={100}
              priority
            />
          )}
        </div>
      </div>

      {/* Link to the movie details page */}
      <Link
        href={`/movie/details/${movie.id}`}
        className="absolute inset-0 z-10 flex flex-col items-center justify-end p-4"
      >
        <div className="w-full min-h-20 p-2 bg-zinc-800 bg-opacity-50 backdrop-blur-sm rounded-xl">
          <h1 className="text-base text-white font-bold overflow-hidden whitespace-nowrap text-ellipsis w-full">
            {movie.title}
          </h1>
          <div className="w-full flex flex-row justify-between items-center">
            <span className="text-xs text-white">
              {formatDate(movie.release_date)}{" "}
              {/* Format and display the release date */}
            </span>
            <div className="flex flex-row items-center gap-2">
              <span className="text-sm font-bold text-white">
                {Math.ceil(movie.vote_average)}{" "}
                {/* Display rounded vote average */}
              </span>
              <FaStar className="h-5 w-5 text-yellow-300" /> {/* Star icon */}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-2">
            <FaEye className="h-4 w-4 text-white" />{" "}
            {/* Eye icon for popularity */}
            <span className="text-xs text-white">{movie.popularity}</span>
          </div>
        </div>
      </Link>

      {/* Add to favorites button */}
      <div className="absolute inset-0 z-20 p-4 h-14 w-14 justify-self-end">
        <div className="flex justify-end w-full">
          <AddToFavorites movie={movie} />{" "}
          {/* Component to add movie to favorites */}
        </div>
      </div>
    </div>
  );
}

export default MovieItem;
