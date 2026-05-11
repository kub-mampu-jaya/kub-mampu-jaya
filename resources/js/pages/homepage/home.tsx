import { Features } from '@/components/homepage/Features';
import { Hero } from '@/components/homepage/Hero';
import { Steps } from '@/components/homepage/Steps';
import RootLayout from '@/components/layout/root-layout';
import { Button } from '@/components/ui/button';
// import { ProductCard } from '@/components/ui/product-card-homepage';
import { ProductCard } from '@/components/ui/product-card-homepage';
import { useCart } from '@/context/CartContext';
import HomepageLayout from '@/layouts/client-side/HomepageLayout';
import type { Product } from '@/types';
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

type ProductWithRating = Product & { rating: Number };
//type intersect
interface HomePageProps {
    products: ProductWithRating[];
}
export default function HomePage({ products }: HomePageProps) {
    return (
        <RootLayout>
            {/* <LanguageProvider> */}

            <div className="min-h-screen">
                {/* Hero Section */}
                <Hero />
                {/* All Products */}
                <section className="bg-gray-50 py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-14 flex justify-center">
                            <h2 className="text-4xl font-extrabold">
                                Menu Kami
                            </h2>
                        </div>

                        <Products products={products} />
                    </div>
                </section>

                {/* Features */}
                <Features />

                {/* Steps */}
                <Steps />

                {/* Footer */}
                {/* <Footer /> */}
            </div>
            {/* </LanguageProvider> */}
        </RootLayout>
    );
}

function Products({ products }: HomePageProps) {
    const { dispatch } = useCart();
    console.log('products[0]', products[0]);

    return (
        <div className="space-y-6">
            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price_discount={product.price_discount}
                        image={product.image ?? 'none'}
                        rating={product.rating ?? 0}
                        category={product.category}
                    />
                ))}
            </div>

            {/* Lihat Semua Button */}
            <div className="flex justify-center">
                <Link href="/products">
                    <Button
                        // href="/products"
                        className="bg-primary text-white hover:bg-orange-600"
                    >
                        Lihat Semua
                    </Button>
                </Link>
            </div>
        </div>
    );
}

interface ProductCardProps {
    product: Product;
    onAddToCart: () => void;
}

HomePage.layout = (page: ReactNode) => <HomepageLayout>{page}</HomepageLayout>;
