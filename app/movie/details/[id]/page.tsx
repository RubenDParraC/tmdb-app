"use client";

import { use, useEffect, useState } from "react";
import useSWR from "swr";
import { t } from "@/i18n/i18n";
import { fetcher } from "@/api/fetcher";

// Context
import { useLanguage } from "@/context/language-context/language-context";

// Types
import type { MovieDetailsParams } from "./types";
import type {
  CreditsInterface,
  GenreListInterface,
  MovieInterface,
  VideoInterface,
  VideosListInterface,
} from "@/app/interfaces";

// Utils
import { formatDate } from "@/app/utils";
import { getGenreNames, getTrailers } from "./utils";

// Components
import Modal from "@/components/modal/modal";
import Skeleton from "@/components/skeleton/skeleton";
import ActorItem from "@/components/actor-item/actor-item";
import GenreItem from "@/components/genre-item/genre-item";
import AlertBanner from "@/components/alert-banner/alert-banner";
import TrailerItem from "@/components/trailer-item/trailer-item";
import AddToFavorites from "@/components/add-to-favorites/add-to-favorites";

// External Components
import { FaEye, FaStar } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";

function MovieDetails({ params }: { params: Promise<MovieDetailsParams> }) {
  const { language } = useLanguage();

  // Desestructuramos el parámetro usando React.use()
  const { id: movieId } = use(params);

  const [isOpenTrailer, setIsOpenTrailer] = useState<boolean>(false);
  const [isOpenActors, setIsOpenActors] = useState<boolean>(false);
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);

  // Fetch genres, movie details, videos, and credits
  const {
    data: genres,
    error: genresError,
    isLoading: genresIsLoading,
  } = useSWR<GenreListInterface>(
    `/3/genre/movie/list?language=${language === "EN" ? "en" : "es"}`,
    fetcher
  );

  const {
    data: movie,
    error,
    isLoading,
  } = useSWR<MovieInterface>(
    movieId
      ? `/3/movie/${movieId}?language=${language === "EN" ? "en-US" : "es-CO"}`
      : null,
    fetcher
  );

  const {
    data: videos,
    error: videoError,
    isLoading: videoLoading,
  } = useSWR<VideosListInterface>(
    movieId
      ? `/3/movie/${movieId}/videos?language=${
          language === "EN" ? "en-US" : "es-CO"
        }`
      : null,
    fetcher
  );

  const {
    data: credits,
    error: creditsError,
    isLoading: creditsLoading,
  } = useSWR<CreditsInterface>(
    movieId
      ? `/3/movie/${movieId}/credits?language=${
          language === "EN" ? "en-US" : "es-CO"
        }`
      : null,
    fetcher
  );

  const trailers: VideoInterface[] = videos ? getTrailers(videos) : [];
  const genresFiltered = genres
    ? getGenreNames(movie?.genres || [], genres.genres)
    : [];

  // SEO: Dynamically update page title and meta description
  useEffect(() => {
    if (movie) {
      document.title = movie.title;
      const metaDescription = document.querySelector(
        "meta[name='description']"
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          movie.overview || "Movie details page."
        );
      }
    }
  }, [movie]);

  // Handle loading state
  if (isLoading || videoLoading || genresIsLoading || creditsLoading) {
    return (
      <div className="w-full flex flex-col p-10 md:px-24 md:py-16">
        <Skeleton className="h-[500px]" />
        <Skeleton className="h-6 mt-5" />
        <div className="flex flex-row items-center justify-between mt-3">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  // Handle errors
  if (error || videoError || genresError || creditsError) {
    return (
      <div className="w-full h-screen flex justify-center items-center p-10 md:px-24 md:py-16">
        <AlertBanner
          title={t("error.title", language)}
          description={t("error.description", language)}
        />
      </div>
    );
  }

  return (
    <div className="md:pt-16">
      <div
        style={{
          backgroundImage: movie
            ? `url(https://image.tmdb.org/t/p/original${movie.poster_path})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
        className="flex items-center justify-center w-full bg-slate-600"
      >
        <div className="w-full min-h-[600px] max-h-[600px] md:min-h-screen md:max-h-none p-10 md:px-24 md:py-16 flex flex-col justify-end md:justify-center items-end bg-gradient-to-r from-[rgba(50,50,50,0.4)] to-[rgba(0,0,0,1)] overflow-y-auto hide-scrollbar">
          <div className="w-full lg:w-1/2 flex flex-col items-center md:items-end">
            <h2 className="hidden md:block text-xl md:text-3xl font-bold text-white">
              {movie?.title}
            </h2>
            {movie && (
              <span className="hidden md:block text-xs text-white mt-4">
                {formatDate(movie.release_date)}
              </span>
            )}
            <div className="flex flex-row items-center mt-2">
              <div className="flex flex-row items-center border-r-2 pr-4 mr-4 border-r-purple-600 gap-2">
                <FaStar className="h-8 w-8 text-yellow-300" />
                {movie && (
                  <span className="text-xl font-bold text-white">
                    {Math.ceil(movie.vote_average)}
                  </span>
                )}
              </div>
              {movie ? <AddToFavorites movie={movie} /> : null}
            </div>
            <p className="hidden md:block text-base text-white text-end mt-8">
              {movie?.overview}
            </p>
            <div className="hidden md:flex flex-wrap gap-5 mt-4">
              {genresFiltered.map((genre) => (
                <GenreItem key={`genre-${genre.id}`} genre={genre} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsOpenActors(true)}
              className="flex flex-row items-center gap-2 text-white my-8 p-2 px-4 border-b-2 hover:border-b-purple-600 hover:text-purple-300"
            >
              {t("details.button_cast", language)}
              <FaEye className="w-4 h-4" />
            </button>
            <div className="flex flex-row items-center gap-3 p-4 bg-purple-600 rounded-xl shadow-md hover:shadow-purple-300 cursor-pointer">
              <FaCirclePlay className="w-5 h-5 text-white" />
              <span className="text-sm md:text-base text-white font-bold uppercase">
                {t("details.button", language)}
              </span>
            </div>
            {trailers.length ? (
              <span className=" hidden md:block text-xl md:text-3xl text-white font-bold mt-5">
                {t("details.trailers", language)}
              </span>
            ) : null}
            <div className="w-full hidden md:flex flex-col md:items-end gap-5 mt-3 cursor-pointer">
              {trailers.map((trailer) => (
                <TrailerItem
                  key={`trailer-${trailer.id}`}
                  trailer={trailer}
                  setIsOpenTrailer={setIsOpenTrailer}
                  setSelectedTrailer={setSelectedTrailer}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:hidden flex-col w-full p-8">
        <h2 className="text-xl md:text-xl font-bold text-white">
          {movie?.title}
        </h2>
        {movie && (
          <span className="text-xs text-white mt-2">
            {formatDate(movie.release_date)}
          </span>
        )}
        <p className="text-sm text-white text-justify my-8">
          {movie?.overview}
        </p>
        <div className="flex md:hidden flex-wrap gap-5">
          {genresFiltered.map((genre) => (
            <GenreItem key={`genre-${genre.id}`} genre={genre} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIsOpenActors(true)}
          className="flex flex-row items-center gap-2 my-8 p-2 px-4 border-b-2 border-b-purple-600 text-purple-300"
        >
          {t("details.button_cast", language)}
          <FaEye className="w-4 h-4" />
        </button>
        {trailers.length ? (
          <span className="text-xl md:text-3xl text-white font-bold">
            {t("details.trailers", language)}
          </span>
        ) : null}
        <div className="w-full flex flex-col gap-5 mt-3">
          {trailers.map((trailer) => (
            <TrailerItem
              key={`trailer-${trailer.id}`}
              trailer={trailer}
              setIsOpenTrailer={setIsOpenTrailer}
              setSelectedTrailer={setSelectedTrailer}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isOpenTrailer} setIsOpen={setIsOpenTrailer}>
        <iframe
          width="100%"
          height="90%"
          src={`https://www.youtube.com/embed/${selectedTrailer}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </Modal>
      <Modal
        isOpen={isOpenActors}
        setIsOpen={setIsOpenActors}
        className="md:max-w-[60%] h-[600px]"
      >
        <div className="flex flex-col gap-5">
          {credits?.cast.map((actor) => (
            <div key={`actor-${actor.id}`} className="w-full">
              <ActorItem actor={actor} />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default MovieDetails;
