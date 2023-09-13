import { ReadListSheet } from './readlist-sheet';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
import { useFilters } from '@/hooks/use-filters';

export const Header = () => {
  const router = useRouter();
  const { defaultGenre, defaultMaxPage, defaultQuery } = useFilters();

  return (
    <header className="sticky bg-background top-0 z-30 container flex items-center justify-between  border-b h-[4rem]">
      <h1 className="text-4xl font-extrabold">ReadHub</h1>

      <nav className="space-x-4 flex">
        <Input
          defaultValue={defaultQuery}
          onChange={(e) => {
            router.push(
              `?${new URLSearchParams({
                genero: defaultGenre,
                maxPaginas: defaultMaxPage.toString(),
                query: e.currentTarget.value,
              })}`
            );
          }}
          placeholder="Busca películas por título"
          className="w-72 hidden lg:block"
        />

        <ul>
          <li>
            <ReadListSheet />
          </li>
        </ul>
      </nav>
    </header>
  );
};
