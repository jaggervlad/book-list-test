import { useFilters } from '@/hooks/use-filters';
import Link from 'next/link';
import { Slider } from './ui/slider';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Separator } from './ui/separator';
import { FilterX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DEFAULT_ALL_GENRE } from '@/lib/constants';

export const Sidebar = () => {
  const { genres, maxPages, defaultGenre, defaultQuery, defaultMaxPage } =
    useFilters();
  const [value, setValue] = useState(defaultMaxPage ?? 0);
  const router = useRouter();

  useEffect(() => {
    // Actualiza el estado de "value" cuando "defaultMaxPage" cambia
    setValue(defaultMaxPage ?? 0);
  }, [defaultMaxPage]);

  return (
    <aside className="fixed space-y-3 top-16 px-8 py-8 hidden h-[calc(100vh-4rem)] w-64 border-r bg-background lg:flex lg:flex-col">
      <div className="gap-3 flex flex-col">
        <h3 className="text-lg font-medium">Géneros</h3>
        <ul className="space-y-2 ml-1">
          <li>
            <Link
              href={`?${new URLSearchParams({
                genero: DEFAULT_ALL_GENRE,
                maxPaginas: defaultMaxPage.toString(),
                query: defaultQuery,
              })}`}
              className={cn(
                'underline text-muted-foreground',
                defaultGenre === DEFAULT_ALL_GENRE && 'text-muted'
              )}
            >
              Todos
            </Link>
          </li>
          {genres.map((g) => (
            <li key={g}>
              <Link
                href={`?${new URLSearchParams({
                  genero: g,
                  maxPaginas: defaultMaxPage.toString(),
                  query: defaultQuery,
                })}`}
                className={cn(
                  'underline text-muted-foreground',
                  defaultGenre === g && 'text-muted'
                )}
              >
                {g}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Separator className="my-4" />

      <div className="gap-3 flex flex-col">
        <h3 className="text-lg font-medium">Cantidad de páginas</h3>
        <Slider
          max={maxPages}
          step={1}
          value={[value]}
          defaultValue={[value]}
          onValueChange={(v) => {
            setValue(v[0]);
            router.push(
              `?${new URLSearchParams({
                genero: defaultGenre,
                maxPaginas: v[0].toString(),
                query: defaultQuery,
              })}`
            );
          }}
        />
        <span className="text-lg text-muted-foreground">
          MAX: {value > 0 ? value : maxPages} Pag.
        </span>
      </div>

      <Separator className="my-4" />

      <Link href="/" className="flex gap-4 items-center">
        Limpiar filtros <FilterX className="h-5 w-5" />
      </Link>
    </aside>
  );
};
