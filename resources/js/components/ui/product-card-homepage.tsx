import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { ProductCardProps } from '@/types/index';
import {  useState } from 'react';
import { useCart } from '@/components/homepage/CartContext';
import type { Product } from '@/types/index';
import { router } from '@inertiajs/react';



export  function ProductCard(props: ProductCardProps) {

    const {
    id,
    category,
    image,
    price_discount,
    name,
    rating,

  } = props;

  console.log(name)

    const [searchQuery, setSearchQuery] = useState('');
        const [selectedCategory, setSelectedCategory] = useState('All Categories');
        const [sortBy, setSortBy] = useState('Featured');
        const [favorites, setFavorites] = useState<(number | string)[]>([]);
        const { addToCart, sendToCart } = useCart();
    

        const toggleFavorite = (productId: number | string) => {
            setFavorites((prev) =>
                prev.includes(productId)
                    ? prev.filter((id) => id !== productId)
                    : [...prev, productId],
            );
        };
        const isFavorite = favorites.includes(id);
        const handleAddToCart = () => {
            addToCart({
                id: id,
                name: name,
                price: price_discount,
                image: image ?? "none",
            });

            sendToCart(id, 1);
        };

        const handleCardClick = (id : number) => {
            
            router.visit(`/products/${id}`);
        }

        const formatRupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(value);
    
    return (
        <div className="cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" onClick={() => handleCardClick(id)}>
            <div className="relative aspect-square overflow-hidden bg-gray-50 ">
                <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block rounded-md border border-gray-200 bg-white px-3 py-1 text-gray-700 shadow-sm">
                        {category}
                    </span>
                </div>

                {/* Favorite */}
                {/* <button
                    onClick={(e) =>{toggleFavorite(id);  e.stopPropagation();}}
                    className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-transform hover:scale-110"
                >
                    <Heart
                        className={`h-5 w-5 ${
                            isFavorite
                                ? 'fill-[#FF6900] text-[#FF6900]'
                                : 'text-gray-400'
                        }`}
                    />
                </button> */}

                <ImageWithFallback
                    src={image ?? "none"}
                    alt={"product image"}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="p-5">
                <h3 className="mb-2 text-gray-900">{name}</h3>

                <div className="mb-4 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <svg
                            className="h-4 w-4 fill-current text-yellow-400"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="text-gray-600">({rating})</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-900">
                        {formatRupiah(price_discount)}   
                    </span>

                    <Button

                        onClick={(e) => {handleAddToCart(); e.stopPropagation()}}
                        className="cursor-pointer bg-primary text-white hover:bg-orange-600"
                    >
                        Add
                    </Button>
                </div>  
            </div>
        </div>
    );
}
