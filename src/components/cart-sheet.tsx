import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Book, MinusIcon, PlusIcon, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '@/providers/cart-provider';

export function CartSheet() {
  const { cartItems, hasItems, total, increaseItem, decreaseItem } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button aria-label="Lista Lectura" variant="ghost" className="relative">
          {isClient && hasItems && (
            <Badge
              variant="secondary"
              className="absolute flex items-center justify-center w-6 h-6 p-2 rounded-full right-0 -top-2"
            >
              {cartItems.length}
            </Badge>
          )}
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full pr-0 sm:max-w-sm">
        <SheetHeader className="px-1">
          <SheetTitle>
            Carrito de compras {hasItems && `(${cartItems.length})`}
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {hasItems ? (
          <>
            <div className="flex flex-col flex-1 gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-5 pr-6">
                  {cartItems.map((item) => (
                    <div key={item.ISBN} className="space-y-3 group relative">
                      <div className="flex space-x-4">
                        <div className="relative w-28 h-40 overflow-hidden rounded">
                          <Image
                            src={
                              item.cover ?? '/images/product-placeholder.webp'
                            }
                            alt={
                              item.title ??
                              'Libro seleccionado en lista de lectura'
                            }
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            fill
                            className="absolute"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex flex-col flex-1 gap-1 text-sm">
                          <span className="line-clamp-1">{item.title}</span>
                          <span className="text-muted-foreground">
                            {item.synopsis}
                          </span>

                          <div className="mt-auto ml-auto flex items-center gap-4">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => decreaseItem(item.ISBN)}
                            >
                              <MinusIcon className="h-4 w-4" />
                            </Button>
                            <span>{item.count}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => increaseItem(item.ISBN)}
                            >
                              <PlusIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex text-lg items-center">
                <span className="font-bold">Total:</span> {total}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <ShoppingCart
              className="w-12 h-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium text-muted-foreground">
              Tu carrito esta vacio
            </span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
