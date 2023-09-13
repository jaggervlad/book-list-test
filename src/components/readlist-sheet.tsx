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

import { Book, Heart, Trash } from 'lucide-react';
import { useReadListState } from '@/providers/readlist-provider';

export function ReadListSheet() {
  const { items, hasItems, removeItem } = useReadListState();

  return (
    <Sheet>
      <SheetTrigger asChild suppressHydrationWarning>
        <Button aria-label="Lista Lectura" variant="ghost" className="relative">
          {hasItems && (
            <Badge
              variant="secondary"
              className="absolute flex items-center justify-center w-6 h-6 p-2 rounded-full right-0 -top-2"
            >
              {items.length}
            </Badge>
          )}
          <Heart aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full pr-0 sm:max-w-sm">
        <SheetHeader className="px-1">
          <SheetTitle>
            Lista de lectura {hasItems && `(${items.length})`}
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {hasItems ? (
          <>
            <div className="flex flex-col flex-1 gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-5 pr-6">
                  {items.map((item) => (
                    <div key={item.ISBN} className="space-y-3 group relative">
                      <div className=" flex items-center space-x-4">
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

                        <div className="flex flex-col self-start flex-1 gap-1 text-sm">
                          <span className="line-clamp-1">{item.title}</span>
                          <span className="text-muted-foreground">
                            {item.synopsis}
                          </span>
                        </div>
                      </div>
                      <Separator />
                      <button className="group-hover:block hidden appearance-none absolute bottom-2 right-0 cursor-pointer">
                        <div className="rounded-full bg-muted bg-opacity-75 p-2">
                          <Trash
                            className="h-5 w-5"
                            onClick={() => removeItem(item.ISBN)}
                          />
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <Book
              className="w-12 h-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium text-muted-foreground">
              Tu lista esta vacía
            </span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
