import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import RootLayout from '@/components/layout/root-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { Clock, Plus, Star } from 'lucide-react';
import React from 'react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    popular: boolean;
    rating: number;
    preparationTime: string;
}

interface HomePageProps {}

const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Pav Bhaji',
        description:
            'Pav bhaji is made with vegetables like potatoes, onions, tomatoes, peas, cauliflower, and capsicum, cooked with pav bhaji masala, turmeric, red chilli powder, cumin seeds, and sometimes garam masala, along with butter, oil, ginger-garlic paste, salt, and lemon juice, served with butter-toasted pav, chopped onions, coriander leaves, and lemon wedges.',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=250&fit=crop',
        category: 'Indian',
        popular: true,
        rating: 4.4,
        preparationTime: '15-20 min',
    },
    {
        id: '2',
        name: 'Kung Pao Chicken',
        description: 'Spicy stir-fried chicken with peanuts and vegetables',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=250&fit=crop',
        category: 'Chinese',
        popular: true,
        rating: 4.6,
        preparationTime: '12-18 min',
    },
    {
        id: '3',
        name: 'Classic Cheeseburger',
        description:
            'Beef patty with cheese, lettuce, tomato, and special sauce',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop',
        category: 'Burgers',
        popular: false,
        rating: 4.5,
        preparationTime: '10-15 min',
    },
    {
        id: '4',
        name: 'Salmon Sashimi',
        description: 'Fresh salmon sliced thin and served raw',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=250&fit=crop',
        category: 'Sushi',
        popular: true,
        rating: 4.9,
        preparationTime: '5-10 min',
    },
    {
        id: '5',
        name: 'Chicken Tacos',
        description:
            'Three soft tacos with grilled chicken, salsa, and cilantro',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
        category: 'Tacos',
        popular: false,
        rating: 4.4,
        preparationTime: '8-12 min',
    },
    {
        id: '6',
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with parmesan cheese and croutons',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop',
        category: 'Salads',
        popular: false,
        rating: 4.7,
        preparationTime: '5-8 min',
    },
    {
        id: '7',
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with chocolate frosting',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=250&fit=crop',
        category: 'Desserts',
        popular: true,
        rating: 4.6,
        preparationTime: '3-5 min',
    },
    {
        id: '8',
        name: 'Cappuccino',
        description: 'Rich espresso with steamed milk and foam',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=400&h=250&fit=crop',
        category: 'Coffee',
        popular: false,
        rating: 4.3,
        preparationTime: '2-4 min',
    },
];

export default function HomePage() {
    return (
        <RootLayout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                            Make your Bites, Delivered Fresh
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-xl">
                            Choose from our delicious selection of fresh,
                            quality ingredients and get your perfect bites
                            delivered in minutes.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="bg-white text-orange-500 hover:bg-gray-100"
                            >
                                <Plus className="mr-2 h-5 w-5" />
                                Order Now
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-orange-500"
                            >
                                Browse Menu
                            </Button>
                        </div>
                    </div>
                </section>

                {/* All Products */}
                <section className="bg-gray-50 py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-3xl font-bold">Our Menu</h2>
                        <Products />
                    </div>
                </section>
            </div>
        </RootLayout>
    );
}

function Products() {
    const { dispatch } = useCart();

    const handleAddToCart = (product: Product) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                id: product.id,
                name: product.name,
                price: product.price,
                restaurant: 'Make your Bites',
                image: product.image,
            },
        });
    };
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {mockProducts.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                />
            ))}
        </div>
    );
}

interface ProductCardProps {
    product: Product;
    onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative">
                <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                />
                {product.popular && (
                    <Badge className="absolute top-2 left-2 bg-orange-500">
                        Popular
                    </Badge>
                )}
            </div>
            <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                            {product.rating}
                        </span>
                    </div>
                </div>
                <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                    {product.description}
                </p>
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{product.preparationTime}</span>
                    </div>
                    <span className="font-bold text-orange-600">
                        ${product.price}
                    </span>
                </div>
                <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={onAddToCart}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};
