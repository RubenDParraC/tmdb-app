// types
import type {
  GenreInterface,
  VideoInterface,
  VideosListInterface,
} from "@/app/interfaces";

export function getTrailers(videos: VideosListInterface): VideoInterface[] {
  return videos.results.filter((video) => video.type === "Trailer");
}

export const getGenreNames = (
  ids: GenreInterface[],
  genres: GenreInterface[]
): GenreInterface[] =>
  ids.filter((idGenre) => genres.some((genre) => genre.id === idGenre.id));
