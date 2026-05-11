import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useCart } from '@/components/homepage/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    ArrowLeft,
    Heart,
    RotateCcw,
    Shield,
    ShoppingCart,
    Star,
    Truck,
} from 'lucide-react';
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

interface Review {
    id: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

interface ProductDetailPageProps {
    product: Product;
    reviews: Review[];
    onBack: () => void;
    onAddToCart: (productId: number, quantity: number) => void;
}

// const categories = [
//   { name: "Electronics", icon: Smartphone, count: 245 },
//   { name: "Wearables", icon: Watch, count: 128 },
//   { name: "Audio", icon: Headphones, count: 189 },
//   { name: "Cameras", icon: Camera, count: 92 },
//   { name: "Computers", icon: Laptop, count: 156 },
//   { name: "Home", icon: Home, count: 203 },
// ];

const allProducts: Product[] = [
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

const product = allProducts[0];

const productReviews: { [key: number]: Review[] } = {
    1: [
        {
            id: 1,
            author: 'John Smith',
            rating: 5,
            comment:
                'Amazing sound quality! The noise cancellation works perfectly on flights.',
            date: '2025-11-10',
        },
        {
            id: 2,
            author: 'Sarah Johnson',
            rating: 4,
            comment:
                'Great headphones, but a bit pricey. Worth it for the quality though.',
            date: '2025-11-08',
        },
    ],
    2: [
        {
            id: 1,
            author: 'Mike Davis',
            rating: 5,
            comment: "Best smartwatch I've ever owned. Battery lasts for days!",
            date: '2025-11-12',
        },
    ],
    3: [
        {
            id: 1,
            author: 'Emily Brown',
            rating: 4,
            comment:
                'Beautiful backpack with plenty of space. Leather is high quality.',
            date: '2025-11-09',
        },
    ],
};

const reviews = productReviews[1];

// interface ProductDetailPageProps {
//     product: Product;
//     reviews: Review[];
//     onBack: () => void;
//     onAddToCart: (productId: number, quantity: number) => void;
// }

export default function ProductDetailPage() {
    const [quantity, setQuantity] = useState(1);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: '',
        author: '',
    });
    const [localReviews, setLocalReviews] = useState(reviews);

    const {} = useCart();

    const onAddToCart = (productId: number, quantity: number) => {
        console.log(productId, quantity);
    };
    const onBack = () => {};

    const handleAddToCart = () => {
        onAddToCart(product.id, quantity);
    };

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (newReview.author && newReview.comment) {
            const review: Review = {
                id: localReviews.length + 1,
                author: newReview.author,
                rating: newReview.rating,
                comment: newReview.comment,
                date: new Date().toLocaleDateString(),
            };
            setLocalReviews([review, ...localReviews]);
            setNewReview({ rating: 5, comment: '', author: '' });
        }
    };

    const averageRating =
        localReviews.length > 0
            ? localReviews.reduce((acc, r) => acc + r.rating, 0) /
              localReviews.length
            : product.rating;

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="mb-6 hover:bg-muted"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Button>

                <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Product Image */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg border-2 border-border bg-muted">
                            <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <Badge className="mb-2 bg-secondary text-secondary-foreground">
                                {product.category}
                            </Badge>
                            <h1 className="mb-3">{product.name}</h1>
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${
                                                i < Math.floor(averageRating)
                                                    ? 'fill-secondary stroke-secondary'
                                                    : 'fill-muted stroke-muted'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-muted-foreground">
                                    {averageRating.toFixed(1)} (
                                    {localReviews.length} reviews)
                                </span>
                            </div>
                            <div className="mb-4 text-primary">
                                ${product.price.toFixed(2)}
                            </div>
                            <p className="text-muted-foreground">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block">Quantity</label>
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            setQuantity(
                                                Math.max(1, quantity - 1),
                                            )
                                        }
                                        className="border-2 border-border"
                                    >
                                        -
                                    </Button>
                                    <Input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(
                                                Math.max(
                                                    1,
                                                    parseInt(e.target.value) ||
                                                        1,
                                                ),
                                            )
                                        }
                                        className="bg-input-background w-20 border-2 border-border text-center"
                                        min="1"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                        className="border-2 border-border"
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-primary hover:bg-accent"
                                    size="lg"
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-border hover:bg-muted"
                                >
                                    <Heart className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Product Features */}
                        <div className="grid grid-cols-1 gap-4 border-t border-border pt-6 md:grid-cols-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                    <Truck className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p>Free Delivery</p>
                                    <p className="text-muted-foreground">
                                        On orders over $50
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                    <Shield className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p>Warranty</p>
                                    <p className="text-muted-foreground">
                                        1 year guarantee
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                    <RotateCcw className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p>30-Day Returns</p>
                                    <p className="text-muted-foreground">
                                        Easy returns
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="space-y-6">
                    <h2>Customer Reviews</h2>

                    {/* Add Review Form */}
                    <Card className="border-2 border-border p-6">
                        <h3 className="mb-4">Write a Review</h3>
                        <form
                            onSubmit={handleSubmitReview}
                            className="space-y-4"
                        >
                            <div>
                                <label className="mb-2 block">Your Name</label>
                                <Input
                                    value={newReview.author}
                                    onChange={(e) =>
                                        setNewReview({
                                            ...newReview,
                                            author: e.target.value,
                                        })
                                    }
                                    placeholder="Enter your name"
                                    className="bg-input-background border-2 border-border"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() =>
                                                setNewReview({
                                                    ...newReview,
                                                    rating: star,
                                                })
                                            }
                                        >
                                            <Star
                                                className={`h-6 w-6 cursor-pointer ${
                                                    star <= newReview.rating
                                                        ? 'fill-secondary stroke-secondary'
                                                        : 'fill-muted stroke-muted'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block">
                                    Your Review
                                </label>
                                <Textarea
                                    value={newReview.comment}
                                    onChange={(e) =>
                                        setNewReview({
                                            ...newReview,
                                            comment: e.target.value,
                                        })
                                    }
                                    placeholder="Share your experience with this product..."
                                    className="bg-input-background min-h-24 border-2 border-border"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="bg-primary hover:bg-accent"
                            >
                                Submit Review
                            </Button>
                        </form>
                    </Card>

                    {/* Reviews List */}
                    <div className="space-y-4">
                        {localReviews.map((review) => (
                            <Card
                                key={review.id}
                                className="border-2 border-border p-6"
                            >
                                <div className="mb-3 flex items-start justify-between">
                                    <div>
                                        <h4>{review.author}</h4>
                                        <p className="text-muted-foreground">
                                            {review.date}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${
                                                    i < review.rating
                                                        ? 'fill-secondary stroke-secondary'
                                                        : 'fill-muted stroke-muted'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    {review.comment}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
