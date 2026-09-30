import Book, { IBook } from '../models/Book';

// Funcion que se encarga de crear un libro en la base de datos
export const createBook = (data: IBook) => {
    // Creamos un nuevo libro usando los datos que hemos recibido
    const book = new Book(data);

    // Guardamos el libro en la base de datos y devolvemos el resultado
    return book.save();
};

// Funcion que busca un libro por su ID en la base de datos
export const getBookById = (bookId: string) => {
    // Buscamos el libro por su ID y obtenemos tambien los datos de sus autores
    return Book.findById(bookId).populate('authors');
};

// Funcion que busca todos los libros de la base de datos
export const getAllBooks = () => {
    // Buscamos todos los libros y obtenemos tambien los datos de sus autores
    return Book.find().populate('authors');
};

// Funcion que se encarga de actualizar un libro
export const updateBook = (bookId: string, data: IBook) => {
    // Buscamos el libro por su ID y actualizamos sus datos.
    // Con new: true devolvemos el documento actualizado y también poblamos autores.
    return Book.findByIdAndUpdate(bookId, data, { new: true }).populate('authors');
};

// Funcion que se encarga de eliminar un libro de la base de datos
export const deleteBook = (bookId: string) => {
    // Buscamos el libro por su ID y lo eliminamos
    return Book.findByIdAndDelete(bookId);
};

// Funcion que añade un tag al libro sin duplicarlo
export const addTag = (bookId: string, tag: string) => {
    // $addToSet solo mete el valor en la lista si todavia no estaba
    return Book.findByIdAndUpdate(bookId, { $addToSet: { tags: tag } }, { returnDocument: 'after' }).populate('authors');
};

// Funcion que reemplaza toda la lista de tags de un libro
export const setTags = (bookId: string, tags: string[]) => {
    return Book.findByIdAndUpdate(bookId, { tags }, { returnDocument: 'after' }).populate('authors');
};

// Funcion que quita un tag del libro
export const removeTag = (bookId: string, tag: string) => {
    // $pull saca el valor de la lista si estaba, y no falla si no estaba
    return Book.findByIdAndUpdate(bookId, { $pull: { tags: tag } }, { returnDocument: 'after' }).populate('authors');
};

// Exportamos todas las funciones para poder utilizarlas desde el controlador
export default {
    createBook,

    getBookById,

    getAllBooks,

    updateBook,

    deleteBook,

    addTag,

    setTags,

    removeTag
};
