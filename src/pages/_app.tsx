import { BooksProvider } from '@/providers/books-provider';
import { ReadListProvider } from '@/providers/readlist-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import { CartProvider } from '@/providers/cart-provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider forcedTheme="dark" attribute="class">
      <CartProvider>
        <BooksProvider>
          <ReadListProvider>
            <Component {...pageProps} />
          </ReadListProvider>
        </BooksProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
