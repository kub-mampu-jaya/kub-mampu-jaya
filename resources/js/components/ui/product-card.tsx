import * as React from 'react'
import { cn } from '@/lib/utils'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { useCart } from '../homepage/CartContext';

// interface Product {
//     id: number | string;
//     name: string;
//     category: string;
//     rating: number;
//     price: number;
//     image: string;
// }

type ProductCardProps = {
    id: number;
    category: string;
    name:string; 
    rating:number; 
    price_discount: number;
    image: string | null
}

function ProductCard({ id, category, name, rating, price_discount ,image }: ProductCardProps) {
  return (
   <div key={id} className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
            <div className="absolute top-3 left-3 z-10">
                <span className="inline-block rounded-md border border-gray-200 bg-white px-3 py-1 text-gray-700 shadow-sm">
                    {category}
                </span>
            </div>
            
            <ImageWithFallback
                // src={`https://source.unsplash.com/400x400/?${image}`}
                src={image || ""}
                alt={name}
                className="h-full w-full object-cover"
            />
        </div>
        <div className="p-5">
            <h3 className="mb-2 text-gray-900">
                {name}
            </h3>
            <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center gap-1">
                    <svg
                        className="h-4 w-4 fill-current text-yellow-400"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-gray-600">
                        ({rating})
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-gray-900">
                    ${Number(price_discount).toFixed(2)}
                </span>
                <Button className="bg-primary text-white hover:bg-orange-600">
                    Add
                </Button>
            </div>
        </div>
    </div>
  )
}

// function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       data-slot='card-header'
//       className={cn(
//         '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       data-slot='card-title'
//       className={cn('leading-none font-semibold', className)}
//       {...props}
//     />
//   )
// }

// function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       data-slot='card-description'
//       className={cn('text-muted-foreground text-sm', className)}
//       {...props}
//     />
//   )
// }

// function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       data-slot='card-action'
//       className={cn(
//         'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       data-slot='card-content'
//       className={cn('px-6', className)}
//       {...props}
//     />
//   )
// }

// function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       data-slot='card-footer'
//       className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
//       {...props}
//     />
//   )
// }

export {
  ProductCard,
//   CardHeader,
//   CardFooter,
//   CardTitle,
//   CardAction,
//   CardDescription,
//   CardContent,
}
