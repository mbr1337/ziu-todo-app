import { http, HttpResponse } from "msw";

const TMDB_BASE =
  import.meta.env.VITE_TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

export const handlers = [
  http.get(`${TMDB_BASE}/movie/popular`, () => {
    return HttpResponse.json(
      {
        status_code: 7,
        status_message: "Nieprawidłowy klucz API. Brak dostępu do zasobów.",
        success: false,
      },
      { status: 401 }
    );
  }),
];
