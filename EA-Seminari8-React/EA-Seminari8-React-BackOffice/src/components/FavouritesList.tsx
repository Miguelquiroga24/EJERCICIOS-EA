import { useStore } from '@nanostores/react';
import { Link } from 'react-router-dom';

import { useApiList } from '../hooks/useApiList';
import type { Book } from '../models';
import { bookService } from '../services/book.service';
import { favourites } from '../stores/favourites';
import { formatPrice, languageName } from '../utils/format';
import { FavouriteButton } from './FavouriteButton';

function authorNames(book: Book) {
  return book.authors.length > 0 ? book.authors.map((author) => author.name).join(', ') : null;
}

// Muestra solo los libros marcados como favoritos
export function FavouritesList() {
  const favouriteIds = useStore(favourites);
  const { items: books, loading, error } = useApiList(bookService.getBooks);

  // La API no sabe de favoritos: pido todos los libros y me quedo con los marcados
  const favouriteBooks = books.filter((book) => favouriteIds.includes(book._id));

  return (
    <>
      <div className="page-header">
        <h1>Favoritos</h1>
      </div>

      {error && <p className="alert">{error}</p>}

      {loading && <p className="muted">Cargando...</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Título</th>
              <th>Autores</th>
              <th>Idioma</th>
              <th>Año</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {favouriteBooks.map((book) => (
              <tr key={book._id}>
                <td>
                  <img
                    className="cover"
                    src={`https://picsum.photos/seed/${book._id}/60/80`}
                    alt={`Portada de ${book.title}`}
                  />
                </td>
                <td>{book.title}</td>
                <td>{authorNames(book) ?? <span className="muted">Sin autores</span>}</td>
                <td>{languageName(book.language)}</td>
                <td>{book.publishedYear}</td>
                <td>{formatPrice(book.price)}</td>
                <td className="actions">
                  <FavouriteButton bookId={book._id} title={book.title} />
                </td>
              </tr>
            ))}
            {favouriteBooks.length === 0 && (
              <tr>
                <td className="empty" colSpan={7}>
                  Todavía no tienes libros favoritos. Márcalos desde la <Link to="/books">lista de libros</Link>.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}
