const MOVIES = [
  { id: 1, title: "Inception", genre: "Sci-Fi" },
  { id: 2, title: "The Matrix", genre: "Sci-Fi" },
  { id: 3, title: "Interstellar", genre: "Sci-Fi" },
  { id: 4, title: "Tenet", genre: "Sci-Fi" },
  { id: 5, title: "Dune", genre: "Sci-Fi" }
];

export async function fetchCatalog() {
  // Simulate network/API delay
  await new Promise(r => setTimeout(r, 250));
  return MOVIES;
}

export function getTitles(movies) {
  return movies.map(m => m.title);
}

