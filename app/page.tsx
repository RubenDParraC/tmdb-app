"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { t } from "@/i18n/i18n";
import { fetcher } from "../api/fetcher";

// Components
import Skeleton from "@/components/skeleton/skeleton";
import SearchBar from "@/components/search-bar/search-bar";
import MovieItem from "@/components/movie-item/movie-item";
import Pagination from "@/components/pagination/pagination";
import AlertBanner from "@/components/alert-banner/alert-banner";

// Context
import { useLanguage } from "@/context/language-context/language-context";

// Types
import type { MovieInterface, MovieListInterface } from "./interfaces";

export default function Home() {
  const { language } = useLanguage();

  // Estado para paginación y búsqueda
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeQuery, setActiveQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Fetch de películas
  const {
    data: movies,
    error,
    isLoading,
  } = useSWR<MovieListInterface>(
    isSearching
      ? `/3/search/movie?query=${encodeURIComponent(
          activeQuery.trim()
        )}&include_adult=false&language=${
          language === "EN" ? "en-US" : "es-CO"
        }&page=${page}`
      : `/3/movie/popular?language=${
          language === "EN" ? "en-US" : "es-CO"
        }&page=${page}`,
    fetcher,
    { revalidateOnFocus: true }
  );

  // Actualización del título de la página para SEO
  useEffect(() => {
    document.title = isSearching
      ? `${t("search_bar.seo_title", language)}: ${activeQuery}`
      : t("home.seo_title", language);
  }, [isSearching, activeQuery, language]);

  /**
   * Maneja el cambio de la barra de búsqueda.
   * @param e - Evento de cambio de input.
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Activa la búsqueda basada en el query ingresado.
   */
  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      setIsSearching(false);
      setActiveQuery("");
      setPage(1);
    } else {
      setIsSearching(true);
      setActiveQuery(searchQuery);
      setPage(1);
    }
  };

  // Muestra un banner de error si ocurre un problema al cargar datos
  if (error) {
    return (
      <div className="w-full flex justify-center p-10 md:px-24 md:py-16 mt-16">
        <AlertBanner
          title={t("error.title", language)}
          description={t("error.description", language)}
        />
      </div>
    );
  }

  // Muestra los placeholders de carga mientras se obtienen los datos
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

  return (
    <div className="w-full flex flex-col gap-8 p-10 md:px-24 md:py-16 mt-16">
      {/* Barra de búsqueda */}
      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleSearchClick={handleSearchClick}
      />

      {/* Paginación superior */}
      <Pagination
        page={page}
        setPage={setPage}
        total_pages={movies?.total_pages ?? 0}
      />

      {/* Banner de resultados vacíos */}
      {!movies?.results.length && (
        <AlertBanner
          variant="info"
          title={`${t("search_bar.banner_title", language)}: "${searchQuery}"`}
          description={t("search_bar.banner_description", language)}
        />
      )}

      {/* Lista de películas */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies?.results.map((movie) => (
          <MovieItem key={`movie-${movie.id}`} movie={movie} />
        ))}
      </div>

      {/* Paginación inferior */}
      <Pagination
        page={page}
        setPage={setPage}
        total_pages={movies?.total_pages ?? 0}
      />
    </div>
  );
}
