import { BooksProvider } from '@/providers/books-provider';
import { ReadListProvider } from '@/providers/readlist-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider forcedTheme="dark" attribute="class">
      <BooksProvider>
        <ReadListProvider>
          <Component {...pageProps} />
        </ReadListProvider>
      </BooksProvider>
    </ThemeProvider>
  );
}
