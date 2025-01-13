/**
 * Represents a single movie, including metadata and genre details.
 */
export interface MovieInterface {
  adult: boolean;
  backdrop_path: string | null; // Can be null if no backdrop is available
  genres: GenreInterface[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null; // Can be null if no poster is available
  release_date: string; // Use ISO date string for compatibility with APIs
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * Represents a paginated list of movies.
 */
export interface MovieListInterface {
  page: number;
  results: MovieInterface[];
  total_pages: number;
  total_results: number;
}

/**
 * Represents a single video related to a movie.
 */
export type VideoInterface = {
  id: string;
  key: string;
  name: string;
  type: "Trailer" | "Featurette" | "Behind the Scenes" | "Teaser";
};

/**
 * Represents a list of videos related to a movie.
 */
export interface VideosListInterface {
  id: number;
  results: VideoInterface[];
}

/**
 * Represents a single genre.
 */
export interface GenreInterface {
  id: number;
  name: string;
}

/**
 * Represents a list of genres.
 */
export interface GenreListInterface {
  genres: GenreInterface[];
}

/**
 * Represents a single actor in the cast of a movie.
 */
export interface ActorInterface {
  cast_id: number;
  character: string;
  credit_id: string;
  id: number;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null; // Can be null if no profile image is available
}

/**
 * Represents the credits of a movie, including the cast.
 */
export interface CreditsInterface {
  id: number;
  cast: ActorInterface[];
}
