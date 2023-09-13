import { Book } from '@/types/books';
import data from '../../books.json';

export async function getBooks(): Promise<Book[]> {
  const booksData = data.library.map((b) => b.book);

  return new Promise((res, reject) => {
    setTimeout(() => {
      if (!booksData) {
        reject(new Error('Error obteniendo libros'));
      } else {
        res(booksData);
      }
    }, 500);
  });
}
