export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_API_READ_ACCESS_TOKEN,
  HEADERS: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_READ_ACCESS_TOKEN}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  // Define the endpoint that we're calling
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  // We've to get the response of that call
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.HEADERS,
  });
  if (!response.ok) {
    // This id 'cause we assume there allways be a responseText
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  //   If all its OK we can extract data from response
  const data = await response.json();

  //   data.results its whats is previusly defined on API reference so we shorten the responde a litte bit (we do not bring back the page number result)
  return data.results;
};

// const url = 'https://api.themoviedb.org/3/discover/movie';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer '
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
