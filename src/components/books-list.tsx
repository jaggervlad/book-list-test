import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useFilterBooks } from '@/hooks/use-filter-books';
import { cn } from '@/lib/utils';
import { useReadListState } from '@/providers/readlist-provider';
import { Heart } from 'lucide-react';
import Image from 'next/image';

export const BooksList = () => {
  const { filteredBooks, loading } = useFilterBooks();

  const { addItem, isSaved } = useReadListState();
  return (
    <>
      <h3 className="scroll-m-20 mb-10 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Libros Disponibles: {filteredBooks.length}
      </h3>

      {loading && (
        <div className="mx-auto flex max-w-xs flex-col space-y-1.5">
          <h1 className="text-center text-2xl font-bold">Cargando....</h1>
        </div>
      )}

      {!loading && filteredBooks.length === 0 && (
        <div className="mx-auto flex max-w-xs flex-col space-y-1.5">
          <h1 className="text-center text-2xl font-bold">
            No se encontraron libros
          </h1>
          <p className="text-center text-muted-foreground">
            Intenta cambiar tus filtros, o vuelve más tarde para ver nuevos
            libros.
          </p>
        </div>
      )}

      {!loading && filteredBooks.length > 0 && (
        <div className="grid xs:gap-x-4 xs:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:gap-x-4 gap-y-5">
          {filteredBooks.map((b) => (
            <Card key={b.title} className="border-0">
              <div className="relative">
                <div className="relative mb-4 aspect-[9/14]">
                  <Image
                    src={b.cover}
                    alt={b.title}
                    className="object-cover w-full "
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                  />
                </div>

                <button className="appearance-none absolute top-2 right-2 cursor-pointer">
                  <div className="rounded-full bg-gray-200 bg-opacity-75 p-2">
                    <Heart
                      onClick={() => addItem(b)}
                      className={cn(
                        'text-red-600 ',
                        isSaved(b.ISBN) && 'fill-current'
                      )}
                    />
                  </div>
                </button>
              </div>
              <CardHeader className="px-0 pt-2 pb-4">
                <CardTitle className="line-clamp-2 leading-7">
                  {b.title}
                </CardTitle>
                <CardDescription>{b.genre}</CardDescription>
                <p className="text-base text-muted-foreground font-semibold">
                  {b.author.name}
                </p>
              </CardHeader>
              <CardFooter className="flex justify-between px-0 text-muted-foreground">
                <p>{b.year}</p>
                <p>{b.pages} pag.</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};
