import { Heart, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ProductCardProps {
    id: string | number;
    name: string;
    price: number;
    image: string;
    rating: number;
    category: string;
    onClick?: () => void;
}

export function ProductCard({
    name,
    price,
    image,
    rating,
    category,
    onClick,
}: ProductCardProps) {
    return (
        <Card
            className="group cursor-pointer overflow-hidden border-2 border-border transition-shadow duration-300 hover:shadow-lg"
            onClick={onClick}
        >
            <div className="relative aspect-square overflow-hidden bg-muted">
                <ImageWithFallback
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button className="absolute top-3 right-3 rounded-full bg-card p-2 shadow-md transition-colors hover:bg-primary hover:text-primary-foreground">
                    <Heart className="h-4 w-4" />
                </button>
                <div className="absolute top-3 left-3 rounded bg-secondary px-2 py-1 text-secondary-foreground">
                    {category}
                </div>
            </div>
            <div className="space-y-3 p-4">
                <div>
                    <h3 className="line-clamp-1">{name}</h3>
                    <div className="mt-1 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`h-4 w-4 ${
                                    i < Math.floor(rating)
                                        ? 'fill-secondary'
                                        : 'fill-muted'
                                }`}
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        ))}
                        <span className="ml-1 text-muted-foreground">
                            ({rating})
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-primary">${price.toFixed(2)}</span>
                    <Button size="sm" className="bg-primary hover:bg-accent">
                        <ShoppingCart className="mr-1 h-4 w-4" />
                        Add
                    </Button>
                </div>
            </div>
        </Card>
    );
}
