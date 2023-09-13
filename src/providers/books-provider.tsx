import { getBooks } from '@/services/getBooks';
import { Book } from '@/types/books';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type BooksContextProps = {
  books: Book[];
  loading: boolean;
  error: string | null;
};

const BooksContext = createContext<BooksContextProps>({
  books: [],
  loading: true,
  error: null,
});

export const BooksProvider = ({ children }: PropsWithChildren) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      try {
        const data = await getBooks();

        setBooks(data);
      } catch (error) {
        setError('Ha ocurrido un error obteniendo los libros');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, loading, error }}>
      {children}
    </BooksContext.Provider>
  );
};

export function useBooks() {
  const booksContext = useContext(BooksContext);

  if (!booksContext)
    throw new Error('Books Context debe usarse dentro de Books Provider');

  return booksContext;
}
