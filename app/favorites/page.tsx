"use client";

import { useEffect, useState } from "react";
import { t } from "@/i18n/i18n";

// types
import type { MovieInterface } from "@/app/interfaces";

// components
import MovieItem from "@/components/movie-item/movie-item";
import AlertBanner from "@/components/alert-banner/alert-banner";
import Skeleton from "@/components/skeleton/skeleton";
import SearchBar from "@/components/search-bar/search-bar";
import Pagination from "@/components/pagination/pagination";

// external components
import { MdFavorite } from "react-icons/md";

// context
import { useLanguage } from "@/context/language-context/language-context";

function Favorites() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const moviesPerPage = 20;

  /**
   * Handles the search bar input change.
   * @param e - Input change event.
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Activates search based on the entered query.
   */
  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      const storedMovies = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      ) as MovieInterface[];
      setMovies(storedMovies);
    } else {
      setMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    setPage(1);
  };

  // Get movies of localstorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedMovies = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        ) as MovieInterface[];
        setMovies(storedMovies);
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Paginate movies
  const displayedMovies = movies.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );

  // SEO: Dynamically update page title and meta description
  useEffect(() => {
    document.title = t("favorites.info_title", language);
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        t("favorites.info_description", language)
      );
    }
  }, [language]);

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

  return (
    <div className="w-full flex flex-col gap-8 p-10 md:px-24 md:py-16 mt-16">
      {/* Section title with icon */}
      <div className="flex flex-row items-center gap-2 md:gap-4">
        <MdFavorite className="h-6 md:h-10 w-6 md:w-10 text-purple-600" />
        <h1 className="text-lg md:text-4xl font-bold text-white">
          {t("favorites.info_title", language)}
        </h1>
      </div>
      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleSearchClick={handleSearchClick}
      />

      {/* Top pagination component */}
      <Pagination
        page={page}
        setPage={setPage}
        total_pages={Math.ceil(movies.length / moviesPerPage)}
      />

      {/* Grid of movies */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {displayedMovies.map((movie: MovieInterface) => (
          <MovieItem key={`movie-${movie.id}`} movie={movie} />
        ))}
      </div>

      {/* Bottom pagination component */}
      <Pagination
        page={page}
        setPage={setPage}
        total_pages={Math.ceil(movies.length / moviesPerPage)}
      />
    </div>
  );
}

export default Favorites;
