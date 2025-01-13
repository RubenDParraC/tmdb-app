// types
import type {
  GenreInterface,
  VideoInterface,
  VideosListInterface,
} from "@/app/interfaces";

/**
 * Extracts all trailers from the given list of videos.
 *
 * @param videos - List of videos with metadata.
 * @returns An array of videos marked as trailers.
 * @throws Will throw an error if `videos.results` is not an array.
 */
export function getTrailers(videos: VideosListInterface): VideoInterface[] {
  if (!Array.isArray(videos.results)) {
    throw new Error("Invalid videos list: 'results' must be an array.");
  }

  return videos.results.filter((video) => video.type === "Trailer");
}

/**
 * Filters genre IDs to match a list of valid genres.
 *
 * @param ids - List of genres to validate.
 * @param genres - Master list of available genres.
 * @returns An array of genres that match the provided IDs.
 * @throws Will throw an error if inputs are not arrays or are empty.
 */
export const getGenreNames = (
  ids: GenreInterface[],
  genres: GenreInterface[]
): GenreInterface[] => {
  if (!Array.isArray(ids) || !Array.isArray(genres)) {
    throw new Error("Invalid input: both 'ids' and 'genres' must be arrays.");
  }

  return ids.filter((idGenre) =>
    genres.some((genre) => genre.id === idGenre.id)
  );
};
