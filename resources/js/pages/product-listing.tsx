import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    category: string;
    description: string;
}

interface ProductListingPageProps {
    products: Product[];
    onProductClick: (productId: number) => void;
}

const products: Product[] = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzYzNDAzMDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.5,
        category: 'Audio',
        description:
            'Experience superior sound quality with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals alike.',
    },
    {
        id: 2,
        name: 'Smart Watch Pro',
        price: 449.99,
        image: 'https://images.unsplash.com/photo-1718485163549-7ea7ac742a6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YXRjaHxlbnwxfHx8fDE3NjMzNzI2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.8,
        category: 'Wearables',
        description:
            'Track your fitness, monitor your health, and stay connected with this advanced smartwatch featuring GPS, heart rate monitoring, and water resistance.',
    },
    {
        id: 3,
        name: 'Leather Backpack',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1549943872-f7ff0b2b51be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwYmFja3BhY2t8ZW58MXx8fHwxNzYzNDA3MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.3,
        category: 'Accessories',
        description:
            'Premium leather backpack with multiple compartments, laptop sleeve, and comfortable padded straps. Perfect for daily commute or travel.',
    },
    {
        id: 4,
        name: 'Running Shoes Elite',
        price: 189.99,
        image: 'https://images.unsplash.com/photo-1597892657493-6847b9640bac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzYzNDMzNzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.6,
        category: 'Sports',
        description:
            'Engineered for performance with responsive cushioning and breathable mesh upper. Ideal for long-distance running and training.',
    },
    {
        id: 5,
        name: 'Professional Laptop',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjMzMzg4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.9,
        category: 'Computers',
        description:
            'Powerful laptop with high-performance processor, stunning display, and all-day battery life. Perfect for creative professionals and developers.',
    },
    {
        id: 6,
        name: 'Digital Camera 4K',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjMzNzM0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.7,
        category: 'Cameras',
        description:
            'Capture stunning 4K video and high-resolution photos with advanced autofocus and image stabilization. Great for content creators.',
    },
    {
        id: 7,
        name: 'Coffee Maker Deluxe',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1608354580875-30bd4168b351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlcnxlbnwxfHx8fDE3NjMzODU2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.4,
        category: 'Home',
        description:
            'Brew the perfect cup every time with programmable settings, thermal carafe, and built-in grinder. Coffee shop quality at home.',
    },
    {
        id: 8,
        name: 'Designer Sunglasses',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1663585703603-9be01a72a62a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjMzNzY5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.2,
        category: 'Fashion',
        description:
            'Premium polarized lenses with UV protection and stylish frames. Make a statement while protecting your eyes.',
    },
];

export default function ProductListingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');

    const categories = [
        'all',
        ...Array.from(new Set(products.map((p) => p.category))),
    ];

    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === 'all' ||
                product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

    const onProductClick = (productId: number) => {};

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="mb-2">All Products</h1>
                    <p className="text-muted-foreground">
                        Discover our complete collection
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-input-background border-2 border-border pl-10 focus:border-primary"
                            />
                        </div>
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger className="bg-input-background w-full border-2 border-border md:w-48">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
                                {categories
                                    .filter((c) => c !== 'all')
                                    .map((category) => (
                                        <SelectItem
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="bg-input-background w-full border-2 border-border md:w-48">
                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">
                                    Featured
                                </SelectItem>
                                <SelectItem value="price-low">
                                    Price: Low to High
                                </SelectItem>
                                <SelectItem value="price-high">
                                    Price: High to Low
                                </SelectItem>
                                <SelectItem value="rating">
                                    Highest Rated
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Results */}
                <div className="mb-4">
                    <p className="text-muted-foreground">
                        Showing {filteredProducts.length} of {products.length}{' '}
                        products
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => onProductClick(product.id)}
                        >
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-muted-foreground">
                            No products found matching your criteria.
                        </p>
                        <Button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                            }}
                            className="mt-4 bg-primary hover:bg-accent"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
