import { useStore } from '@nanostores/react';

import { favourites, toggleFavourite } from '../stores/favourites';

interface FavouriteButtonProps {
  bookId: string;
  title: string;
}

// Estrella para marcar o desmarcar un libro como favorito
export function FavouriteButton({ bookId, title }: FavouriteButtonProps) {
  const isFavourite = useStore(favourites).includes(bookId);

  return (
    <button
      type="button"
      className="secondary favourite"
      aria-pressed={isFavourite}
      aria-label={isFavourite ? `Quitar "${title}" de favoritos` : `Añadir "${title}" a favoritos`}
      title={isFavourite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      onClick={() => toggleFavourite(bookId)}
    >
      {isFavourite ? '★' : '☆'}
    </button>
  );
}
