/**
 * Parameters required to fetch movie details.
 *
 * Example:
 * ```typescript
 * const params: MovieDetailsParams = { id: "12345" };
 * ```
 */
export interface MovieDetailsParams {
  /**
   * Unique identifier for the movie.
   */
  id: string;
}
