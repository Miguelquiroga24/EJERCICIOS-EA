import { atom } from 'nanostores';

const KEY = 'favourite-books';

// Ids de los libros favoritos. Es un atom global (igual que el modo de vista), así el botón de
// cada libro y la lista de favoritos leen el mismo valor y se actualizan a la vez.
function loadFavourites(): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    // localStorage no disponible o con algo raro: se empieza sin favoritos
    return [];
  }
}

export const favourites = atom<string[]>(loadFavourites());

// Se guardan en el navegador para que sigan ahí al recargar la página
favourites.listen((ids) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // da igual si no se puede guardar
  }
});

// Si el libro ya era favorito lo quita y si no lo añade
export function toggleFavourite(bookId: string) {
  const ids = favourites.get();
  favourites.set(ids.includes(bookId) ? ids.filter((id) => id !== bookId) : [...ids, bookId]);
}
