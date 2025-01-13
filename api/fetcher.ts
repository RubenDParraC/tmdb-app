/**
 * Fetcher utility to interact with the TMDb API.
 *
 * Example:
 * ```typescript
 * const data = await fetcher<Movie>("movies/popular");
 * ```
 * @param url - The endpoint to fetch data from (relative to the base API URL).
 * @returns Parsed JSON response.
 * @throws Will throw an error if the fetch fails, the environment variables are not configured, or the response is not OK.
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  if (!url) {
    throw new Error("URL parameter is required.");
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  if (!process.env.NEXT_PUBLIC_BEARER_TMDB) {
    throw new Error("Bearer token is not defined in environment variables.");
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TMDB}`,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText} - ${errorDetails}`
      );
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error("Error in fetcher:", error);
    throw error;
  }
};
