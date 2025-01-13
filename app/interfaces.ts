export interface MovieInterface {
  adult: boolean;
  backdrop_path: string;
  genres: GenreInterface[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieListInterface {
  page: number;
  results: MovieInterface[];
  total_pages: number;
  total_results: number;
}

export type VideoInterface = {
  id: string;
  key: string;
  name: string;
  type: "Trailer" | "Featurette" | "Behind the Scenes" | "Teaser";
};

export interface VideosListInterface {
  id: number;
  results: VideoInterface[];
}

export interface GenreInterface {
  id: number;
  name: string;
}

export interface GenreListInterface {
  genres: GenreInterface[];
}

export interface ActorInterface {
  cast_id: number;
  character: string;
  credit_id: string;
  id: number;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface CreditsInterface {
  id: number;
  cast: ActorInterface[];
}
