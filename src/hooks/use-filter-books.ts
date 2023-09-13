import { DEFAULT_ALL_GENRE } from '@/lib/constants';
import { useBooks } from '@/providers/books-provider';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useFilterBooks() {
  const { books, loading } = useBooks();
  const searchParams = useSearchParams();
  const defaultGenre = searchParams.get('genero') ?? DEFAULT_ALL_GENRE;
  const defaultQuery = searchParams.get('query') ?? '';
  const defaultMaxPage = parseInt(searchParams.get('maxPaginas')) || 0;

  const filteredBooks = useMemo(() => {
    let filtered = books;

    if (defaultGenre && defaultGenre !== DEFAULT_ALL_GENRE) {
      filtered = books.filter(
        (b) => b.genre.toLowerCase() === defaultGenre.toLowerCase()
      );
    }

    if (defaultQuery) {
      filtered = filtered.filter((b) =>
        b.title.toLowerCase().includes(defaultQuery.toLowerCase())
      );
    }

    if (defaultMaxPage > 0) {
      filtered = filtered.filter((b) => b.pages <= defaultMaxPage);
    }

    return filtered;
  }, [books, defaultGenre, defaultQuery, defaultMaxPage]);

  return { filteredBooks, loading };
}
