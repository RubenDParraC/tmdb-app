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
import { useRouter } from "next/navigation";

export default function Home() {
  const { language } = useLanguage();
  const router = useRouter();

  // State for pagination and search
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeQuery, setActiveQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Load search query from URL on component mount
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("query");
    if (query) {
      setSearchQuery(query);
      setActiveQuery(query);
      setIsSearching(true);
    }
  }, []);

  // Fetching movie data
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

  // Update the page title for SEO
  useEffect(() => {
    document.title = isSearching
      ? `${t("search_bar.seo_title", language)}: ${activeQuery}`
      : t("home.seo_title", language);
  }, [isSearching, activeQuery, language]);

  /**
   * Handles the search action.
   */
  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      setIsSearching(false);
      setActiveQuery("");
      setPage(1);
      router.push("/");
    } else {
      setIsSearching(true);
      setActiveQuery(searchQuery);
      setPage(1);

      // Update the query param in the URL
      const params = new URLSearchParams();
      params.set("query", searchQuery);
      router.push(`/?${params.toString()}`);
    }
  };

  // Show an error banner if data fetching fails
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

  // Show loading skeletons while data is being fetched
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
      {/* Search bar component */}
      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={(e) => setSearchQuery(e.target.value)}
        handleSearchClick={handleSearchClick}
      />

      {/* Top pagination component */}
      <Pagination
        page={page}
        setPage={setPage}
        total_pages={movies?.total_pages ?? 0}
      />

      {/* Banner for empty results */}
      {!movies?.results.length && (
        <AlertBanner
          variant="info"
          title={`${t("search_bar.banner_title", language)}: "${searchQuery}"`}
          description={t("search_bar.banner_description", language)}
        />
      )}

      {/* Movie list grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies?.results.map((movie: MovieInterface) => (
          <MovieItem key={`movie-${movie.id}`} movie={movie} />
        ))}
      </div>

      {/* Bottom pagination component */}
      <Pagination
        page={page}
        setPage={setPage}
        total_pages={movies?.total_pages ?? 0}
      />
    </div>
  );
}
