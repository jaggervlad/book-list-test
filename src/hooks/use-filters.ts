import { DEFAULT_ALL_GENRE } from '@/lib/constants';
import { useBooks } from '@/providers/books-provider';
import { useSearchParams } from 'next/navigation';

export function useFilters() {
  const { books } = useBooks();
  const searchParams = useSearchParams();
  const defaultGenre = searchParams.get('genero') ?? DEFAULT_ALL_GENRE;
  const defaultQuery = searchParams.get('query') ?? '';
  const defaultMaxPage = parseInt(searchParams.get('maxPaginas')) || 0;

  const uniqueGenres = Array.from(new Set(books?.map((b) => b.genre))) ?? [];

  const bookWithMorePages =
    books.length > 0
      ? books?.reduce((prev, current) => {
          return prev.pages > current.pages ? prev : current;
        }).pages
      : 0;

  return {
    genres: uniqueGenres,
    maxPages: bookWithMorePages,
    defaultGenre,
    defaultQuery,
    defaultMaxPage,
  };
}
