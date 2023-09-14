import { BooksList } from '@/components/books-list';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import dynamic from 'next/dynamic';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>ReadHub</title>
        <meta name="description" content="Aplicación de libros" />
      </Head>

      <main className="flex flex-col">
        <Header />
        <div className="flex h-full overflow-hidden bg-background lg:min-h-[calc(100vh-4rem)]">
          <Sidebar />
          <section className="container flex-1 h-full py-3 overflow-hidden overflow-y-auto lg:ml-64">
            <BooksList />
          </section>
        </div>
      </main>
    </>
  );
}
