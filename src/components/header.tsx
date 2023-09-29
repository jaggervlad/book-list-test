import { ReadListSheet } from './readlist-sheet';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
import { useFilters } from '@/hooks/use-filters';
import { useCart } from '@/providers/cart-provider';
import { CartSheet } from './cart-sheet';

export const Header = () => {
  const router = useRouter();
  const { cartItems } = useCart();
  const { defaultGenre, defaultMaxPage, defaultQuery } = useFilters();

  return (
    <header className="sticky bg-background top-0 z-30  px-6 lg:px-8 flex items-center justify-between  border-b h-[4rem]">
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

        <ul className="flex items-center gap-4">
          <li>
            <ReadListSheet />
          </li>
          <li>
            <CartSheet />
          </li>
        </ul>
      </nav>
    </header>
  );
};
