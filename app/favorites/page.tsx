"use client";

import { useEffect, useState } from "react";
import { t } from "@/i18n/i18n";

// types
import type { MovieInterface } from "@/app/interfaces";

// components
import MovieItem from "@/components/movie-item/movie-item";
import AlertBanner from "@/components/alert-banner/alert-banner";
import Skeleton from "@/components/skeleton/skeleton";

// external components
import { MdFavorite } from "react-icons/md";

// context
import { useLanguage } from "@/context/language-context/language-context";

function Favorites() {
  const { language } = useLanguage();
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedMovies = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        ) as MovieInterface[];
        setMovies(storedMovies);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Show an error banner if an error occurs
  if (error) {
    return (
      <div className="w-full flex justify-center p-10 md:px-24 md:py-16 mt-16">
        <AlertBanner
          variant="error"
          title={t("error.title", language)}
          description={t("error.description", language)}
        />
      </div>
    );
  }

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 gap-y-12 p-10 md:px-24 md:py-16 mt-16">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={+index} className="flex flex-col items-center gap-4">
            <Skeleton className="h-[330px]" />
            <Skeleton className="h-6" />
            <Skeleton className="h-4" />
          </div>
        ))}
      </div>
    );
  }

  // Show alert banner if no favorites are found
  if (!movies.length) {
    return (
      <div className="w-full flex justify-center p-10 md:px-24 md:py-16 mt-16">
        <AlertBanner
          variant="info"
          title={t("favorites.info_title", language)}
          description={t("favorites.info_description", language)}
        />
      </div>
    );
  }

  // Render the list of favorite movies
  return (
    <div className="w-full flex flex-col gap-8 p-10 md:px-24 md:py-16 mt-16">
      {/* Section title with icon */}
      <div className="flex flex-row items-center gap-2 md:gap-4">
        <MdFavorite className="h-6 md:h-10 w-6 md:w-10 text-purple-600" />
        <h1 className="text-lg md:text-4xl font-bold text-white">
          {t("favorites.info_title", language)}
        </h1>
      </div>
      {/* Grid of movies */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie: MovieInterface) => (
          <MovieItem key={`movie-${movie.id}`} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
