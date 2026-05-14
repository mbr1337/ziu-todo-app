import { useInfiniteQuery } from "@tanstack/react-query";
import { tmdbClient } from "../api/tmdbClient";
import type { Movie } from "./useFetchMovies";

interface MoviesPage {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export function useInfiniteMovies(query = "") {
  const isSearch = query.trim().length > 0;

  return useInfiniteQuery({
    queryKey: ["movies", "infinite", query],
    queryFn: async ({ pageParam }) => {
      const endpoint = isSearch ? "/search/movie" : "/movie/popular";
      const params: Record<string, string | number> = { page: pageParam as number };
      if (isSearch) params.query = query;
      const { data } = await tmdbClient.get<MoviesPage>(endpoint, { params });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: !isSearch || query.trim().length >= 2,
  });
}
